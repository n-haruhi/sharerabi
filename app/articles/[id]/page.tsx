'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Article = {
  id: string;
  title: string;
  category: string;
  created_at: string;
  image_url: string;
  content: string;
  author_id: string;
};

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const supabase = createClient();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      // 記事を取得
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (articleError || !articleData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(articleData);

      // 著者情報を取得
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', articleData.author_id)
        .single();

      setAuthorName(profileData?.username || '編集部');
      setLoading(false);
    };

    loadArticle();
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">読込中...</p>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">記事が見つかりません</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-grass text-white rounded-lg hover:bg-grass-light transition"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* アイキャッチ画像 */}
          {article.image_url && (
            <div className="relative h-80 w-full">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* 記事メタ情報 */}
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              {article.category && (
                <span className="flex items-center gap-1">
                  <Tag size={16} className="text-grass" />
                  <span className="bg-grass text-white px-3 py-1 rounded-full text-xs">
                    {article.category}
                  </span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={16} className="text-grass" />
                {new Date(article.created_at).toLocaleDateString('ja-JP')}
              </span>
              <span className="flex items-center gap-1">
                <User size={16} className="text-grass" />
                {authorName}
              </span>
            </div>

            {/* タイトル */}
            <h1 className="text-4xl font-bold text-earth mb-8 leading-tight">
              {article.title}
            </h1>

            {/* 記事本文 */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                // 見出し判定
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-earth mt-8 mb-4 pb-2 border-b-2 border-grass-light"
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="text-xl font-semibold text-earth mt-6 mb-3"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                // リスト判定
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-700">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                // 通常の段落
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* 関連記事（準備中） */}
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-earth mb-6">関連記事</h3>
          <p className="text-gray-500">準備中です</p>
        </div>
      </article>
    </div>
  );
}