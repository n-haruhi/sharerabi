import Link from 'next/link';
import {Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-grass text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* サイト情報 */}
          <div>
            <h3 className="text-xl font-bold mb-4">シェアラビ</h3>
            <p className="text-sm text-cream/80">
              うさぎの情報をみんなでシェアする
              <br />
              コミュニティサイト
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cream transition">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-cream transition">
                  ギャラリー
                </Link>
              </li>
              <li>
                <Link href="/questions" className="hover:text-cream transition">
                  質問コーナー
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream transition">
                  サイトについて
                </Link>
              </li>
            </ul>
          </div>

          {/* SNS・その他 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">その他</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-cream transition">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cream transition">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cream transition">
                  利用規約
                </Link>
              </li>
            </ul>
            
            {/* SNSアイコン */}
            <div className="mt-4 flex gap-3">
              <a href="#" className="hover:text-cream transition" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-cream transition" aria-label="Facebook">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-cream/80">
          © 2026 シェアラビ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}