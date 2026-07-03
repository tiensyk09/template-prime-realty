'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoBuilding, IconMail, IconPhoneFilled, IconClock, IconTag } from '@/components/icons';
import { SocialIcon, buildSocialLinks } from '@/components/SocialLinks';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to check auth state in header:', err);
      }
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/login', { method: 'DELETE' });
      if (res.ok) {
        setUser(null);
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const buyMenu = [
    { title: 'Căn hộ chung cư', link: '/products?category=can-ho' },
    { title: 'Nhà phố', link: '/products?category=nha-pho' },
    { title: 'Biệt thự', link: '/products?category=biet-thu' },
    { title: 'Đất nền', link: '/products?category=dat-nen' },
  ];
  const rentMenu = [
    { title: 'Cho thuê căn hộ', link: '/products?category=can-ho&type=thue' },
    { title: 'Cho thuê nhà phố', link: '/products?category=nha-pho&type=thue' },
    { title: 'Cho thuê văn phòng', link: '/products?category=van-phong&type=thue' },
  ];

  const navItems = [
    { href: '/', label: 'TRANG CHỦ' },
    { href: '/about', label: 'GIỚI THIỆU' },
    { href: '/products', label: 'MUA BÁN', dropdown: buyMenu },
    { href: '/products', label: 'CHO THUÊ', dropdown: rentMenu },
    { href: '/destinations', label: 'DỰ ÁN' },
    { href: '/blog', label: 'TIN TỨC' },
    { href: '/contact', label: 'LIÊN HỆ' },
  ];

  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
  );

  const [socialLinks, setSocialLinks] = useState([]);
  React.useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.settings) setSocialLinks(buildSocialLinks(d.settings)); })
      .catch(() => {});
  }, []);

  return (
    <header style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* 1. TOP BAR */}
      <div className="pr-top-bar" style={{ backgroundColor: NAVY, color: '#c5d2e2', fontSize: 12, padding: '7px 16px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconMail size={14} style={{ color: GOLD }} /> info@nhadatprime.vn
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconPhoneFilled size={13} style={{ color: GOLD }} /> 0909 123 456
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconClock size={14} style={{ color: GOLD }} /> Thứ 2 - Chủ nhật: 8:00 - 21:00
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#c5d2e2', textDecoration: 'none' }}>
              <IconTag size={13} style={{ color: GOLD }} /> Đăng ký nhận tin
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {socialLinks.map((s) => (
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ color: '#c5d2e2', display: 'inline-flex', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#c5d2e2'; }}>
                  <SocialIcon platform={s.key} size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div style={{ backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px rgba(13,42,77,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '10px 16px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', flexShrink: 0 }}>
            <LogoBuilding size={44} color={GOLD} />
            <div style={{ lineHeight: 1 }}>
              <span style={{ display: 'block', fontSize: 22, fontWeight: 900, letterSpacing: '0.04em', color: NAVY }}>
                PRIME <span style={{ color: GOLD }}>REALTY</span>
              </span>
              <span style={{ display: 'block', fontSize: 8.5, fontWeight: 700, letterSpacing: '0.2em', color: '#8a97a8', marginTop: 4, textTransform: 'uppercase' }}>
                Nơi tìm kiếm tổ ấm
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="pr-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            {navItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={item.label} style={{ position: 'relative' }}
                  onMouseEnter={() => item.dropdown && setOpenMenu(item.label)}
                  onMouseLeave={() => item.dropdown && setOpenMenu(null)}
                >
                  <Link href={item.href}
                    style={{ position: 'relative', fontSize: 12.5, fontWeight: isActive ? 800 : 600, letterSpacing: '0.04em', color: isActive ? NAVY : '#3a4a5c', textDecoration: 'none', padding: '22px 0', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? NAVY : '#3a4a5c'; }}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                    {isActive && <span style={{ position: 'absolute', bottom: 14, left: 0, right: 0, height: 2.5, backgroundColor: GOLD }} />}
                  </Link>

                  {item.dropdown && openMenu === item.label && (
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 220, backgroundColor: '#fff', border: '1px solid #e8ecf1', borderRadius: 6, boxShadow: '0 16px 36px rgba(13,42,77,0.15)', zIndex: 100, overflow: 'hidden', animation: 'prFadeInDown 0.15s ease-out' }}>
                      {item.dropdown.map((sub, i) => (
                        <Link key={i} href={sub.link} onClick={() => setOpenMenu(null)}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13, fontWeight: 600, color: '#3a4a5c', borderBottom: i < item.dropdown.length - 1 ? '1px solid #f2f5f8' : 'none', textDecoration: 'none', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f7f9fc'; e.currentTarget.style.color = GOLD; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#3a4a5c'; }}
                        >
                          <span style={{ width: 5, height: 5, backgroundColor: GOLD, flexShrink: 0, transform: 'rotate(45deg)' }} />
                          <span>{sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link href="/contact" className="pr-cta-btn"
              style={{ backgroundColor: NAVY, color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '13px 20px', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = NAVY; }}
            >
              ĐĂNG TIN MIỄN PHÍ <IconTag size={15} />
            </Link>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="pr-mobile-menu-toggle" aria-label="Menu"
              style={{ display: 'none', padding: 8, border: '1px solid #e5e9ee', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 18, color: NAVY }}>
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f2f5f8', padding: 16, boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: NAVY, borderBottom: '1px solid #f2f5f8', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              ))}
              {user ? (
                <div style={{ padding: '12px 0', borderBottom: '1px solid #f2f5f8', fontSize: 14 }}>
                  <div style={{ fontWeight: 600, color: NAVY }}>Chào, {user.displayName || user.username}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} style={{ color: GOLD, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Tin đã đăng</Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', padding: 0, color: '#dc2626', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Đăng xuất</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: NAVY, borderBottom: '1px solid #f2f5f8', textDecoration: 'none' }}>
                  Đăng nhập
                </Link>
              )}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'block', textAlign: 'center', marginTop: 16, backgroundColor: NAVY, color: '#fff', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', padding: '12px 20px', borderRadius: 6, textDecoration: 'none' }}>
                Đăng tin miễn phí
              </Link>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes prFadeInDown {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 1024px) {
          .pr-top-bar { display: none !important; }
          .pr-desktop-nav { display: none !important; }
          .pr-mobile-menu-toggle { display: block !important; }
          .pr-cta-btn { padding: 10px 14px !important; font-size: 11px !important; }
        }
      `}</style>
    </header>
  );
}
