export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-40">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-earth mb-6 text-center">
          ログイン
        </h1>

        <form className="space-y-4">
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

          {/* ログインボタン */}
          <button
            type="submit"
            className="w-full bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition"
          >
            ログイン
          </button>
        </form>

        {/* 新規登録リンク */}
        <p className="mt-6 text-center text-sm text-gray-600">
          アカウントをお持ちでない方は
          <a href="/register" className="text-grass font-semibold hover:underline ml-1">
            新規登録
          </a>
        </p>
      </div>
    </div>
  );
}