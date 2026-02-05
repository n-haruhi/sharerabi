'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Images, MessageCircleQuestion, Info, Settings, User, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'ホーム', path: '/', icon: Home },
    { name: 'ギャラリー', path: '/gallery', icon: Images },
    { name: '質問コーナー', path: '/questions', icon: MessageCircleQuestion },
    { name: 'サイトについて', path: '/about', icon: Info },
  ];

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="relative z-50 bg-grass text-white shadow-md">
      <div className="container mx-auto px-4">
        {/* ロゴとメニューボタン */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold hover:text-cream transition">
            シェアラビ
          </Link>
          
          {loading ? (
            <div className="px-6 py-2 bg-cream text-grass font-semibold rounded-full">
              読込中...
            </div>
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-grass-light rounded-lg transition"
              >
                <Settings size={20} />
              </button>

              {/* ドロップダウンメニュー */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 border-2 border-grass-light overflow-hidden"
                  style={{ width: 'min(155px, 90vw)' }}
                >
                  <Link
                    href="/mypage"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-earth hover:bg-cream transition text-base"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <User size={18} className="text-grass shrink-0" />
                    <span>マイページ</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-earth hover:bg-cream transition text-base"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Shield size={18} className="text-grass shrink-0" />
                      <span>サイト管理</span>
                    </Link>
                  )}

                  <hr className="my-2 border-grass-light" />

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-earth hover:bg-cream transition text-base text-left"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <LogOut size={18} className="text-red-600 shrink-0" />
                    <span>ログアウト</span>
                  </button>
                </div>
              )}
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