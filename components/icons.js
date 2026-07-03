// Bộ icon SVG line-style dùng chung cho template Nha Khoa Smile
import React from 'react';

const S = (size, extra = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...extra,
});

export function IconTooth({ size = 24, strokeWidth = 1.7, ...props }) {
  return (
    <svg {...S(size)} strokeWidth={strokeWidth} {...props}>
      <path d="M7.5 3.5 C4.5 3.5 3 6.5 3.6 9.5 C4.3 13 5.8 17.5 6.6 19.8 C7 21 8.6 21 8.9 19.7 C9.3 17.6 9.6 14.5 12 14.5 C14.4 14.5 14.7 17.6 15.1 19.7 C15.4 21 17 21 17.4 19.8 C18.2 17.5 19.7 13 20.4 9.5 C21 6.5 19.5 3.5 16.5 3.5 C14.5 3.5 14 4.6 12 4.6 C10 4.6 9.5 3.5 7.5 3.5 Z" />
    </svg>
  );
}

export function IconToothSparkle({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M8 5.5 C5.6 5.5 4.4 7.9 4.9 10.3 C5.5 13.1 6.6 16.7 7.3 18.6 C7.6 19.6 8.9 19.6 9.2 18.5 C9.5 16.8 9.8 14.4 11.7 14.4 C13.6 14.4 13.9 16.8 14.2 18.5 C14.5 19.6 15.8 19.6 16.1 18.6 C16.8 16.7 17.9 13.1 18.5 10.3 C19 7.9 17.8 5.5 15.4 5.5 C13.8 5.5 13.3 6.4 11.7 6.4 C10.1 6.4 9.6 5.5 8 5.5 Z" />
      <path d="M19.5 2.5 L19.9 3.8 L21.2 4.2 L19.9 4.6 L19.5 5.9 L19.1 4.6 L17.8 4.2 L19.1 3.8 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconShieldCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 3 L19.5 5.8 V11 C19.5 15.8 16.4 19.6 12 21 C7.6 19.6 4.5 15.8 4.5 11 V5.8 Z" />
      <polyline points="9 11.5 11.2 13.7 15.2 9.7" />
    </svg>
  );
}

export function IconShieldTooth({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 2.8 L19.8 5.7 V11 C19.8 15.9 16.5 19.9 12 21.3 C7.5 19.9 4.2 15.9 4.2 11 V5.7 Z" />
      <path d="M9.7 8 C8.5 8 7.9 9 8.2 10.2 C8.5 11.5 9 13.2 9.4 14.2 C9.6 14.7 10.2 14.7 10.3 14.2 C10.5 13.3 10.6 12.1 12 12.1 C13.4 12.1 13.5 13.3 13.7 14.2 C13.8 14.7 14.4 14.7 14.6 14.2 C15 13.2 15.5 11.5 15.8 10.2 C16.1 9 15.5 8 14.3 8 C13.4 8 13.1 8.4 12 8.4 C10.9 8.4 10.6 8 9.7 8 Z" />
    </svg>
  );
}

export function IconClock({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5 V12 L15 14" />
    </svg>
  );
}

export function IconDollarCircle({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.8 V17.2" />
      <path d="M14.4 8.9 C14.4 8.1 13.3 7.7 12 7.7 C10.7 7.7 9.7 8.4 9.7 9.4 C9.7 12 14.4 11 14.4 13.7 C14.4 14.8 13.3 15.4 12 15.4 C10.7 15.4 9.6 14.8 9.6 13.9" />
    </svg>
  );
}

export function IconBadgeCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 2.8 L14.1 4.7 L16.9 4.3 L17.9 7 L20.5 8.1 L20 10.9 L21.8 13.1 L20 15.3 L20.5 18.1 L17.9 19.2 L16.9 21.9 L14.1 21.5 L12 23.4 L9.9 21.5 L7.1 21.9 L6.1 19.2 L3.5 18.1 L4 15.3 L2.2 13.1 L4 10.9 L3.5 8.1 L6.1 7 L7.1 4.3 L9.9 4.7 Z" transform="translate(0,-1.1)" />
      <polyline points="8.6 11.6 11 14 15.4 9.6" />
    </svg>
  );
}

