'use client';

import { useState } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function QuestionsPage() {
  const router = useRouter();

  const dummyQuestions = [
    { id: 1, question: 'おすすめのペレットは？', answers: 3 },
    { id: 2, question: 'うさぎの爪切りの頻度は？', answers: 5 },
    { id: 3, question: '牧草を食べてくれません', answers: 7 },
    { id: 4, question: '好きなおもちゃは何ですか？', answers: 4 },
    { id: 5, question: 'どこの牧草が好きですか？', answers: 6 },
    { id: 6, question: '名前の由来を聞かせてください', answers: 15 },
    { id: 7, question: '我が子を選ぶ決め手となったエピソードは？', answers: 17 },
    { id: 8, question: 'おひげの色は何色？', answers: 8 },
    { id: 9, question: '寒さ対策/暑さ対策どうしてる？', answers: 4 },
    { id: 10, question: '車内乗車位置と長距離運転における社内対策は', answers: 5 },
    { id: 11, question: 'チンチラ（他種）との共存の仕方', answers: 4 },
    { id: 12, question: 'シニアさんの対策、段差なくすとか床材フカフカにするとか', answers: 8 },
    { id: 13, question: '我が子のにおいは？', answers: 14 },
    { id: 14, question: 'うさ吸いする部分はどこ？', answers: 12 },
    { id: 15, question: '換毛期、毛がすごいけどどうしてる？手を洗っても料理中とか、どこにでもついてしまうんだけど', answers: 5 },
    { id: 16, question: 'うちの子の一発芸は？', answers: 6 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // ページネーション計算
  const totalPages = Math.ceil(dummyQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = dummyQuestions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-earth mb-8 text-center">
          質問コーナー
        </h1>
        <p className="text-center text-grass mb-12">
          うさぎの飼育に関する質問と回答（準備中）
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {currentQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => router.push(`/questions/${q.id}`)}
              className="bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-earth mb-2">
                {q.question.length > 33
                  ? `${q.question.substring(0, 33)}...`
                  : q.question}
              </h3>
              <p className="text-sm text-grass flex items-center gap-1">
                <MessageCircle size={16} />
                {q.answers}件の回答
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
          {dummyQuestions.length}件中 {startIndex + 1} - {Math.min(startIndex + questionsPerPage, dummyQuestions.length)}件を表示
        </p>
      </main>
    </div>
  );
}