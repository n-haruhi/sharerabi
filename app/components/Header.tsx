'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Images, MessageCircleQuestion, Info, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const navItems = [
    { name: 'ホーム', path: '/', icon: Home },
    { name: 'ギャラリー', path: '/gallery', icon: Images },
    { name: '質問コーナー', path: '/questions', icon: MessageCircleQuestion },
    { name: 'サイトについて', path: '/about', icon: Info },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="relative z-50 bg-grass text-white shadow-md">
      <div className="container mx-auto px-4">
        {/* ロゴとログインボタン */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold hover:text-cream transition">
            シェアラビ
          </Link>
          
          {loading ? (
            <div className="px-6 py-2 bg-cream text-grass font-semibold rounded-full">
              読込中...
            </div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/mypage"
                className="flex items-center gap-2 px-4 py-2 hover:text-cream transition"
              >
                <User size={18} />
                マイページ
              </Link>
              <button
                onClick={handleSignOut}
                className="px-6 py-2 bg-cream text-grass font-semibold rounded-full hover:bg-white transition"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 bg-cream text-grass font-semibold rounded-full hover:bg-white transition"
            >
              ログイン
            </Link>
          )}
        </div>

        {/* ナビゲーション */}
        <nav className="pb-4">
          <ul className="flex justify-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`px-4 py-2 transition flex items-center gap-2 ${
                      pathname === item.path
                        ? 'text-cream font-semibold border-b-2 border-cream'
                        : 'text-white hover:text-cream'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}