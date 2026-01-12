export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-earth mb-8">プライバシーポリシー</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section className="mb-8">
              <p className="mb-4">
                シェアラビ運営事務局（以下「当サイト」といいます）は、本ウェブサイト上で提供するサービス（以下「本サービス」といいます）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第1条（個人情報）
              </h2>
              <p>
                「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第2条（個人情報の収集方法）
              </h2>
              <p className="mb-2">当サイトは、ユーザーが利用登録をする際に、以下の個人情報をお尋ねすることがあります。</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>ユーザー名</li>
                <li>メールアドレス</li>
                <li>パスワード</li>
                <li>その他当サイトが定める入力フォームにユーザーが入力する情報</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第3条（個人情報を収集・利用する目的）
              </h2>
              <p className="mb-2">当サイトが個人情報を収集・利用する目的は、以下のとおりです。</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>本サービスの提供・運営のため</li>
                <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等の案内を送付するため</li>
                <li>メンテナンス、重要なお知らせなど必要に応じた連絡のため</li>
                <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
                <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                <li>上記の利用目的に付随する目的</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第4条（利用目的の変更）
              </h2>
              <p className="mb-2">
                当サイトは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
              </p>
              <p>
                利用目的の変更を行った場合には、変更後の目的について、当サイト所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第5条（個人情報の第三者提供）
              </h2>
              <p className="mb-2">
                当サイトは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第6条（個人情報の開示）
              </h2>
              <p>
                当サイトは、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合</li>
                <li>当サイトの業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
                <li>その他法令に違反することとなる場合</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第7条（個人情報の訂正および削除）
              </h2>
              <p className="mb-2">
                ユーザーは、当サイトの保有する自己の個人情報が誤った情報である場合には、当サイトが定める手続きにより、当サイトに対して個人情報の訂正、追加または削除（以下「訂正等」といいます）を請求することができます。
              </p>
              <p>
                当サイトは、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第8条（個人情報の利用停止等）
              </h2>
              <p>
                当サイトは、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下「利用停止等」といいます）を求められた場合には、遅滞なく必要な調査を行います。調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第9条（Cookieその他の技術の利用）
              </h2>
              <p>
                当サイトのサービスは、Cookieおよび類似の技術を利用することがあります。これらの技術は、当サイトによる本サービスの利用状況等の把握に役立ち、サービス向上に資するものです。Cookieを無効化されたいユーザーは、ウェブブラウザの設定を変更することによりCookieを無効化することができます。ただし、Cookieを無効化すると、本サービスの一部の機能をご利用いただけなくなる場合があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第10条（プライバシーポリシーの変更）
              </h2>
              <p className="mb-2">
                本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
              </p>
              <p>
                当サイトが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-earth mb-4 pb-2 border-b-2 border-grass-light">
                第11条（お問い合わせ窓口）
              </h2>
              <p className="mb-2">
                本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-semibold">シェアラビ運営事務局</p>
                <p className="text-sm">Eメールアドレス: contact@sharerabi.com（仮）</p>
              </div>
            </section>

            <div className="text-right text-sm text-gray-500 mt-8">
              <p>制定日: 2026年1月12日</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}