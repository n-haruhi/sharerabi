'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type Question = {
  id: string;
  title: string;
  answer_count: number;
};

export default function QuestionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    const loadQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          id,
          title,
          answers:answers(count)
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const questionsWithCount = data.map((q: { id: string; title: string; answers: { count: number }[] }) => ({
          id: q.id,
          title: q.title,
          answer_count: q.answers[0]?.count || 0,
        }));
        setQuestions(questionsWithCount);
      }
      setLoading(false);
    };

    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ページネーション計算
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">読込中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-earth mb-6 text-center">
          質問コーナー
        </h1>
        {/* <p className="text-center text-grass mb-12">
          うさぎの飼育に関する質問と回答
        </p> */}

        {user && (
          <div className="max-w-3xl mx-auto mb-6 flex justify-center">
            <Link
              href="/questions/new"
              className="flex items-center gap-2 px-6 py-2 bg-grass text-white rounded-lg font-semibold hover:bg-grass-light transition"
            >
              <Plus size={20} />
              質問する
            </Link>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-4">
          {currentQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => router.push(`/questions/${q.id}`)}
              className="bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-earth mb-2">
                {q.title.length > 33
                  ? `${q.title.substring(0, 33)}...`
                  : q.title}
              </h3>
              <p className="text-sm text-grass flex items-center gap-1">
                <MessageCircle size={16} />
                {q.answer_count}件の回答
              </p>
            </div>
          ))}
        </div>

        {/* ページネーション */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-grass text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-grass-light transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === page
                    ? 'bg-grass text-white font-semibold'
                    : 'bg-gray-200 text-gray-700 hover:bg-grass-light hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-grass text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-grass-light transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ページ情報 */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {questions.length}件中 {startIndex + 1} - {Math.min(startIndex + questionsPerPage, questions.length)}件を表示
        </p>
      </main>
    </div>
  );
}