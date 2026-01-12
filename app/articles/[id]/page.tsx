'use client';

import { use } from 'react';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 仮の記事データ
  const article = {
    id: parseInt(id),
    title: 'うさぎの基本的な飼い方',
    category: '飼育基礎',
    date: '2026-01-10',
    author: 'シェアラビ編集部',
    image: '/slides/rabbit-1.jpg',
    content: `
うさぎを初めて飼う方へ、基本的な飼育方法をご紹介します。

## ケージの選び方

うさぎのケージは、体長の3〜4倍程度の広さが理想的です。最低でも幅60cm×奥行き50cm×高さ50cm以上のものを選びましょう。

床がすのこタイプになっているものは、足を痛めることがあるため、マットを敷くことをおすすめします。

## 食事について

うさぎの主食は牧草です。チモシーを中心に、常に新鮮な牧草を与えましょう。

### 牧草の種類
- チモシー1番刈り：繊維質が豊富で成兎向き
- チモシー2番刈り：やわらかく子うさぎやシニアうさぎ向き
- アルファルファ：高カロリーで成長期向き

ペレットは補助食として、体重の1.5〜3%程度を1日2回に分けて与えます。

## 温度管理

うさぎにとって快適な温度は18〜24℃です。夏は28℃以上、冬は15℃以下にならないよう、エアコンやヒーターで調整しましょう。

特に夏場の暑さには弱いため、熱中症に注意が必要です。

## 日常のお世話

### 毎日行うこと
- 新鮮な水の交換
- 牧草の補充
- ペレットを与える
- ケージの簡単な掃除
- 健康チェック

### 週1回程度
- ブラッシング（換毛期は毎日）
- ケージの徹底的な掃除

### 月1回程度
- 爪切り
- 体重測定

## まとめ

うさぎは繊細な動物ですが、基本をしっかり押さえれば、楽しく一緒に暮らすことができます。

愛情をもって、毎日の変化を観察することが大切です。
    `,
  };

  return (
    <div className="min-h-screen bg-cream">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* アイキャッチ画像 */}
          <div className="relative h-80 w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 記事メタ情報 */}
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Tag size={16} className="text-grass" />
                <span className="bg-grass text-white px-3 py-1 rounded-full text-xs">
                  {article.category}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} className="text-grass" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <User size={16} className="text-grass" />
                {article.author}
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