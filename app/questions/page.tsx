export default function QuestionsPage() {
  const dummyQuestions = [
    { id: 1, question: 'おすすめのペレットは？', answers: 3 },
    { id: 2, question: 'うさぎの爪切りの頻度は？', answers: 5 },
    { id: 3, question: '牧草を食べてくれません', answers: 7 },
    { id: 4, question: '好きなおもちゃは何ですか？', answers: 4 },
    { id: 5, question: 'どこの牧草が好きですか？', answers: 6 },
    { id: 6, question: '名前の由来を聞かせてください', answers: 15 },
    { id: 7, question: '我が子を選ぶ決め手となったエピソードは？', answers: 17 },
  ];

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
          {dummyQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white border-2 border-grass-light rounded-lg p-6 hover:border-grass transition"
            >
              <h3 className="text-xl font-semibold text-earth mb-2">
                {q.question}
              </h3>
              <p className="text-sm text-grass">
                💬 {q.answers}件の回答
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}