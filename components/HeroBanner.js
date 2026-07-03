'use client';
import React from 'react';
import { IconBuildings, IconShieldCheck2, IconHandHeart, IconShieldCheck, IconTag } from '@/components/icons';
import PropertySearchBar from '@/components/PropertySearchBar';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function HeroBanner() {
  const usps = [
    { icon: <IconBuildings size={26} />, title: 'NGUỒN HÀNG ĐA DẠNG', desc: 'Hơn 10.000+ bất động sản' },
    { icon: <IconShieldCheck2 size={26} />, title: 'THÔNG TIN MINH BẠCH', desc: 'Kiểm duyệt kỹ lưỡng' },
    { icon: <IconHandHeart size={26} />, title: 'HỖ TRỢ TẬN TÂM', desc: 'Tư vấn 1:1 chuyên nghiệp' },
    { icon: <IconShieldCheck size={26} />, title: 'PHÁP LÝ AN TOÀN', desc: 'Đảm bảo giao dịch' },
    { icon: <IconTag size={26} />, title: 'GIÁ TỐT NHẤT THỊ TRƯỜNG', desc: 'Cam kết giá cạnh tranh' },
  ];

  return (
    <div className="w-full">
      {/* HERO — KHÔNG dùng overflow:hidden ở đây để không cắt thanh tìm kiếm nổi bên dưới */}
      <div style={{ position: 'relative', minHeight: 560, backgroundColor: NAVY }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80"
          alt="Prime Realty"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(245,247,250,0.96) 0%, rgba(245,247,250,0.82) 32%, rgba(245,247,250,0.25) 62%, rgba(13,42,77,0.05) 100%)' }} />

        <div className="pr-hero-inner" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '70px 64px 130px', zIndex: 4 }}>
          <h1 className="pr-hero-title" style={{ fontSize: 52, fontWeight: 900, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.12, marginBottom: 4 }}>
            TÌM NHÀ NHƯ Ý
          </h1>
          <div className="pr-hero-sub" style={{ fontSize: 46, fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.1, marginBottom: 20 }}>
            SỐNG NHƯ MƠ
          </div>
          <p style={{ fontSize: 15.5, color: '#3a4a5c', fontWeight: 500, lineHeight: 1.7, maxWidth: 440 }}>
            Prime Realty - Đối tác tin cậy trên hành trình tìm kiếm tổ ấm và đầu tư bất động sản của bạn.
          </p>
        </div>

        {/* SEARCH BAR — đè lên đáy hero (dùng component chung) */}
        <div className="pr-search-wrap" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 6 }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px', transform: 'translateY(50%)' }}>
            <PropertySearchBar variant="hero" />
          </div>
        </div>
      </div>

      {/* USP STRIP — cách đáy để chừa chỗ cho search bar nổi */}
      <div style={{ backgroundColor: '#f5f7fa', paddingTop: 92, paddingBottom: 8 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px' }}>
          <div className="pr-usp-grid" style={{ backgroundColor: '#fff', border: '1px solid #eef1f5', borderRadius: 8, padding: '22px 16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', boxShadow: '0 6px 20px rgba(13,42,77,0.05)' }}>
            {usps.map((u, i) => (
              <div key={i} className="pr-usp-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 16px', borderRight: i < usps.length - 1 ? '1px solid #eef1f5' : 'none' }}>
                <span style={{ color: GOLD, flexShrink: 0 }}>{u.icon}</span>
                <div>
                  <h4 style={{ fontSize: 11.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', lineHeight: 1.35, marginBottom: 3 }}>{u.title}</h4>
                  <p style={{ fontSize: 10.5, color: '#8a97a8', fontWeight: 500, lineHeight: 1.4 }}>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pr-search-form { grid-template-columns: 1fr 1fr !important; }
          .pr-usp-grid { grid-template-columns: repeat(3, 1fr) !important; row-gap: 18px; }
          .pr-usp-item { border-right: none !important; }
        }
        @media (max-width: 768px) {
          .pr-hero-inner { padding: 44px 22px 150px !important; }
          .pr-hero-title { font-size: 34px !important; }
          .pr-hero-sub { font-size: 30px !important; }
          .pr-search-form { grid-template-columns: 1fr !important; }
          .pr-usp-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
