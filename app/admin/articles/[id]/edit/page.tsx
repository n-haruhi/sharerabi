'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';
import { Save } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  content: string;
  published: true; // 一旦常にtrue
};

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadingArticle, setLoadingArticle] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const loadArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError('記事が見つかりません');
        setLoadingArticle(false);
        return;
      }

      setArticle(data);
      setTitle(data.title);
      setCategory(data.category || '');
      setImageUrl(data.image_url || '');
      setContent(data.content);
      setLoadingArticle(false);
    };

    if (user && isAdmin) {
      loadArticle();
    }
  }, [id, user, isAdmin, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!title.trim() || !content.trim()) {
      setError('タイトルと本文は必須です');
      setSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('articles')
      .update({
        title: title.trim(),
        category: category.trim() || null,
        image_url: imageUrl.trim() || null,
        content: content.trim(),
        published: true, // 常にtrue
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      setError('記事の更新に失敗しました: ' + updateError.message);
      setSubmitting(false);
    } else {
      router.push('/admin/articles');
      router.refresh();
    }
  };

  if (loading || loadingArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">読込中...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">記事が見つかりません</p>
          <button
            onClick={() => router.push('/admin/articles')}
            className="px-6 py-3 bg-grass text-white rounded-lg hover:bg-grass-light transition"
          >
            記事一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-earth mb-8">記事を編集</h1>

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
                  placeholder="記事の本文を入力（Markdown形式）"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  ## で見出し2、### で見出し3、- でリスト項目になります
                </p>
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-grass text-white py-4 rounded-lg font-semibold hover:bg-grass-light transition disabled:opacity-50"
              >
                <Save size={20} />
                {submitting ? '保存中...' : '更新する'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/articles')}
                className="px-8 py-4 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
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