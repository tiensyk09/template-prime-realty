'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function NewsSection() {
  const fallback = [
    { id: 1, title: 'Thị trường bất động sản 2024: Cơ hội và thách thức', date: '20/05/2024', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80', slug: 'thi-truong-bat-dong-san-2024' },
    { id: 2, title: 'Lãi suất ngân hàng giảm: Cơ hội vàng cho người mua nhà', date: '16/05/2024', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80', slug: 'lai-suat-ngan-hang-giam' },
    { id: 3, title: 'Đầu tư bất động sản vùng ven: Xu hướng mới của giới đầu tư', date: '10/05/2024', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80', slug: 'dau-tu-bat-dong-san-vung-ven' },
    { id: 4, title: '5 lưu ý quan trọng khi mua nhà lần đầu', date: '05/05/2024', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', slug: '5-luu-y-khi-mua-nha-lan-dau' },
  ];

  const [posts, setPosts] = useState(fallback);

  useEffect(() => {
    fetch('/api/posts?status=published&limit=4')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.map((p) => ({
            id: p.id, title: p.title,
            date: p.created_at ? new Date(p.created_at).toLocaleDateString('vi-VN') : 'Mới nhất',
            image: p.image, slug: p.slug,
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
            <h2 style={{ color: NAVY, fontSize: 27, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>TIN TỨC & NHẬN ĐỊNH</h2>
            <div style={{ width: 56, height: 3, backgroundColor: GOLD, marginTop: 10 }} />
          </div>
          <Link href="/blog" className="pr-news-viewall" style={{ color: NAVY, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Xem tất cả <span style={{ color: GOLD }}>→</span></Link>
        </div>

        <div className="pr-news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="group" style={{ backgroundColor: '#fff', border: '1px solid #eef1f5', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 32px rgba(13,42,77,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <Link href={`/posts/${post.slug}`} style={{ display: 'block', position: 'relative', height: 150, overflow: 'hidden', backgroundColor: '#eef1f5' }}>
                <img src={post.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80'} alt={post.title}
                  className="group-hover:scale-105 transition-transform duration-500" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80'; }} />
              </Link>
              <div style={{ padding: '14px 15px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, marginBottom: 7 }}>{post.date}</div>
                <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, lineHeight: 1.4, marginBottom: 12, minHeight: 40 }}>{post.title}</h3>
                </Link>
                <Link href={`/posts/${post.slug}`} style={{ marginTop: 'auto', color: NAVY, fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Xem chi tiết <span style={{ color: GOLD }}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .pr-news-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .pr-news-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
