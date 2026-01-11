'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // スライドショー用の画像
  const slides = [
    { id: 1, image: '/slides/rabbit-1.jpg', text: '' },
    { id: 2, image: '/slides/rabbit-2.jpg', text: '' },
    { id: 3, image: '/slides/rabbit-3.jpg', text: '' },
    { id: 4, image: '/slides/rabbit-4.jpg', text: '' },
  ];

  // 自動スライド
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 仮の記事データ
  const articles = [
    {
      id: 1,
      title: 'うさぎの基本的な飼い方',
      excerpt: 'うさぎを初めて飼う方へ。ケージの選び方、食事、温度管理など基本をご紹介します。',
      date: '2026-01-10',
      category: '飼育基礎',
    },
    {
      id: 2,
      title: 'うさぎの健康チェックポイント',
      excerpt: '毎日のチェックで病気の早期発見。うんちの状態、食欲、行動の変化を見逃さないコツ。',
      date: '2026-01-08',
      category: '健康管理',
    },
    {
      id: 3,
      title: 'おすすめの牧草の選び方',
      excerpt: 'チモシー1番刈り、2番刈り、アルファルファ。うさぎの年齢や好みに合わせた牧草選び。',
      date: '2026-01-05',
      category: '食事',
    },
    {
      id: 4,
      title: 'うさぎとの信頼関係の築き方',
      excerpt: '抱っこが苦手なうさぎさんでも大丈夫。時間をかけて信頼を育む方法をご紹介。',
      date: '2026-01-03',
      category: 'コミュニケーション',
    },
  ];

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
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
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
        
        <div className="grid md:grid-cols-2 gap-6 mx-auto">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-grass text-white px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-earth mb-2">
                {article.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {article.excerpt}
              </p>
              
              <button className="text-grass font-semibold hover:text-grass-light transition">
                続きを読む
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
