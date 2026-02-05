'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';
import { Save } from 'lucide-react';

export default function NewArticlePage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!title.trim() || !content.trim()) {
      setError('タイトルと本文は必須です');
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('articles')
      .insert({
        author_id: user?.id,
        title: title.trim(),
        category: category.trim() || null,
        image_url: imageUrl.trim() || null,
        content: content.trim(),
        published: true, // 一旦常にtrue
      });

    if (insertError) {
      setError('記事の作成に失敗しました: ' + insertError.message);
      setSubmitting(false);
    } else {
      router.push('/admin/articles');
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">読込中...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-earth mb-8">新規記事作成</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-grass-light">
              {/* タイトル */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-semibold text-earth mb-2">
                  タイトル *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none text-lg"
                  placeholder="記事のタイトルを入力"
                  required
                />
              </div>

              {/* カテゴリ */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-semibold text-earth mb-2">
                  カテゴリ
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                  placeholder="例: 飼育基礎、健康管理、食事"
                />
              </div>

              {/* 画像URL */}
              <div className="mb-6">
                <label htmlFor="imageUrl" className="block text-sm font-semibold text-earth mb-2">
                  アイキャッチ画像URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                  placeholder="/slides/hero1.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  画像は /public フォルダ内のパスを指定してください
                </p>
              </div>

              {/* 本文 */}
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-semibold text-earth mb-2">
                  本文 *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none font-mono text-sm"
                  rows={20}
                  placeholder="記事の本文を入力（Markdown形式）

## 見出し2
### 見出し3

通常の段落テキスト

- リスト項目1
- リスト項目2"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  ## で見出し2、### で見出し3、- でリスト項目になります
                </p>
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-grass text-white py-4 rounded-lg font-semibold hover:bg-grass-light transition disabled:opacity-50 shadow-md"
              >
                <Save size={20} />
                {submitting ? '保存中...' : '保存する'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/articles')}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-grass hover:text-grass transition shadow-md"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}