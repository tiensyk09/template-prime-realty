'use client';
import React from 'react';
import Link from 'next/link';
import { IconLocation, IconArea } from '@/components/icons';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function ProjectsSection() {
  const projects = [
    {
      id: 1, name: 'The Rivus Elie Saab', location: 'Quận 9, TP. Thủ Đức',
      price: 'Từ 85 Tỷ/căn', area: '300 - 500 m²', status: 'Đang mở bán',
      badge: 'BIỆT THỰ', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', slug: 'the-rivus-elie-saab',
    },
    {
      id: 2, name: 'Lumière Boulevard', location: 'Quận 9, TP. Thủ Đức',
      price: 'Từ 3.8 Tỷ/căn', area: '45 - 120 m²', status: 'Đang mở bán',
      badge: 'CĂN HỘ CAO CẤP', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', slug: 'lumiere-boulevard',
    },
    {
      id: 3, name: 'Vinhomes Ocean Park 3', location: 'Hưng Yên',
      price: 'Từ 2.6 Tỷ/căn', area: '70 - 150 m²', status: 'Đang mở bán',
      badge: 'KHU ĐÔ THỊ', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', slug: 'vinhomes-ocean-park-3',
    },
    {
      id: 4, name: 'Aqua City', location: 'Biên Hòa, Đồng Nai',
      price: 'Từ 5.2 Tỷ/căn', area: '90 - 200 m²', status: 'Đang mở bán',
      badge: 'NHÀ PHỐ', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', slug: 'aqua-city',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 28 }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: NAVY, fontSize: 27, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>DỰ ÁN NỔI BẬT</h2>
            <div style={{ width: 56, height: 3, backgroundColor: GOLD, margin: '10px auto 0' }} />
          </div>
          <Link href="/destinations" className="pr-viewall" style={{ position: 'absolute', right: 0, color: NAVY, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Xem tất cả dự án <span style={{ color: GOLD }}>→</span>
          </Link>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="pr-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {projects.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group"
                style={{ display: 'block', textDecoration: 'none', backgroundColor: '#fff', border: '1px solid #eef1f5', borderRadius: 8, overflow: 'hidden', transition: 'all 0.25s' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 18px 36px rgba(13,42,77,0.14)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ position: 'relative', height: 160, overflow: 'hidden', backgroundColor: '#eef1f5' }}>
                  <img src={p.image} alt={p.name} className="group-hover:scale-105 transition-transform duration-500" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, backgroundColor: GOLD, color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{p.badge}</span>
                </div>
                <div style={{ padding: '14px 15px 16px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{p.name}</h3>
                  <div style={{ fontSize: 12, color: '#8a97a8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                    <IconLocation size={13} style={{ color: '#8a97a8' }} /> {p.location}
                  </div>
                  <div style={{ color: GOLD, fontSize: 15, fontWeight: 800, marginBottom: 10 }}>{p.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 10, borderTop: '1px solid #f2f5f8', fontSize: 11.5, color: '#6b7787', fontWeight: 500 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><IconArea size={14} style={{ color: GOLD }} /> {p.area}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 7, height: 7, borderRadius: 999, backgroundColor: '#22c55e' }} /> {p.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Arrows trang trí */}
          <div className="pr-proj-arrow" style={{ position: 'absolute', left: -18, top: '42%', width: 36, height: 36, borderRadius: 999, backgroundColor: '#fff', border: '1px solid #e5e9ee', boxShadow: '0 4px 12px rgba(13,42,77,0.12)', color: NAVY, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>‹</div>
          <div className="pr-proj-arrow" style={{ position: 'absolute', right: -18, top: '42%', width: 36, height: 36, borderRadius: 999, backgroundColor: '#fff', border: '1px solid #e5e9ee', boxShadow: '0 4px 12px rgba(13,42,77,0.12)', color: NAVY, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>›</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pr-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pr-viewall { position: static !important; }
          .pr-proj-arrow { display: none !important; }
        }
        @media (max-width: 640px) {
          .pr-projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
