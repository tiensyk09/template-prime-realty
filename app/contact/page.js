'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function ContactPage() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc!', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Gửi thông tin liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        showToast(data.error || 'Gửi liên hệ thất bại, vui lòng thử lại.', 'error');
      }
    } catch {
      showToast('Lỗi kết nối, vui lòng thử lại sau.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
          <Link href="/" style={{ color: '#374151', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: '#c9a24b', fontWeight: 600 }}>Liên hệ</span>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0d2a4d', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Liên Hệ Với Chúng Tôi
          </h1>
          <p style={{ color: '#4b5563', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Prime Realty luôn sẵn sàng lắng nghe mọi thắc mắc và nhu cầu về bất động sản của quý khách. Hãy liên hệ để được chuyên viên tư vấn tận tình, miễn phí.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', alignItems: 'start' }} className="contact-grid">
          
          {/* Left Column: Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Info Cards */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f6f2e9', color: '#c9a24b', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📍
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0d2a4d', margin: '0 0 6px 0' }}>Trụ sở chính</h4>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f6f2e9', color: '#c9a24b', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📞
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0d2a4d', margin: '0 0 6px 0' }}>Hotline / Zalo tư vấn</h4>
                  <a href="tel:0909123456" style={{ fontSize: '18px', fontWeight: 800, color: '#c9a24b', textDecoration: 'none' }}>0909 123 456</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f6f2e9', color: '#c9a24b', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  ✉️
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0d2a4d', margin: '0 0 6px 0' }}>Hòm thư điện tử</h4>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>info@nhadatprime.vn</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f6f2e9', color: '#c9a24b', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  🌐
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0d2a4d', margin: '0 0 6px 0' }}>Trang thông tin điện tử</h4>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>www.nhadatprime.vn</p>
                </div>
              </div>

            </div>

            {/* Business info notice card */}
            <div style={{ background: 'linear-gradient(135deg, #c9a24b 0%, #0d2a4d 100%)', color: '#ffffff', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(13, 104, 50, 0.1)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prime Realty</h4>
              <p style={{ fontSize: '13px', lineHeight: 1.5, opacity: 0.9, margin: 0 }}>
                Sàn giao dịch bất động sản uy tín - Kết nối khách hàng với hàng ngàn sản phẩm nhà đất chính chủ, pháp lý minh bạch trên toàn quốc.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0d2a4d', marginBottom: '20px' }}>Gửi tin nhắn cho chúng tôi</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Họ và tên *</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Số điện thoại *</label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Email (không bắt buộc)</label>
                  <input
                    type="email"
                    placeholder="Nhập địa chỉ email..."
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Nội dung cần tư vấn *</label>
                <textarea
                  rows="4"
                  placeholder="Nhập nội dung tin nhắn hoặc nhu cầu tư vấn..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? '#6b7280' : '#c9a24b',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  boxShadow: '0 4px 14px rgba(13, 104, 50, 0.15)',
                  marginTop: '10px'
                }}
              >
                {submitting ? 'Đang gửi thông tin...' : 'Gửi liên hệ ngay'}
              </button>

            </form>
          </div>

        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 850px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
