'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';

export default function NewQuestionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: insertError } = await supabase
      .from('questions')
      .insert({
        user_id: user?.id,
        username: user?.user_metadata?.username || '匿名',
        title: title.trim(),
      });

    if (insertError) {
      setError('質問の投稿に失敗しました');
      setSubmitting(false);
    } else {
      router.push('/questions');
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

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-earth mb-8">新しい質問を投稿</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                質問内容
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                placeholder="例: おすすめのペレットは？"
                required
                maxLength={100}
              />
              <p className="mt-1 text-xs text-gray-500">
                {title.length}/100文字
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting || !title.trim()}
                className="flex-1 bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition disabled:opacity-50"
              >
                {submitting ? '投稿中...' : '投稿する'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/questions')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}