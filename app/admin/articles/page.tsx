'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';
import { Plus, Edit, Trash2, } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  category: string;
  published: boolean;
  created_at: string;
};

export default function AdminArticlesPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const loadArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, category, published, created_at')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoadingArticles(false);
    };

    if (user && isAdmin) {
      loadArticles();
    }
  }, [user, isAdmin, supabase]);

  const handleDelete = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return;

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (!error) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  if (loading || loadingArticles) {
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-earth">記事管理</h1>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-2 px-6 py-3 bg-grass text-white rounded-lg font-semibold hover:bg-grass-light transition"
            >
              <Plus size={20} />
              新規作成
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center min-h-50 flex items-center justify-center">
              <p className="text-gray-500">まだ記事がありません</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-earth">
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-grass text-white px-3 py-1 rounded-full text-xs">
                          {article.category || '未分類'}
                        </span>
                        <span>
                          {new Date(article.created_at).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="p-2 text-grass hover:bg-grass-light hover:text-white rounded-lg transition"
                        title="編集"
                      >
                        <Edit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="削除"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}