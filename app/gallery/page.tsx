'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 仮の画像データ（後でユーザー投稿機能に置き換え）
  const photos = [
    { id: 1, src: '/slides/hero1.jpg', username: 'うさ飼いさん' },
    { id: 2, src: '/slides/hero2.jpg', username: 'もふもふ好き' },
    { id: 3, src: '/slides/hero3.jpg', username: 'ぴょんぴょん' },
    { id: 4, src: '/slides/hero1.jpg', username: 'うさこママ' },
    { id: 5, src: '/slides/hero2.jpg', username: 'ラビットLOVE' },
    { id: 6, src: '/slides/hero3.jpg', username: 'うさぎ日和' },
    { id: 7, src: '/slides/hero1.jpg', username: 'もちもち' },
    { id: 8, src: '/slides/hero2.jpg', username: 'ほっぺ' },
    { id: 9, src: '/slides/hero3.jpg', username: 'うさぎ部' },
    { id: 10, src: '/slides/hero1.jpg', username: 'うさぎLOVE' },
    { id: 11, src: '/slides/hero2.jpg', username: 'もふ太郎' },
    { id: 12, src: '/slides/hero3.jpg', username: 'ぴょん吉' },
    { id: 13, src: '/slides/hero1.jpg', username: 'うさみみ' },
    { id: 14, src: '/slides/hero2.jpg', username: 'もこもこ' },
    { id: 15, src: '/slides/hero3.jpg', username: 'ふわふわ' },
    { id: 16, src: '/slides/hero1.jpg', username: 'まるちゃん' },
    { id: 17, src: '/slides/hero2.jpg', username: 'ぽてち' },
    { id: 18, src: '/slides/hero3.jpg', username: 'おもち' },
    { id: 19, src: '/slides/hero1.jpg', username: 'きなこ' },
    { id: 20, src: '/slides/hero2.jpg', username: 'あんこ' },
  ];

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold text-earth mb-2 text-center">
          ギャラリー
        </h1> */}
        {/* <p className="text-center text-grass mb-8 text-sm">
          みんなのかわいいうさぎさん 🐰
        </p> */}

        {/* 真四角グリッド（4列） */}
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(photo.id)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
                <div className="relative aspect-square">
                  <Image
                    src={photo.src}
                    alt={`${photo.username}のうさぎさん`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                {/* ホバー時のユーザー名表示 */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-white text-xs font-medium">
                    by {photo.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* モーダル（拡大表示） */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={photos.find((p) => p.id === selectedImage)?.src || ''}
                alt="拡大表示"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white text-center mt-4">
              by {photos.find((p) => p.id === selectedImage)?.username}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}