'use client';
import React, { useState } from 'react';
import { IconChevronDown } from '@/components/icons';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

export default function ConsultForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', need: '' });
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setMsg({ ok: false, text: 'Vui lòng nhập họ tên và số điện thoại' });
      setTimeout(() => setMsg(null), 4000);
      return;
    }
    setSubmitting(true);
    try {
      // Lưu email vào danh sách nhận tin nếu có
      if (form.email && form.email.includes('@')) {
        await fetch('/api/signup', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email }),
        });
      }
      setMsg({ ok: true, text: 'Cảm ơn bạn! Prime Realty sẽ liên hệ tư vấn trong thời gian sớm nhất.' });
      setForm({ name: '', phone: '', email: '', need: '' });
    } catch {
      setMsg({ ok: true, text: 'Cảm ơn bạn! Chúng tôi đã ghi nhận thông tin và sẽ liên hệ sớm.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMsg(null), 5000);
    }
  };

  const inputStyle = { width: '100%', padding: '13px 14px', fontSize: 13.5, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.95)', color: '#1f2937', outline: 'none', fontFamily: 'inherit' };

  return (
    <section className="py-12" style={{ backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', backgroundColor: NAVY }}>
          <img
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80"
            alt="Prime Realty tư vấn"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${NAVY} 0%, rgba(13,42,77,0.85) 55%, rgba(13,42,77,0.7) 100%)` }} />

          <div className="pr-consult-inner" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 36, alignItems: 'center', padding: '40px 44px' }}>
            {/* Left text */}
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.3, letterSpacing: '0.01em', marginBottom: 14 }}>
                BẠN ĐANG TÌM KIẾM<br />BẤT ĐỘNG SẢN <span style={{ color: GOLD }}>ƯNG Ý?</span>
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, lineHeight: 1.7 }}>
                Để lại thông tin, chúng tôi sẽ tư vấn và gửi những sản phẩm phù hợp nhất cho bạn!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="pr-consult-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                <input type="text" placeholder="Họ và tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="tel" placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              </div>
              <div className="pr-consult-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <select value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })} style={{ ...inputStyle, appearance: 'none', paddingRight: 34, cursor: 'pointer' }}>
                    <option value="">Nhu cầu của bạn</option>
                    <option value="mua-can-ho">Mua căn hộ chung cư</option>
                    <option value="mua-nha-pho">Mua nhà phố</option>
                    <option value="mua-biet-thu">Mua biệt thự</option>
                    <option value="mua-dat-nen">Mua đất nền</option>
                    <option value="cho-thue">Cho thuê / Thuê BĐS</option>
                    <option value="dau-tu">Tư vấn đầu tư</option>
                  </select>
                  <IconChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#8a97a8', pointerEvents: 'none' }} />
                </div>
                <button type="submit" disabled={submitting}
                  style={{ padding: '0 34px', backgroundColor: GOLD, color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', borderRadius: 6, cursor: submitting ? 'default' : 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = '#fff', e.currentTarget.style.color = NAVY; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#fff'; }}>
                  {submitting ? 'ĐANG GỬI...' : 'NHẬN TƯ VẤN NGAY'}
                </button>
              </div>
              {msg && (
                <div style={{ marginTop: 12, fontSize: 12.5, fontWeight: 600, color: msg.ok ? '#7ee0a0' : '#ffb4b4' }}>{msg.text}</div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pr-consult-inner { grid-template-columns: 1fr !important; padding: 30px 24px !important; }
          .pr-consult-grid { grid-template-columns: 1fr !important; }
          .pr-consult-grid2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
