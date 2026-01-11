'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'ホーム', path: '/' },
    { name: 'ギャラリー', path: '/gallery' },
    { name: '質問コーナー', path: '/questions' },
  ];

  return (
    <header className="relative z-50 bg-grass text-white shadow-md">
      <div className="container mx-auto px-4">
        {/* ロゴとログインボタン */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold hover:text-cream transition">
            シェアラビ
          </Link>
          
          <Link
            href="/login"
            className="px-6 py-2 bg-cream text-grass font-semibold rounded-full hover:bg-white transition"
          >
            ログイン
          </Link>
        </div>

        {/* ナビゲーション */}
        <nav className="pb-4">
          <ul className="flex justify-center gap-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`px-4 py-2 transition ${
                    pathname === item.path
                      ? 'text-cream font-semibold border-b-2 border-cream'
                      : 'text-white hover:text-cream'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}