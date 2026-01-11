export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-40">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-earth mb-6 text-center">
          新規登録
        </h1>

        <form className="space-y-4">
          {/* ユーザー名 */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              ユーザー名
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="うさぎ太郎"
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
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="example@email.com"
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
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="••••••••"
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
              className="w-full px-4 py-2 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* 登録ボタン */}
          <button
            type="submit"
            className="w-full bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition"
          >
            登録する
          </button>
        </form>

        {/* ログインリンク */}
        <p className="mt-6 text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方は
          <a href="/login" className="text-grass font-semibold hover:underline ml-1">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
}