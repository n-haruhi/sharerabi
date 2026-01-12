export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-earth mb-8 text-center">
            シェアラビについて
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-earth mb-4">
              シェアラビとは
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              シェアラビは、うさぎを愛するすべての人のための情報共有コミュニティサイトです。うさぎの飼育方法、健康管理、日々の生活の工夫など、飼い主さん同士が気軽に情報交換できる場所を目指しています。
            </p>
            <p className="text-gray-700 leading-relaxed">
              初めてうさぎを飼う方から、長年一緒に暮らしている方まで、すべてのうさぎ愛好家が楽しく交流できるコミュニティを作りたいという想いから、このサイトは生まれました。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-earth mb-4">
              シェアラビでできること
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-grass rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">記事を読む</h3>
                  <p className="text-gray-600 text-sm">
                    うさぎの飼育方法、健康管理、おすすめグッズなど、役立つ情報が満載の記事をお届けします。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-grass rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">写真を共有</h3>
                  <p className="text-gray-600 text-sm">
                    かわいいうさぎの写真をギャラリーに投稿して、みんなと共有できます。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-grass rounded-full mt-2 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">質問する</h3>
                  <p className="text-gray-600 text-sm">
                    飼育で困ったことや気になることを質問コーナーで聞いてみましょう。経験豊富な飼い主さんからアドバイスがもらえます。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-earth mb-4">
              サイトの理念
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              うさぎと人が、より豊かで幸せな関係を築けるよう、正しい知識と温かいコミュニティを提供します。
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-grass mt-1">✓</span>
                <span>うさぎの健康と幸せを第一に考える</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-grass mt-1">✓</span>
                <span>初心者から経験者まで、誰もが気軽に参加できる</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-grass mt-1">✓</span>
                <span>思いやりと尊重の心で交流する</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-earth mb-4">
              お問い合わせ
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              サイトに関するご質問やご意見がございましたら、お気軽にお問い合わせください。
            </p>
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-grass text-white rounded-lg hover:bg-grass-light transition"
            >
              お問い合わせフォームへ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}