'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

type Article = {
  id: string;
  title: string;
  category: string;
  created_at: string;
  content: string;
  author_id: string;
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [authorNames, setAuthorNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // スライドショー用の画像
  const slides = [
    { id: 1, image: '/slides/hero1.jpg', text: '' },
    { id: 2, image: '/slides/hero2.jpg', text: '' },
    { id: 3, image: '/slides/hero3.jpg', text: '' },
  ];

  // 自動スライド
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 記事を取得
  useEffect(() => {
    const loadArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, category, created_at, content, author_id')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setArticles(data);
        
        // 著者名を取得
        const authorIds = [...new Set(data.map(a => a.author_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', authorIds);
        
        if (profiles) {
          const nameMap: Record<string, string> = {};
          profiles.forEach(profile => {
            nameMap[profile.id] = profile.username || '編集部';
          });
          setAuthorNames(nameMap);
        }
      }
      setLoading(false);
    };

    loadArticles();
  }, [supabase]);

  // 記事の冒頭100文字を抽出
  const getExcerpt = (content: string) => {
    const text = content.replace(/^#{1,3}\s+.+$/gm, '').replace(/^-\s+.+$/gm, '').trim();
    return text.substring(0, 100) + (text.length > 100 ? '...' : '');
  };

  return (
    <div>
      {/* 全画面スライドショー */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 104px)' }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-full relative">
              <Image
                src={slide.image}
                alt={slide.text}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-4xl font-semibold text-white drop-shadow-lg">
                  {slide.text}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* スライドインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 記事一覧 */}
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-earth mb-8 text-center">新着記事</h2>
        
        {loading ? (
          <p className="text-center text-gray-600">読込中...</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-600">まだ記事がありません</p>
        ) : (
          <div className="grid md:grid-cols-3 max-w-6xl gap-6 mx-auto">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="flex flex-col bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass hover:shadow-lg transition cursor-pointer"
              >
                {/* タグ */}
                <div className="mb-3">
                  <span className="text-xs bg-grass text-white px-3 py-1 rounded-full">
                    {article.category || '未分類'}
                  </span>
                </div>
                
                {/* タイトル */}
                <h3 
                  className="text-xl font-bold text-earth mb-2 overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {article.title}
                </h3>

                {/* 本文抜粋 */}
                <p 
                  className="text-gray-600 overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    height: '6rem'
                  }}
                >
                  {getExcerpt(article.content)}
                </p>
                
                {/* 日付とユーザー名（最下部に固定） */}
                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4">
                  <span>
                    {new Date(article.created_at).toLocaleDateString('ja-JP')}
                  </span>
                  <span>{authorNames[article.author_id] || '編集部'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}