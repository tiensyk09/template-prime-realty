'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconChevronDown, IconSearch } from '@/components/icons';

const NAVY = '#0d2a4d';
const GOLD = '#c9a24b';

/**
 * Thanh tìm kiếm bất động sản dùng chung.
 * variant = 'hero'  → nổi đè lên đáy hero (bo góc trên trái)
 * variant = 'block' → khối độc lập cho Page Builder
 * configs → cấu hình từ block (title, các option tuỳ biến)
 */
export default function PropertySearchBar({ variant = 'block', configs = {} }) {
  const router = useRouter();
  const [tab, setTab] = useState('ban');
  const [propType, setPropType] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [area, setArea] = useState('');

  const tabs = configs.tabs || [
    { key: 'ban', label: 'MUA BÁN' },
    { key: 'thue', label: 'CHO THUÊ' },
    { key: 'duan', label: 'DỰ ÁN' },
  ];

  const propOptions = configs.propOptions || [
    { value: 'can-ho', label: 'Căn hộ chung cư' },
    { value: 'nha-pho', label: 'Nhà phố' },
    { value: 'biet-thu', label: 'Biệt thự' },
    { value: 'dat-nen', label: 'Đất nền' },
    { value: 'van-phong', label: 'Văn phòng' },
  ];

  const locationOptions = configs.locationOptions || [
    { value: 'Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'Đồng Nai', label: 'Đồng Nai' },
    { value: 'Bình Dương', label: 'Bình Dương' },
    { value: 'Hưng Yên', label: 'Hưng Yên' },
  ];

  // value dạng "min-max" (đơn vị: tỷ đồng). Rỗng ở một đầu = không giới hạn.
  const priceOptions = [
    { value: '', label: 'Chọn khoảng giá' },
    { value: '0-2', label: 'Dưới 2 tỷ' },
    { value: '2-5', label: '2 - 5 tỷ' },
    { value: '5-10', label: '5 - 10 tỷ' },
    { value: '10-', label: 'Trên 10 tỷ' },
  ];

  // value dạng "min-max" (đơn vị: m²)
  const areaOptions = [
    { value: '', label: 'Chọn diện tích' },
    { value: '0-50', label: 'Dưới 50 m²' },
    { value: '50-100', label: '50 - 100 m²' },
    { value: '100-200', label: '100 - 200 m²' },
    { value: '200-', label: 'Trên 200 m²' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    // Tab "Dự án" → sang trang dự án
    if (tab === 'duan') {
      router.push('/destinations');
      return;
    }

    const params = new URLSearchParams();
    if (propType) params.set('category', propType);
    if (location) params.set('location', location);
    if (tab === 'thue') params.set('type', 'thue');
    else params.set('type', 'ban');

    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.set('price_min', String(Number(min) * 1e9));
      if (max) params.set('price_max', String(Number(max) * 1e9));
    }
    if (area) {
      const [min, max] = area.split('-');
      if (min && min !== '0') params.set('area_min', min);
      if (max) params.set('area_max', max);
    }

    router.push(`/products?${params.toString()}`);
  };

  const selectStyle = { width: '100%', padding: '13px 34px 13px 14px', fontSize: 13, color: '#3a4a5c', border: '1px solid #e2e7ee', borderRadius: 6, backgroundColor: '#fff', outline: 'none', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer', fontWeight: 500 };
  const labelStyle = { display: 'block', fontSize: 10.5, fontWeight: 700, color: '#8a97a8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 };

  const Field = ({ label, value, onChange, options, placeholder }) => (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={onChange} style={selectStyle}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <IconChevronDown size={16} style={{ position: 'absolute', right: 12, bottom: 14, color: '#8a97a8', pointerEvents: 'none' }} />
    </div>
  );

  const formRadius = variant === 'hero' ? '0 8px 8px 8px' : 8;

  return (
    <div className="pr-search-root">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2 }}>
        {tabs.map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)}
            style={{ padding: '11px 26px', fontSize: 12.5, fontWeight: 800, letterSpacing: '0.04em', border: 'none', cursor: 'pointer', borderRadius: '6px 6px 0 0', backgroundColor: tab === t.key ? NAVY : 'rgba(13,42,77,0.72)', color: tab === t.key ? '#fff' : '#c5d2e2', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="pr-search-form"
        style={{ backgroundColor: '#fff', borderRadius: formRadius, padding: 16, display: 'grid', gridTemplateColumns: '1.3fr 1.3fr 1.3fr 1.3fr auto', gap: 12, boxShadow: variant === 'hero' ? '0 18px 40px rgba(13,42,77,0.18)' : '0 6px 20px rgba(13,42,77,0.08)', border: variant === 'block' ? '1px solid #eef1f5' : 'none' }}>
        <Field label="Loại bất động sản" value={propType} onChange={(e) => setPropType(e.target.value)} options={propOptions} placeholder="Chọn loại" />
        <Field label="Vị trí" value={location} onChange={(e) => setLocation(e.target.value)} options={locationOptions} placeholder="Chọn vị trí" />
        <Field label="Khoảng giá" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} options={priceOptions.slice(1)} placeholder="Chọn khoảng giá" />
        <Field label="Diện tích" value={area} onChange={(e) => setArea(e.target.value)} options={areaOptions.slice(1)} placeholder="Chọn diện tích" />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit"
            style={{ height: 46, padding: '0 28px', backgroundColor: GOLD, color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap', transition: 'background 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = NAVY; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GOLD; }}>
            <IconSearch size={17} /> TÌM KIẾM
          </button>
        </div>
      </form>

      <style>{`
        @media (max-width: 1024px) {
          .pr-search-form { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .pr-search-form { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
