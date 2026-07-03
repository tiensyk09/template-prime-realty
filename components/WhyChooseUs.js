'use client';
import React from 'react';
import { SectionOrnament, IconHouse, IconUsersGroup, IconBriefcase, IconRoute, IconHeadset2 } from '@/components/icons';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function WhyChooseUs() {
  const reasons = [
    { icon: <IconHouse size={30} />, title: 'KINH NGHIỆM', desc: '10+ năm trong lĩnh vực bất động sản' },
    { icon: <IconUsersGroup size={30} />, title: 'ĐỘI NGŨ CHUYÊN NGHIỆP', desc: 'Tư vấn viên giàu kinh nghiệm, am hiểu thị trường' },
    { icon: <IconBriefcase size={30} />, title: 'DANH MỤC ĐA DẠNG', desc: 'Sản phẩm phong phú, phù hợp mọi nhu cầu' },
    { icon: <IconRoute size={30} />, title: 'QUY TRÌNH CHUYÊN NGHIỆP', desc: 'Hỗ trợ toàn diện từ A-Z, nhanh chóng - hiệu quả' },
    { icon: <IconHeadset2 size={30} />, title: 'HỖ TRỢ SAU GIAO DỊCH', desc: 'Đồng hành và hỗ trợ lâu dài' },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 style={{ color: NAVY, fontSize: 27, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>VÌ SAO CHỌN PRIME REALTY?</h2>
          <SectionOrnament color={GOLD} />
        </div>

        <div className="pr-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, backgroundColor: '#f8fafc', border: '1px solid #eef1f5', borderRadius: 10, overflow: 'hidden' }}>
          {reasons.map((r, i) => (
            <div key={i} className="pr-why-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px 20px', borderRight: i < reasons.length - 1 ? '1px solid #eef1f5' : 'none', transition: 'background 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
              <div style={{ width: 58, height: 58, borderRadius: 999, backgroundColor: '#fff', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: 15 }}>
                {r.icon}
              </div>
              <h3 style={{ fontSize: 12, fontWeight: 800, color: NAVY, textTransform: 'uppercase', marginBottom: 8, lineHeight: 1.4, letterSpacing: '0.02em' }}>{r.title}</h3>
              <p style={{ fontSize: 11, color: '#8a97a8', fontWeight: 500, lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pr-why-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .pr-why-item:nth-child(3) { border-right: none !important; }
        }
        @media (max-width: 640px) {
          .pr-why-grid { grid-template-columns: 1fr 1fr !important; }
          .pr-why-item { border-right: none !important; }
        }
      `}</style>
    </section>
  );
}
