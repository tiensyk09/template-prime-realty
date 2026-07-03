'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconLocation, IconArea, IconBed, IconBath, IconHeart } from '@/components/icons';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function PropertiesSection() {
  const fallback = [
    { id: 1, name: 'Căn hộ Vinhomes Central Park', location: 'Bình Thạnh, TP. HCM', price: '2.9 Tỷ', area: '68', beds: 2, baths: 2, badge: 'CĂN HỘ', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80', slug: 'can-ho-vinhomes-central-park' },
    { id: 2, name: 'Nhà phố KDT Sala', location: 'Quận 2, TP. Thủ Đức', price: '16.5 Tỷ', area: '100', beds: 4, baths: 5, badge: 'NHÀ PHỐ', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', slug: 'nha-pho-kdt-sala' },
    { id: 3, name: 'Biệt thự Lakeview City', location: 'Quận 2, TP. Thủ Đức', price: '28 Tỷ', area: '200', beds: 4, baths: 4, badge: 'BIỆT THỰ', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', slug: 'biet-thu-lakeview-city' },
    { id: 4, name: 'Đất nền Long Thành', location: 'Long Thành, Đồng Nai', price: '1.8 Tỷ', area: '100', beds: 0, baths: 0, badge: 'ĐẤT NỀN', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', slug: 'dat-nen-long-thanh' },
    { id: 5, name: 'Căn hộ Masteri Thảo Điền', location: 'Quận 2, TP. Thủ Đức', price: '4.2 Tỷ', area: '55', beds: 1, baths: 1, badge: 'CĂN HỘ', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80', slug: 'can-ho-masteri-thao-dien' },
  ];

  const [tab, setTab] = useState('ban');
  const [properties, setProperties] = useState(fallback);

  useEffect(() => {
    fetch('/api/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProperties(data.products.map((p) => ({
            id: p.id, name: p.name, location: p.origin || 'Việt Nam',
            price: p.price >= 1e9 ? (p.price / 1e9).toFixed(1) + ' Tỷ' : (p.price / 1e6).toFixed(0) + ' Tr',
            area: p.unit && /\d/.test(p.unit) ? p.unit : (p.area || '—'),
            beds: p.beds || 0, baths: p.baths || 0,
            badge: (p.brand || 'BĐS').toUpperCase(), image: p.thumbnail, slug: p.slug,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-12" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="container mx-auto px-4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 26 }}>
          <div>
            <h2 style={{ color: NAVY, fontSize: 27, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>BẤT ĐỘNG SẢN NỔI BẬT</h2>
            <div style={{ width: 56, height: 3, backgroundColor: GOLD, marginTop: 10 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid transparent' }}>
              {[{ k: 'ban', l: 'Bán' }, { k: 'thue', l: 'Cho thuê' }].map((t) => (
                <button key={t.k} onClick={() => setTab(t.k)}
                  style={{ background: 'none', border: 'none', padding: '4px 2px', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', color: tab === t.k ? NAVY : '#8a97a8', borderBottom: tab === t.k ? `2.5px solid ${GOLD}` : '2.5px solid transparent' }}>
                  {t.l}
                </button>
              ))}
            </div>
            <Link href="/products" className="pr-prop-viewall" style={{ color: NAVY, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Xem tất cả <span style={{ color: GOLD }}>→</span></Link>
          </div>
        </div>

        <div className="pr-prop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {properties.slice(0, 5).map((p) => (
            <div key={p.id} className="group" style={{ backgroundColor: '#fff', border: '1px solid #eef1f5', borderRadius: 8, overflow: 'hidden', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 32px rgba(13,42,77,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <Link href={`/products/${p.slug}`} style={{ display: 'block', position: 'relative', height: 130, overflow: 'hidden', backgroundColor: '#eef1f5' }}>
                <img src={p.image} alt={p.name} className="group-hover:scale-105 transition-transform duration-500" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'; }} />
                <span style={{ position: 'absolute', top: 10, left: 10, backgroundColor: NAVY, color: '#fff', fontSize: 9.5, fontWeight: 800, padding: '4px 9px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{p.badge}</span>
                <span style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.92)', color: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconHeart size={15} /></span>
              </Link>
              <div style={{ padding: '13px 14px 15px' }}>
                <Link href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: NAVY, marginBottom: 5, lineHeight: 1.35, minHeight: 37 }}>{p.name}</h3>
                </Link>
                <div style={{ fontSize: 11.5, color: '#8a97a8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                  <IconLocation size={12} /> {p.location}
                </div>
                <div style={{ color: GOLD, fontSize: 16, fontWeight: 800, marginBottom: 10 }}>{p.price}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 9, borderTop: '1px solid #f2f5f8', fontSize: 11, color: '#6b7787', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconArea size={13} style={{ color: '#8a97a8' }} /> {p.area} m²</span>
                  {p.beds > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconBed size={13} style={{ color: '#8a97a8' }} /> {p.beds}</span>}
                  {p.baths > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconBath size={13} style={{ color: '#8a97a8' }} /> {p.baths}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pr-prop-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .pr-prop-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pr-prop-viewall { display: none; }
        }
      `}</style>
    </section>
  );
}
