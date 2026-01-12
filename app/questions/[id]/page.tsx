'use client';

import { MessageCircle, User } from 'lucide-react';
import { use } from 'react';

export default function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 仮の質問データ
  const question = {
    id: parseInt(id),
    question: 'おすすめのペレットは？',
    askedBy: 'うさぎ初心者',
    askedAt: '2026-01-10',
    answers: [
      {
        id: 1,
        user: 'もふもふママ',
        answer: 'うちはオーチャードグラスのペレット使ってます！食いつきいいですよ～',
        postedAt: '2026-01-10',
      },
      {
        id: 2,
        user: 'ぴょん吉パパ',
        answer: 'バニーセレクションがおすすめ。グルテンフリーで安心です',
        postedAt: '2026-01-10',
      },
      {
        id: 3,
        user: 'うさこ',
        answer: 'うちの子はコンフィデンスが好きみたい。毛艶も良くなりました',
        postedAt: '2026-01-11',
      },
    ],
  };

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
                  {question.askedBy} • {question.askedAt}
                </p>
                <h1 className="text-2xl font-bold text-earth mt-2">
                  {question.question}
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
                  <div className="p-2 bg-cream rounded-full flex-shrink-0">
                    <User size={16} className="text-earth" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-earth">{answer.user}</p>
                      <span className="text-xs text-gray-400">
                        {answer.postedAt}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {answer.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 回答投稿フォーム（準備中） */}
          <div className="mt-8 bg-white border-2 border-grass-light rounded-lg p-6">
            <h3 className="font-semibold text-earth mb-4">回答する</h3>
            <textarea
              placeholder="あなたの回答を書いてください（200文字以内）"
              className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none resize-none"
              rows={4}
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">※ログインが必要です</span>
              <button
                disabled
                className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              >
                投稿する（準備中）
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}