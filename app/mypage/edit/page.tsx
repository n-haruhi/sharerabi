'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';

export default function EditProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { username }
    });

    if (updateError) {
      setError('更新に失敗しました');
      setSaving(false);
    } else {
      setSuccess(true);
      setSaving(false);
      setTimeout(() => {
        router.push('/mypage');
      }, 1500);
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
        <h1 className="text-3xl font-bold text-earth mb-8">プロフィール編集</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              保存しました！マイページに戻ります...
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                ユーザー名
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                placeholder="うさぎ太郎"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={user.email || ''}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                disabled
                readOnly
              />
              <p className="mt-1 mb-2 text-xs text-gray-500">メールアドレスは変更できません</p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存する'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage')}
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