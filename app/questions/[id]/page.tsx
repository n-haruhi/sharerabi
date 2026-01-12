'use client';

import { MessageCircle, User } from 'lucide-react';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type Answer = {
  id: string;
  username: string;
  content: string;
  created_at: string;
};

type Question = {
  id: string;
  title: string;
  username: string;
  created_at: string;
  answers: Answer[];
};

export default function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      const { data: questionData, error: qError } = await supabase
        .from('questions')
        .select('*')
        .eq('id', id)
        .single();

      const { data: answersData } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', id)
        .order('created_at', { ascending: true });

      if (!qError && questionData) {
        setQuestion({
          ...questionData,
          answers: answersData || [],
        });
      }
      setLoading(false);
    };

    loadQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('answers')
      .insert({
        question_id: id,
        user_id: user.id,
        username: user.user_metadata?.username || '匿名',
        content: answerText.trim(),
      });

    if (!error) {
      setAnswerText('');
      // 回答を再取得
      const { data: answersData } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', id)
        .order('created_at', { ascending: true });
      
      if (answersData && question) {
        setQuestion({
          ...question,
          answers: answersData,
        });
      }
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">読込中...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">質問が見つかりません</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* 質問カード */}
          <div className="bg-white border-2 border-grass rounded-lg p-8 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-grass-light rounded-full">
                <User size={20} className="text-grass" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {question.username} • {new Date(question.created_at).toLocaleDateString('ja-JP')}
                </p>
                <h1 className="text-2xl font-bold text-earth mt-2">
                  {question.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-1 text-grass">
              <MessageCircle size={18} />
              <span className="text-sm font-semibold">
                {question.answers.length}件の回答
              </span>
            </div>
          </div>

          {/* 回答一覧 */}
          <div className="space-y-4">
            {question.answers.map((answer) => (
              <div
                key={answer.id}
                className="bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass transition"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-cream rounded-full shrink-0">
                    <User size={16} className="text-earth" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-earth">{answer.username}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(answer.created_at).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {answer.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 回答投稿フォーム */}
          <div className="mt-8 bg-white border-2 border-grass-light rounded-lg p-6">
            <h3 className="font-semibold text-earth mb-4">回答する</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="あなたの回答を書いてください（200文字以内）"
                className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none resize-none"
                rows={4}
                maxLength={200}
                required
              />
              <div className="flex justify-between items-center mt-4">
                {user ? (
                  <span className="text-sm text-gray-500">
                    {answerText.length}/200文字
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">※ログインが必要です</span>
                )}
                <button
                  type="submit"
                  disabled={!user || submitting || !answerText.trim()}
                  className="px-6 py-2 bg-grass text-white rounded-lg hover:bg-grass-light transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {submitting ? '投稿中...' : user ? '投稿する' : '投稿する（準備中）'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}