export function IconDoctor({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="7.6" r="3.5" />
      <path d="M5 20.5 C5 16.6 8 14.8 12 14.8 C16 14.8 19 16.6 19 20.5" />
      <path d="M12 16.8 V19.2 M10.8 18 H13.2" />
    </svg>
  );
}

export function IconGear({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8 V5.2 M12 18.8 V21.2 M2.8 12 H5.2 M18.8 12 H21.2 M5.5 5.5 L7.2 7.2 M16.8 16.8 L18.5 18.5 M18.5 5.5 L16.8 7.2 M7.2 16.8 L5.5 18.5" />
    </svg>
  );
}

export function IconClipboardCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="5.5" y="4.2" width="13" height="17" rx="2" />
      <path d="M9.2 4.2 V3.4 C9.2 2.9 9.6 2.5 10.1 2.5 H13.9 C14.4 2.5 14.8 2.9 14.8 3.4 V4.2" />
      <polyline points="9 12.8 11.2 15 15 10.8" />
    </svg>
  );
}

export function IconHeartCare({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 20 C7 16.2 4 13.5 4 10.2 C4 7.8 5.9 6 8.2 6 C9.7 6 11.1 6.8 12 8 C12.9 6.8 14.3 6 15.8 6 C18.1 6 20 7.8 20 10.2 C20 13.5 17 16.2 12 20 Z" />
    </svg>
  );
}

export function IconPhone({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M8.4 3.5 C9.2 3.5 9.9 4 10.1 4.8 L10.8 7.4 C11 8.1 10.8 8.8 10.3 9.3 L9.5 10.1 C10.7 12.4 11.6 13.3 13.9 14.5 L14.7 13.7 C15.2 13.2 15.9 13 16.6 13.2 L19.2 13.9 C20 14.1 20.5 14.8 20.5 15.6 V17.5 C20.5 18.6 19.6 19.5 18.5 19.4 C11 18.7 5.3 13 4.6 5.5 C4.5 4.4 5.4 3.5 6.5 3.5 Z" />
    </svg>
  );
}

export function IconPhoneFilled({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.4 3 C9.4 3 10.3 3.7 10.6 4.7 L11.3 7.2 C11.5 8.1 11.3 9 10.6 9.6 L10 10.2 C11 12 11.9 12.9 13.8 14 L14.4 13.4 C15 12.7 15.9 12.5 16.8 12.7 L19.3 13.4 C20.3 13.7 21 14.6 21 15.6 V17.6 C21 19 19.9 20.1 18.5 20 C10.6 19.2 4.8 13.4 4 5.5 C3.9 4.1 5 3 6.4 3 Z" />
    </svg>
  );
}

export function IconCalendar({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9.5 H20 M8 3 V7 M16 3 V7" />
    </svg>
  );
}

