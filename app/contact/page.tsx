'use client';

import { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 仮の送信処理（後でバックエンド実装時に置き換え）
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-earth mb-4 text-center">
            お問い合わせ
          </h1>
          <p className="text-center text-grass mb-8">
            ご質問やご意見がございましたら、お気軽にお問い合わせください。
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-grass rounded-full mb-4">
                  <Send className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-earth mb-2">
                  送信完了しました
                </h3>
                <p className="text-gray-600 mb-6">
                  お問い合わせありがとうございます。<br />
                  3営業日以内にご返信いたします。
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 bg-grass text-white rounded-lg hover:bg-grass-light transition"
                >
                  続けて送信する
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* お名前 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User size={18} className="text-grass" />
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                    placeholder="山田太郎"
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-6 mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-grass" />
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                    placeholder="example@email.com"
                  />
                </div>

                {/* お問い合わせ種別 */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mt-6 mb-2 flex items-center gap-2">
                    <MessageSquare size={18} className="text-grass" />
                    お問い合わせ種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none"
                  >
                    <option value="">選択してください</option>
                    <option value="service">サービスについて</option>
                    <option value="technical">技術的な問題</option>
                    <option value="account">アカウントについて</option>
                    <option value="content">投稿内容について</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                {/* お問い合わせ内容 */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mt-6 mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-grass-light rounded-lg focus:border-grass focus:outline-none resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>

                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-grass text-white py-3 rounded-lg font-semibold hover:bg-grass-light transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <>処理中...</>
                  ) : (
                    <>
                      <Send size={20} />
                      送信する
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* 注意事項 */}
          <div className="mt-8 bg-white rounded-lg p-6 border-2 border-grass-light">
            <h3 className="font-semibold text-earth mb-3">ご注意事項</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• ご返信には3営業日程度お時間をいただく場合がございます。</li>
              <li>• お問い合わせ内容によっては、ご返信できない場合がございます。</li>
              <li>• 迷惑メール対策などでドメイン指定受信を設定されている場合、ご返信メールが届かない可能性があります。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}