'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoBuilding, IconLocation, IconMail, IconGlobe, IconPhoneFilled } from '@/components/icons';
import { SocialIcon, buildSocialLinks } from '@/components/SocialLinks';

const NAVY = '#0b2440';
const GOLD = '#c9a24b';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.settings) setSocialLinks(buildSocialLinks(d.settings)); })
      .catch(() => {});
  }, []);

  const aboutLinks = [
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Tầm nhìn - Sứ mệnh', href: '/about' },
    { label: 'Đội ngũ nhân sự', href: '/about' },
    { label: 'Tuyển dụng', href: '/contact' },
    { label: 'Liên hệ', href: '/contact' },
  ];
  const serviceLinks = [
    { label: 'Mua bán bất động sản', href: '/products' },
    { label: 'Cho thuê bất động sản', href: '/products?type=thue' },
    { label: 'Tư vấn đầu tư', href: '/contact' },
    { label: 'Quản lý bất động sản', href: '/contact' },
    { label: 'Hỗ trợ pháp lý', href: '/contact' },
  ];
  const projectLinks = [
    { label: 'Dự án căn hộ', href: '/products?category=can-ho' },
    { label: 'Dự án nhà phố', href: '/products?category=nha-pho' },
    { label: 'Dự án biệt thự', href: '/products?category=biet-thu' },
    { label: 'Dự án đất nền', href: '/products?category=dat-nen' },
    { label: 'Dự án nghỉ dưỡng', href: '/products?category=nghi-duong' },
  ];
  const linkStyle = { fontSize: 12.5, color: '#9aabbf', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' };
  const colTitle = { fontSize: 12.5, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 };
  const hIn = (e) => { e.currentTarget.style.color = GOLD; };
  const hOut = (e) => { e.currentTarget.style.color = '#9aabbf'; };

  return (
    <footer style={{ backgroundColor: NAVY, color: '#9aabbf', fontFamily: 'Inter, sans-serif' }}>
      <div className="container mx-auto px-4" style={{ paddingTop: 52, paddingBottom: 32 }}>
        <div className="pr-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.3fr', gap: 32 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <LogoBuilding size={42} color={GOLD} />
              <div style={{ lineHeight: 1 }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 900, letterSpacing: '0.04em', color: '#fff' }}>PRIME <span style={{ color: GOLD }}>REALTY</span></span>
                <span style={{ display: 'block', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.2em', color: '#7d8ea3', marginTop: 4, textTransform: 'uppercase' }}>Nơi tìm kiếm tổ ấm</span>
              </div>
            </Link>
            <p style={{ fontSize: 12.5, lineHeight: 1.75, fontWeight: 500, marginBottom: 18, maxWidth: 260 }}>
              Prime Realty - Đối tác tin cậy của bạn trên hành trình tìm kiếm tổ ấm và đầu tư bất động sản.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map((s) => (
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 34, height: 34, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.08)', color: '#c5d2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#c5d2e2'; }}>
                  <SocialIcon platform={s.key} size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 style={colTitle}>VỀ CHÚNG TÔI</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {aboutLinks.map((l, i) => <li key={i}><Link href={l.href} style={linkStyle} onMouseEnter={hIn} onMouseLeave={hOut}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 style={colTitle}>DỊCH VỤ</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {serviceLinks.map((l, i) => <li key={i}><Link href={l.href} style={linkStyle} onMouseEnter={hIn} onMouseLeave={hOut}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 style={colTitle}>DỰ ÁN</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {projectLinks.map((l, i) => <li key={i}><Link href={l.href} style={linkStyle} onMouseEnter={hIn} onMouseLeave={hOut}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 style={colTitle}>LIÊN HỆ</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 12.5, fontWeight: 500 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <IconLocation size={16} style={{ flexShrink: 0, marginTop: 1, color: GOLD }} />
                <span>123 Đường Nguyễn Huệ,<br />Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <IconPhoneFilled size={15} style={{ flexShrink: 0, color: GOLD }} />
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 13.5 }}>0909 123 456</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <IconMail size={16} style={{ flexShrink: 0, color: GOLD }} />
                <span>info@nhadatprime.vn</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <IconGlobe size={16} style={{ flexShrink: 0, color: GOLD }} />
                <span>www.nhadatprime.vn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto px-4" style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 11.5, fontWeight: 500 }}>
          <div>© 2024 <strong style={{ color: '#c5d2e2' }}>Prime Realty</strong>. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 22 }}>
            <Link href="#" style={linkStyle} onMouseEnter={hIn} onMouseLeave={hOut}>Chính sách bảo mật</Link>
            <Link href="#" style={linkStyle} onMouseEnter={hIn} onMouseLeave={hOut}>Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .pr-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .pr-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