export function IconLocation({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 21 C12 21 5.5 14.8 5.5 10 C5.5 6.4 8.4 3.5 12 3.5 C15.6 3.5 18.5 6.4 18.5 10 C18.5 14.8 12 21 12 21 Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function IconMail({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <polyline points="4.5 7 12 12.8 19.5 7" />
    </svg>
  );
}

export function IconGlobe({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12 H20.5" />
      <path d="M12 3.5 C14.3 5.8 15.4 8.8 15.4 12 C15.4 15.2 14.3 18.2 12 20.5 C9.7 18.2 8.6 15.2 8.6 12 C8.6 8.8 9.7 5.8 12 3.5 Z" />
    </svg>
  );
}

export function IconMedal({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="14.8" r="4.6" />
      <path d="M9 11.2 L5.8 3.5 H10 L12 8 L14 3.5 H18.2 L15 11.2" />
    </svg>
  );
}

export function IconUsers({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="9" cy="8.5" r="3.1" />
      <path d="M3.4 19.5 C3.4 16.3 5.9 14.6 9 14.6 C12.1 14.6 14.6 16.3 14.6 19.5" />
      <circle cx="16.7" cy="9.2" r="2.4" />
      <path d="M16.6 14.3 C19.1 14.5 20.8 16 20.8 18.5" />
    </svg>
  );
}

export function IconStar({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.6 L14.9 8.5 L21.4 9.4 L16.7 14 L17.8 20.5 L12 17.4 L6.2 20.5 L7.3 14 L2.6 9.4 L9.1 8.5 Z" />
    </svg>
  );
}

export function IconStarOutline({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 2.6 L14.9 8.5 L21.4 9.4 L16.7 14 L17.8 20.5 L12 17.4 L6.2 20.5 L7.3 14 L2.6 9.4 L9.1 8.5 Z" />
    </svg>
  );
}

export function IconArrowRight({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4 12 H20 M14 6 L20 12 L14 18" />
    </svg>
  );
}

export function IconCheckCircle({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <polyline points="8.5 12.2 10.8 14.5 15.5 9.8" />
    </svg>
  );
}

// ─── Social icons (filled) ─────────────────────────────────────
export function IconFacebook({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21 v-7 h2.4 l.4-2.8 h-2.8 V9.4 c0-.8.3-1.4 1.5-1.4 h1.4 V5.6 c-.6-.1-1.4-.2-2.2-.2 -2.2 0-3.6 1.3-3.6 3.7 v2.1 H8 v2.8 h2.6 v7 Z" />
    </svg>
  );
}

export function IconInstagram({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconYoutube({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.4 8 C21.2 6.8 20.5 5.9 19.3 5.7 C17.4 5.3 12 5.3 12 5.3 C12 5.3 6.6 5.3 4.7 5.7 C3.5 5.9 2.8 6.8 2.6 8 C2.3 9.9 2.3 12 2.3 12 C2.3 12 2.3 14.1 2.6 16 C2.8 17.2 3.5 18.1 4.7 18.3 C6.6 18.7 12 18.7 12 18.7 C12 18.7 17.4 18.7 19.3 18.3 C20.5 18.1 21.2 17.2 21.4 16 C21.7 14.1 21.7 12 21.7 12 C21.7 12 21.7 9.9 21.4 8 Z M10.2 15 V9 L15.2 12 Z" />
    </svg>
  );
}

export function IconTiktok({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.8 3 c.3 1.9 1.5 3.3 3.5 3.6 v3 c-1.4 0-2.6-.4-3.6-1.1 v6.2 c0 3.5-2.4 5.8-5.6 5.8 -3 0-5.4-2.2-5.4-5.2 0-3 2.3-5.2 5.4-5.2 .3 0 .7 0 1 .1 v3.1 c-.3-.1-.6-.2-1-.2 -1.4 0-2.4 1-2.4 2.3 0 1.3 1 2.2 2.4 2.2 1.6 0 2.6-1.1 2.6-3 V3 Z" />
    </svg>
  );
}

// ─── Logo Nha Khoa Smile ───────────────────────────────────────
// Chiếc răng trong khung bo tròn + nét cười, dùng cho header/footer
export function LogoTooth({ size = 44, color = '#c9a24b', bg = 'transparent', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      {bg !== 'transparent' && <rect x="0" y="0" width="48" height="48" rx="12" fill={bg} />}
      <path
        d="M16 8 C10 8 7 14 8.2 20 C9.6 27 12.6 36 14.2 40.5 C15 42.8 18.2 42.8 18.8 40.3 C19.6 36.2 20.2 30 24 30 C27.8 30 28.4 36.2 29.2 40.3 C29.8 42.8 33 42.8 33.8 40.5 C35.4 36 38.4 27 39.8 20 C41 14 38 8 32 8 C28 8 27 10.2 24 10.2 C21 10.2 20 8 16 8 Z"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 17.5 C20 20.5 28 20.5 30 17.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Đường trang trí dưới tiêu đề section
export function SectionOrnament({ color = '#c9a24b' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12 }}>
      <span style={{ width: 44, height: 2, backgroundColor: color, opacity: 0.6, borderRadius: 999 }} />
      <span style={{ width: 7, height: 7, backgroundColor: color, transform: 'rotate(45deg)' }} />
      <span style={{ width: 44, height: 2, backgroundColor: color, opacity: 0.6, borderRadius: 999 }} />
    </div>
  );
}

// ─── Bộ icon bất động sản (PRIME REALTY) ───────────────────────

// Logo: cụm 3 tòa nhà cao tầng
export function LogoBuilding({ size = 46, color = '#c9a24b', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M6 42 V18 L15 13 V42 Z" stroke={color} strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M15 42 V8 L27 14 V42 Z" stroke={color} strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M27 42 V20 L38 25 V42 Z" stroke={color} strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M4 42 H44" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M9.5 22 V24 M9.5 28 V30 M9.5 34 V36 M20 17 V19 M20 23 V25 M20 29 V31 M20 35 V37 M32 29 V31 M32 35 V37" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconBuildings({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3 21 V9 L9.5 6 V21" />
      <path d="M9.5 21 V4 L17 7.5 V21" />
      <path d="M2 21 H22" />
      <path d="M6 11 V12.5 M6 15 V16.5 M13 10 V11.5 M13 14 V15.5" />
    </svg>
  );
}

export function IconApartment({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M4 21 H20" />
      <path d="M9 6.5 H10.5 M13.5 6.5 H15 M9 10 H10.5 M13.5 10 H15 M9 13.5 H10.5 M13.5 13.5 H15 M10.5 21 V17.5 H13.5 V21" />
    </svg>
  );
}

export function IconHouse({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3.5 11 L12 4 L20.5 11" />
      <path d="M5.5 9.5 V20 H18.5 V9.5" />
      <path d="M10 20 V14 H14 V20" />
    </svg>
  );
}

export function IconTownhouse({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3 21 V8 L8 4.5 L13 8 V21" />
      <path d="M13 21 V10 L18 6.5 L21 8.7 V21" />
      <path d="M2 21 H22" />
      <path d="M6 12 H10 M6 15.5 H10 M6.5 21 V18 H9.5 V21" />
    </svg>
  );
}

export function IconLand({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3 20 L8 6 H16 L21 20 Z" strokeDasharray="0.1 3.4" />
      <path d="M3 20 L8 6 H16 L21 20 Z" />
      <path d="M9.5 20 L11 11 H13 L14.5 20" />
    </svg>
  );
}

export function IconResort({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M2 21 H22" />
      <path d="M5 21 V13 H11 V21" />
      <path d="M5 13 L8 10 L11 13" />
      <path d="M13 21 V8 L17 5 L20 7 V21" />
      <path d="M7 16 V18 M15.5 11 V13 M15.5 16 V18" />
    </svg>
  );
}

export function IconBed({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3 18 V8 M3 12 H21 V18 M21 18 V13" />
      <path d="M3 12 V10 C3 9 3.6 8.5 4.5 8.5 H9 C9.8 8.5 10.5 9 10.5 10 V12" />
      <path d="M3 19 V18 M21 19 V18" />
    </svg>
  );
}

export function IconBath({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4 12 V6.5 C4 5.7 4.7 5 5.5 5 C6.3 5 7 5.7 7 6.5 V7" />
      <path d="M6 7 H8.5" />
      <path d="M3 12 H21 V14 C21 16 19.5 17.5 17.5 17.5 H6.5 C4.5 17.5 3 16 3 14 Z" />
      <path d="M6.5 17.5 L5.5 19.5 M17.5 17.5 L18.5 19.5" />
    </svg>
  );
}

export function IconArea({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 9 L9 4 M4 15 L15 4 M9 20 L20 9 M15 20 L20 15" strokeWidth="1.1" opacity="0.6" />
    </svg>
  );
}

export function IconHeart({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 20 C7 16.2 4 13.5 4 10.2 C4 7.8 5.9 6 8.2 6 C9.7 6 11.1 6.8 12 8 C12.9 6.8 14.3 6 15.8 6 C18.1 6 20 7.8 20 10.2 C20 13.5 17 16.2 12 20 Z" />
    </svg>
  );
}

export function IconChevronDown({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M6 9 L12 15 L18 9" />
    </svg>
  );
}

export function IconSearch({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L20.5 20.5" />
    </svg>
  );
}

export function IconHandHeart({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M2 14 L5 12.5 L10 15 C11 15.5 12 15.3 13 15 L17.5 13.5 C18.5 13.2 19 14.4 18.2 15 L12.5 19 C11.5 19.7 10.2 19.8 9.1 19.3 L2 16" />
      <path d="M2 12.5 V19" />
      <path d="M13 10.5 C15 8.7 16.5 8 17.5 8.6 C18.6 9.3 18.4 10.8 17 12" />
      <path d="M13 10.5 C11 8.7 9.5 8 8.5 8.6 C7.4 9.3 7.6 10.8 9 12 L13 10.5 Z" opacity="0" />
      <path d="M13.2 10.6 C11.4 9 10 8.5 9.1 9.1 C8.2 9.7 8.4 11 9.6 12" />
    </svg>
  );
}

export function IconShieldCheck2({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 3 L19.5 5.8 V11 C19.5 15.8 16.4 19.6 12 21 C7.6 19.6 4.5 15.8 4.5 11 V5.8 Z" />
      <polyline points="9 11.5 11.2 13.7 15.2 9.7" />
    </svg>
  );
}

export function IconTag({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4 4 H11 L20 13 C20.6 13.6 20.6 14.6 20 15.2 L15.2 20 C14.6 20.6 13.6 20.6 13 20 L4 11 Z" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBriefcase({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8.5 7.5 V6 C8.5 5 9 4.5 10 4.5 H14 C15 4.5 15.5 5 15.5 6 V7.5" />
      <path d="M3 12.5 H21 M11 12 V14" />
    </svg>
  );
}

export function IconUsersGroup({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="9" cy="8.5" r="3.1" />
      <path d="M3.4 19.5 C3.4 16.3 5.9 14.6 9 14.6 C12.1 14.6 14.6 16.3 14.6 19.5" />
      <circle cx="16.7" cy="9.2" r="2.4" />
      <path d="M16.6 14.3 C19.1 14.5 20.8 16 20.8 18.5" />
    </svg>
  );
}

export function IconRoute({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8 17 H14 C16 17 16.5 15 14.5 14 L9.5 11.5 C7.5 10.5 8 8.5 10 8.5 H16" />
    </svg>
  );
}

export function IconHeadset2({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4.5 13.5 V11.5 C4.5 7.4 7.9 4 12 4 C16.1 4 19.5 7.4 19.5 11.5 V13.5" />
      <rect x="3" y="12.5" width="4" height="6" rx="1.8" />
      <rect x="17" y="12.5" width="4" height="6" rx="1.8" />
      <path d="M19 18.5 C19 20 17.5 21 15.5 21 H13" />
    </svg>
  );
}

export function IconPinterest({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3 C7 3 4.2 6.3 4.2 9.9 C4.2 11.6 5.1 13.7 6.5 14.4 C6.9 14.6 7.1 14.5 7.2 14.1 L7.6 12.6 C7.6 12.5 7.6 12.3 7.5 12.2 C6.9 11.5 6.5 10.3 6.5 9.2 C6.5 6.4 8.6 3.7 12.3 3.7 C15.4 3.7 17.6 5.8 17.6 8.9 C17.6 12.4 15.9 14.8 13.6 14.8 C12.4 14.8 11.5 13.8 11.8 12.5 L12.5 9.9 C12.7 9.1 12.5 8.4 11.7 8.4 C10.7 8.4 10 9.5 10 10.9 C10 11.8 10.3 12.4 10.3 12.4 L9 17.4 C8.7 18.8 9 20.7 9 20.9 C9.1 21.1 9.3 21.1 9.4 21 C9.6 20.8 11 18.9 11.4 17.5 L12 15.4 C12.4 16.1 13.5 16.7 14.6 16.7 C17.9 16.7 20.2 13.7 20.2 9.8 C20.2 6 17 3 12 3 Z" />
    </svg>
  );
}
