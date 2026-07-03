'use client';
import React from 'react';
import Link from 'next/link';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1, title: 'The Rivus Elie Saab', location: 'Quận 9, TP. Thủ Đức', invest: 'Chủ đầu tư: Masterise Homes',
      price: 'Từ 85 Tỷ/căn · 300 - 500 m²',
      description: 'Khu biệt thự hàng hiệu đầu tiên tại Việt Nam hợp tác cùng thương hiệu thời trang Elie Saab. Kiến trúc tân cổ điển sang trọng, mật độ xây dựng thấp, tiện ích 5 sao ven sông Sài Gòn. Pháp lý sổ hồng lâu dài, bàn giao hoàn thiện cao cấp.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', badge: 'Đang mở bán'
    },
    {
      id: 2, title: 'Lumière Boulevard', location: 'Quận 9, TP. Thủ Đức', invest: 'Chủ đầu tư: Masterise Homes',
      price: 'Từ 3.8 Tỷ/căn · 45 - 120 m²',
      description: 'Căn hộ cao cấp nằm trên đại lộ Mai Chí Thọ, kết nối trực tiếp cao tốc Long Thành - Dầu Giây. Thiết kế hiện đại, tiện ích nội khu đẳng cấp, bàn giao nội thất thương hiệu. Ngân hàng hỗ trợ vay đến 70%, ân hạn gốc lãi 24 tháng.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', badge: 'Đang mở bán'
    },
    {
      id: 3, title: 'Vinhomes Ocean Park 3', location: 'Văn Giang, Hưng Yên', invest: 'Chủ đầu tư: Vinhomes',
      price: 'Từ 2.6 Tỷ/căn · 70 - 150 m²',
      description: 'Đại đô thị biển hồ với công viên nước, biển hồ nước mặn và hồ Ngọc Trai trung tâm. Hệ sinh thái tiện ích Vinschool, Vinmec, Vincom đồng bộ. Sản phẩm đa dạng: shophouse, biệt thự, liền kề - tiềm năng cho thuê và đầu tư dài hạn.',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', badge: 'Đang mở bán'
    },
    {
      id: 4, title: 'Aqua City', location: 'Biên Hòa, Đồng Nai', invest: 'Chủ đầu tư: Novaland',
      price: 'Từ 5.2 Tỷ/căn · 90 - 200 m²',
      description: 'Khu đô thị sinh thái thông minh 1.000ha bên sông Đồng Nai, chỉ 30 phút về trung tâm TP.HCM. Nhà phố, biệt thự ven sông với hệ tiện ích thể thao, giáo dục, y tế hoàn chỉnh. Pháp lý minh bạch, sổ hồng từng căn.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', badge: 'Đang mở bán'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#8a97a8' }}>
          <Link href="/" style={{ color: '#3a4a5c', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: GOLD, fontWeight: 600 }}>Dự án</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: NAVY, marginBottom: '12px', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            Dự Án Nổi Bật
          </h1>
          <div style={{ width: 56, height: 3, backgroundColor: GOLD, margin: '0 auto 16px' }} />
          <p style={{ color: '#6b7787', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Danh mục các dự án bất động sản chính chủ, pháp lý minh bạch được Prime Realty tuyển chọn và phân phối trên toàn quốc.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {projects.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={p.id} className="dest-card"
                style={{ display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', gap: '40px', alignItems: 'center', background: '#ffffff', borderRadius: '10px', padding: '28px', border: '1px solid #eef1f5', boxShadow: '0 4px 20px rgba(13,42,77,0.04)', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 440px', height: '300px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'; }} />
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: GOLD, color: '#fff', padding: '6px 14px', borderRadius: '3px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {p.badge}
                  </span>
                </div>
                <div style={{ flex: '1 1 440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ fontSize: '13px', color: GOLD, fontWeight: 700 }}>📍 {p.location}</span>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: NAVY, margin: 0 }}>{p.title}</h2>
                    <span style={{ fontSize: '12.5px', color: '#8a97a8', fontWeight: 600 }}>{p.invest}</span>
                    <span style={{ fontSize: '15px', color: NAVY, fontWeight: 800, marginTop: 2 }}>{p.price}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7787', lineHeight: 1.7, margin: 0 }}>{p.description}</p>
                  <div>
                    <Link href="/contact"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f6f2e9', color: GOLD, padding: '11px 22px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#f6f2e9'; e.currentTarget.style.color = GOLD; }}>
                      Nhận bảng giá & tư vấn →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '56px', background: `linear-gradient(135deg, #14375e 0%, ${NAVY} 100%)`, borderRadius: '10px', padding: '44px', textAlign: 'center', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '130px', opacity: 0.06, pointerEvents: 'none' }}>🏢</div>
          <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Tìm Dự Án Phù Hợp Với Bạn?</h3>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', maxWidth: '600px', margin: '0 auto 26px', lineHeight: 1.6 }}>
            Chuyên viên Prime Realty sẵn sàng tư vấn miễn phí, cung cấp bảng giá và chính sách bán hàng mới nhất từ chủ đầu tư.
          </p>
          <a href="tel:0909123456"
            style={{ display: 'inline-block', background: GOLD, color: '#ffffff', padding: '14px 36px', borderRadius: '6px', fontWeight: 800, fontSize: '13px', letterSpacing: '0.06em', textDecoration: 'none' }}>
            HOTLINE: 0909 123 456
          </a>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 992px) {
          .dest-card { flex-direction: column !important; padding: 22px !important; }
        }
      `}</style>
    </div>
  );
}
