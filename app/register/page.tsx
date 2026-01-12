'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // パスワード確認
    if (password !== passwordConfirm) {
      setError('パスワードが一致しません');
      setLoading(false);
      return;
    }

    // パスワードの長さチェック
    if (password.length < 6) {
      setError('パスワードは6文字以上で設定してください');
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (signUpError) {
      setError('登録に失敗しました: ' + signUpError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-start justify-center pt-40">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-earth mb-6 text-center">
            登録完了
          </h1>
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            確認メールを送信しました。メールを確認してアカウントを有効化してください。
          </div>
          <Link
            href="/login"
            className="block w-full bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition text-center"
          >
            ログインページへ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-40">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-earth mb-6 text-center">
          新規登録
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* ユーザー名 */}
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

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* パスワード */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* パスワード確認 */}
          <div>
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 mb-1">
              パスワード（確認）
            </label>
            <input
              type="password"
              id="password-confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* 登録ボタン */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition disabled:opacity-50"
          >
            {loading ? '登録中...' : '登録する'}
          </button>
        </form>

        {/* ログインリンク */}
        <p className="mt-6 text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方は
          <Link href="/login" className="text-grass font-semibold hover:underline ml-1">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}