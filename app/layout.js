import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/components/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import PluginRunner from '@/components/PluginRunner';
import TopLoader from '@/components/TopLoader';

// Nạp Inter kèm subset tiếng Việt để dấu hiển thị đúng, không fallback sang font hệ thống
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Prime Realty - Nơi tìm kiếm tổ ấm | Mua bán & Cho thuê Bất động sản',
  description: 'Prime Realty - Đối tác tin cậy trên hành trình tìm kiếm tổ ấm và đầu tư bất động sản. Hơn 10.000+ căn hộ, nhà phố, biệt thự, đất nền, dự án chính chủ, pháp lý an toàn.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <TopLoader color="#14477e" />
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <PluginRunner />
        </CartProvider>
      </body>
    </html>
  );
}
