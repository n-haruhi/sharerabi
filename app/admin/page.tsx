'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Users, MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [stats, setStats] = useState({
    articles: 0,
    questions: 0,
    users: 0,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const loadStats = async () => {
      const [articlesRes, questionsRes, usersRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        articles: articlesRes.count || 0,
        questions: questionsRes.count || 0,
        users: usersRes.count || 0,
      });
    };

    if (user && isAdmin) {
      loadStats();
    }
  }, [user, isAdmin, supabase]);

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
        <h1 className="text-4xl font-bold text-earth mb-2 text-center">
          管理者ダッシュボード
        </h1>
        <p className="text-center text-grass mb-12">
          サイトの管理・運営
        </p>

        {/* 統計カード */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-grass-light">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-earth">記事</h3>
                <FileText className="text-grass" size={24} />
              </div>
              <p className="text-3xl font-bold text-grass">{stats.articles}</p>
              <p className="text-sm text-gray-500 mt-1">公開中の記事</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-grass-light">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-earth">質問</h3>
                <MessageCircle className="text-grass" size={24} />
              </div>
              <p className="text-3xl font-bold text-grass">{stats.questions}</p>
              <p className="text-sm text-gray-500 mt-1">投稿された質問</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-grass-light">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-earth">ユーザー</h3>
                <Users className="text-grass" size={24} />
              </div>
              <p className="text-3xl font-bold text-grass">{stats.users}</p>
              <p className="text-sm text-gray-500 mt-1">登録ユーザー</p>
            </div>
          </div>
        </div>

        {/* 管理メニュー */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-earth mb-6">管理メニュー</h2>
          
          <div className="space-y-4">
            {/* 記事管理 */}
            <Link
              href="/admin/articles"
              className="block bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-grass" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-earth">記事管理</h3>
                    <p className="text-sm text-gray-600">記事の作成・編集・削除</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* ユーザー管理（準備中） */}
            <div className="block bg-white border-2 border-grass-light rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="text-grass" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-earth">ユーザー管理</h3>
                    <p className="text-sm text-gray-600">準備中</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 質問管理（準備中） */}
            <div className="block bg-white border-2 border-grass-light rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-grass" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-earth">質問管理</h3>
                    <p className="text-sm text-gray-600">準備中</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}