// Script seed dữ liệu demo Prime Realty (bất động sản) cho MySQL dev.
// Chạy: node scripts/seed-dev.mjs  (từ thư mục gốc template)
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const DB_NAME = process.env.MYSQL_DATABASE || 'prime_realty';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST || '162.62.54.247',
  port: parseInt(process.env.MYSQL_PORT || '31760'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'bJ0g168FRq24iuhn3wL7eQyNjU5pG9Ac',
  charset: 'utf8mb4',
  multipleStatements: false,
});

await conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
await conn.changeUser({ database: DB_NAME });

function tr(sql) {
  return sql
    .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'INT AUTO_INCREMENT PRIMARY KEY')
    .replace(/datetime\('now'\)/gi, 'NOW()')
    .replace(/LONGTEXT NOT NULL/gi, 'LONGTEXT')
    .replace(/INSERT OR IGNORE/gi, 'INSERT IGNORE')
    .replace(/INSERT OR REPLACE/gi, 'REPLACE');
}
const q = async (sql, params = []) => { const [rows] = await conn.query(tr(sql), params); return rows; };

const tables = [
  `CREATE TABLE IF NOT EXISTS signups (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255) NOT NULL UNIQUE, created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS contact_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, phone VARCHAR(100), email VARCHAR(255), subject VARCHAR(255), message TEXT NOT NULL, status VARCHAR(50) NOT NULL DEFAULT 'new', created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS settings (\`key\` VARCHAR(255) NOT NULL PRIMARY KEY, \`value\` TEXT)`,
  `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255) NOT NULL UNIQUE, password TEXT NOT NULL, display_name TEXT, email TEXT, phone VARCHAR(100), address TEXT, role VARCHAR(50) NOT NULL DEFAULT 'member', tier VARCHAR(50) NOT NULL DEFAULT 'Free', active INTEGER NOT NULL DEFAULT 1, created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug VARCHAR(255) NOT NULL UNIQUE, title TEXT NOT NULL, summary TEXT, content TEXT, image TEXT, author_id INTEGER, author_name TEXT, status VARCHAR(50) NOT NULL DEFAULT 'draft', views INTEGER DEFAULT 0, meta_title TEXT, meta_description TEXT, meta_keywords TEXT, created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')), updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, slug VARCHAR(255) NOT NULL UNIQUE, title TEXT NOT NULL, description TEXT, layout TEXT, status VARCHAR(50) NOT NULL DEFAULT 'published', meta_title TEXT, meta_description TEXT, meta_keywords TEXT, created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')), updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS api_keys (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, api_key VARCHAR(255) NOT NULL UNIQUE, user_id INTEGER NOT NULL, created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS file_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug VARCHAR(255) NOT NULL UNIQUE, created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(500) NOT NULL, file_type VARCHAR(50), url LONGTEXT NOT NULL, file_size VARCHAR(50), folder VARCHAR(200) DEFAULT 'general', uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')), uploaded_by INT, description TEXT, is_public INT DEFAULT 1, downloads INT DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS post_attachments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INT, name VARCHAR(500) NOT NULL, original_name VARCHAR(500), file_type VARCHAR(100), file_size BIGINT DEFAULT 0, file_size_label VARCHAR(50), url LONGTEXT NOT NULL, uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')), uploaded_by INT, downloads INT DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS download_tokens (token VARCHAR(200) PRIMARY KEY, use_count INT DEFAULT 0, expires_at BIGINT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS installed_plugins (id VARCHAR(191) PRIMARY KEY, name TEXT NOT NULL, version TEXT, config TEXT, active INTEGER NOT NULL DEFAULT 1, installed_at DATETIME DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS shop_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL UNIQUE, parent_id INTEGER, icon VARCHAR(100), image TEXT, description TEXT, is_active INTEGER DEFAULT 1, sort_order INTEGER DEFAULT 0, created_at VARCHAR(100) DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL UNIQUE, short_description TEXT, description TEXT, price REAL NOT NULL DEFAULT 0, original_price REAL, thumbnail TEXT, images TEXT, brand VARCHAR(255), origin VARCHAR(255), unit VARCHAR(100) DEFAULT 'm²', stock INTEGER DEFAULT 0, sold_count INTEGER DEFAULT 0, view_count INTEGER DEFAULT 0, rating REAL DEFAULT 0, status VARCHAR(50) DEFAULT 'active', is_featured INTEGER DEFAULT 0, is_flash_sale INTEGER DEFAULT 0, flash_sale_price REAL, flash_sale_end VARCHAR(100), tags TEXT, meta_title TEXT, meta_description TEXT, created_at VARCHAR(100) DEFAULT (datetime('now')), updated_at VARCHAR(100) DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS product_variants (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, name VARCHAR(255) NOT NULL, price REAL NOT NULL, stock INTEGER DEFAULT 0, sort_order INTEGER DEFAULT 0, created_at VARCHAR(100) DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS product_reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, order_id INTEGER, reviewer_name VARCHAR(255) NOT NULL, reviewer_id INTEGER, rating INTEGER NOT NULL DEFAULT 5, comment TEXT, is_verified INTEGER DEFAULT 0, created_at VARCHAR(100) DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, order_code VARCHAR(100) NOT NULL UNIQUE, user_id INTEGER, customer_name VARCHAR(255) NOT NULL, customer_phone VARCHAR(100) NOT NULL, customer_email VARCHAR(255), shipping_address TEXT NOT NULL, shipping_province VARCHAR(255), shipping_note TEXT, items TEXT NOT NULL, subtotal REAL NOT NULL DEFAULT 0, discount_amount REAL DEFAULT 0, shipping_fee REAL DEFAULT 0, total REAL NOT NULL DEFAULT 0, coupon_code VARCHAR(100), payment_method VARCHAR(50) DEFAULT 'cod', payment_status VARCHAR(50) DEFAULT 'pending', status VARCHAR(50) DEFAULT 'pending', admin_note TEXT, created_at VARCHAR(100) DEFAULT (datetime('now')), updated_at VARCHAR(100) DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS coupons (id INTEGER PRIMARY KEY AUTOINCREMENT, code VARCHAR(100) NOT NULL UNIQUE, discount_type VARCHAR(50) NOT NULL DEFAULT 'percent', discount_value REAL NOT NULL, min_order REAL DEFAULT 0, max_discount REAL, usage_limit INTEGER, usage_count INTEGER DEFAULT 0, expires_at VARCHAR(100), is_active INTEGER DEFAULT 1, created_at VARCHAR(100) DEFAULT (datetime('now')))`,
];
for (const ddl of tables) await q(ddl);
console.log('✅ Tables ready');

const settings = [
  ['site_title', 'Prime Realty - Nơi tìm kiếm tổ ấm | Mua bán & Cho thuê Bất động sản'],
  ['site_description', 'Prime Realty - Đối tác tin cậy trên hành trình tìm kiếm tổ ấm và đầu tư bất động sản. Hơn 10.000+ căn hộ, nhà phố, biệt thự, đất nền chính chủ.'],
  ['site_keywords', 'prime realty, mua bán nhà đất, bất động sản, căn hộ chung cư, nhà phố, biệt thự, đất nền, cho thuê nhà'],
  ['header_logo_text', 'Prime Realty'],
  ['header_logo_icon', '🏢'],
  ['header_links', JSON.stringify([
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Mua bán', href: '/products' },
    { label: 'Dự án', href: '/destinations' },
    { label: 'Tin tức', href: '/blog' },
    { label: 'Liên hệ', href: '/contact' },
  ])],
  ['footer_copyright', '© 2024 Prime Realty. All rights reserved.'],
  ['social_facebook', 'https://facebook.com/nhadatprime'],
  ['social_zalo', 'https://zalo.me/0909123456'],
  ['social_youtube', ''],
  ['social_tiktok', ''],
  ['social_instagram', ''],
  ['social_x', ''],
  ['social_telegram', ''],
  ['social_discord', ''],
  ['social_linkedin', ''],
];
for (const [key, val] of settings) await q('REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
console.log('✅ Settings seeded');

const adminPw = bcrypt.hashSync('admin123', 10);
const modPw = bcrypt.hashSync('mod123', 10);
await q("INSERT IGNORE INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, 'Administrator', 'admin@nhadatprime.vn', 'admin', 'Enterprise', 1)", ['admin', adminPw]);
await q("INSERT IGNORE INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, 'Staff Moderator', 'mod@nhadatprime.vn', 'mod', 'Pro', 1)", ['moderator', modPw]);
console.log('✅ Users seeded (admin/admin123)');

const aboutLayout = [
  { id: 'b_about_hero', type: 'hero', visible: true, configs: {
    title: 'Sứ mệnh Prime Realty',
    description: 'Kết nối khách hàng với những bất động sản chất lượng, pháp lý minh bạch và mức giá tốt nhất thị trường.',
    buttonText: 'Xem bất động sản', buttonLink: '/products',
  }},
  { id: 'b_about_feat', type: 'features', visible: true, configs: {
    tag: 'GIÁ TRỊ CỐT LÕI',
    title: 'Cam kết đồng hành cùng bạn',
    description: 'Hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản.',
    items: [
      { title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Chuyên viên tư vấn giàu kinh nghiệm, am hiểu thị trường và tận tâm.' },
      { title: 'Pháp Lý An Toàn', desc: 'Mọi bất động sản đều được kiểm duyệt kỹ lưỡng, minh bạch.' },
      { title: 'Giá Tốt Nhất', desc: 'Cam kết mức giá cạnh tranh, hỗ trợ đàm phán tối ưu cho khách hàng.' },
    ],
  }},
];
await q('DELETE FROM pages WHERE slug = ?', ['about']);
await q("INSERT INTO pages (slug, title, description, layout, status) VALUES ('about', 'Giới thiệu về chúng tôi', ?, ?, 'published')",
  ['Prime Realty - Đối tác tin cậy trên hành trình tìm kiếm tổ ấm và đầu tư bất động sản.', JSON.stringify(aboutLayout)]);
console.log('✅ About page seeded');

for (const c of [
  { name: 'Chưa phân loại', slug: 'general' },
  { name: 'Ảnh bất động sản', slug: 'images' },
  { name: 'Hồ sơ pháp lý', slug: 'documents' },
  { name: 'Khác', slug: 'other' },
]) await q('INSERT IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);

await q('DELETE FROM product_variants');
await q('DELETE FROM products');
await q('DELETE FROM shop_categories');

const cats = [
  { name: 'Căn hộ chung cư', slug: 'can-ho', icon: '🏢', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80', sort: 1 },
  { name: 'Nhà phố', slug: 'nha-pho', icon: '🏘️', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', sort: 2 },
  { name: 'Biệt thự', slug: 'biet-thu', icon: '🏡', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', sort: 3 },
  { name: 'Đất nền', slug: 'dat-nen', icon: '🗺️', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', sort: 4 },
  { name: 'Văn phòng', slug: 'van-phong', icon: '💼', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', sort: 5 },
];
const catIds = {};
for (const c of cats) {
  const r = await q('INSERT INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)', [c.name, c.slug, c.icon, c.image, c.sort]);
  catIds[c.slug] = r.insertId;
}
console.log('✅ Property categories seeded');

const items = [
  { cat: 'can-ho', name: 'Căn hộ Vinhomes Central Park', slug: 'can-ho-vinhomes-central-park',
    short: 'Căn hộ 2PN view sông Sài Gòn, nội thất cao cấp, sổ hồng lâu dài',
    desc: 'Căn hộ 2 phòng ngủ tại tòa Landmark, Vinhomes Central Park với tầm nhìn trực diện sông Sài Gòn và công viên 14ha. Bàn giao nội thất cao cấp, sổ hồng lâu dài. Cư dân được hưởng trọn hệ tiện ích: hồ bơi, gym, Vinschool, Vinmec, trung tâm thương mại Landmark 81. Vị trí kết nối trung tâm Quận 1 chỉ 10 phút.',
    price: 2900000000, original: 3500000000, unit: '68 m²', origin: 'Bình Thạnh, TP. HCM',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', brand: 'Căn hộ', featured: 1, flash: 1 },
  { cat: 'nha-pho', name: 'Nhà phố KDT Sala', slug: 'nha-pho-kdt-sala',
    short: 'Nhà phố 1 trệt 3 lầu, khu compound an ninh, gần trường quốc tế',
    desc: 'Nhà phố thiết kế 1 trệt 3 lầu trong khu đô thị Sala đẳng cấp, an ninh 24/7. Thiết kế hiện đại, thang máy, sân để xe rộng. Vị trí trung tâm Thủ Thiêm, kết nối Quận 1 qua hầm Thủ Thiêm chỉ 5 phút, gần trường quốc tế và bệnh viện. Pháp lý sổ hồng hoàn công đầy đủ.',
    price: 16500000000, original: 18000000000, unit: '100 m²', origin: 'Quận 2, TP. Thủ Đức',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', brand: 'Nhà phố', featured: 1, flash: 0 },
  { cat: 'biet-thu', name: 'Biệt thự Lakeview City', slug: 'biet-thu-lakeview-city',
    short: 'Biệt thự đơn lập ven hồ, sân vườn rộng, thiết kế hiện đại',
    desc: 'Biệt thự đơn lập ven hồ trong khu Lakeview City, sân vườn rộng rãi, thiết kế hiện đại tối giản. Không gian sống xanh, yên tĩnh nhưng vẫn kết nối thuận tiện. Nhà xây thô hoàn thiện mặt ngoài, khách hàng tự hoàn thiện nội thất theo ý thích. Sổ hồng riêng từng căn.',
    price: 28000000000, original: 32000000000, unit: '200 m²', origin: 'Quận 2, TP. Thủ Đức',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', brand: 'Biệt thự', featured: 1, flash: 1 },
  { cat: 'dat-nen', name: 'Đất nền Long Thành', slug: 'dat-nen-long-thanh',
    short: 'Đất nền sổ đỏ riêng, gần sân bay Long Thành, hạ tầng hoàn thiện',
    desc: 'Đất nền thổ cư 100% sổ đỏ riêng từng nền, vị trí gần sân bay quốc tế Long Thành và cao tốc TP.HCM - Long Thành - Dầu Giây. Hạ tầng nội khu hoàn thiện: đường nhựa, điện âm, cấp thoát nước. Tiềm năng tăng giá lớn khi sân bay đi vào hoạt động. Phù hợp đầu tư trung - dài hạn.',
    price: 1800000000, original: 2200000000, unit: '100 m²', origin: 'Long Thành, Đồng Nai',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', brand: 'Đất nền', featured: 1, flash: 0 },
  { cat: 'can-ho', name: 'Căn hộ Masteri Thảo Điền', slug: 'can-ho-masteri-thao-dien',
    short: 'Studio full nội thất, ngay ga Metro, tiện ích 5 sao',
    desc: 'Căn hộ studio full nội thất cao cấp tại Masteri Thảo Điền, kết nối trực tiếp ga Metro số 1 và TTTM Vincom Mega Mall. Tiện ích 5 sao: hồ bơi tràn, gym, khu BBQ. Phù hợp ở hoặc cho thuê với dòng tiền ổn định. Bàn giao ngay, pháp lý sổ hồng.',
    price: 4200000000, original: 4800000000, unit: '55 m²', origin: 'Quận 2, TP. Thủ Đức',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', brand: 'Căn hộ', featured: 1, flash: 1 },
  { cat: 'nha-pho', name: 'Shophouse Aqua City', slug: 'shophouse-aqua-city',
    short: 'Shophouse mặt tiền sông, vừa ở vừa kinh doanh, pháp lý sổ hồng',
    desc: 'Shophouse mặt tiền đường lớn trong khu đô thị sinh thái Aqua City, vừa ở vừa kinh doanh. Vị trí thương mại đắc địa, lưu lượng cư dân đông. Thiết kế 1 trệt 2 lầu, mặt tiền rộng thuận lợi buôn bán. Hưởng trọn tiện ích khu đô thị và cảnh quan ven sông Đồng Nai. Sổ hồng lâu dài.',
    price: 10500000000, original: 12000000000, unit: '120 m²', origin: 'Biên Hòa, Đồng Nai',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', brand: 'Nhà phố', featured: 1, flash: 0 },
  { cat: 'van-phong', name: 'Văn phòng cho thuê Quận 1', slug: 'van-phong-cho-thue-quan-1',
    short: 'Sàn văn phòng hạng A, view trung tâm, cho thuê dài hạn',
    desc: 'Sàn văn phòng hạng A tại tòa nhà trung tâm Quận 1, view thành phố, trần cao, kính khung nhôm cách âm. Đã có hệ thống điều hòa trung tâm, PCCC đạt chuẩn, thang máy tốc độ cao. Chỗ đậu ô tô, lễ tân chuyên nghiệp. Cho thuê dài hạn, phù hợp doanh nghiệp vừa và lớn.',
    price: 350000000, original: null, unit: '150 m²', origin: 'Quận 1, TP. HCM',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', brand: 'Văn phòng', featured: 0, flash: 0, type: 'thue' },
  { cat: 'can-ho', name: 'Cho thuê căn hộ The Sun Avenue', slug: 'cho-thue-can-ho-the-sun-avenue',
    short: 'Căn hộ 2PN full nội thất, cho thuê 18 triệu/tháng',
    desc: 'Căn hộ 2 phòng ngủ đầy đủ nội thất cao cấp tại The Sun Avenue, mặt tiền Mai Chí Thọ. View sông thoáng, tiện ích nội khu đầy đủ. Cho thuê dài hạn 18 triệu/tháng, dọn vào ở ngay, phù hợp gia đình và chuyên gia nước ngoài.',
    price: 216000000, original: null, unit: '75 m²', origin: 'Quận 2, TP. Thủ Đức',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', brand: 'Căn hộ', featured: 0, flash: 0, type: 'thue' },
];
for (const s of items) {
  const r = await q(
    `INSERT INTO products (category_id, name, slug, short_description, description, price, original_price, thumbnail, brand, origin, unit, stock, sold_count, rating, is_featured, is_flash_sale, flash_sale_price, tags, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 20, 0, 5, ?, ?, ?, ?, 'active')`,
    [catIds[s.cat], s.name, s.slug, s.short, s.desc, s.price, s.original, s.image, s.brand, s.origin, s.unit, s.featured, s.flash, s.flash ? s.price : null, s.type || 'ban']
  );
  await q('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, 20)', [r.insertId, s.unit, s.price]);
}
console.log('✅ Properties seeded');

await q('DELETE FROM posts');
const posts = [
  { title: 'Thị trường bất động sản 2024: Cơ hội và thách thức', slug: 'thi-truong-bat-dong-san-2024',
    summary: 'Năm 2024 được dự báo là thời điểm bản lề của thị trường bất động sản Việt Nam với nhiều tín hiệu phục hồi tích cực sau giai đoạn trầm lắng.',
    content: 'Thị trường bất động sản 2024 ghi nhận nhiều chuyển biến tích cực: lãi suất cho vay giảm về vùng hấp dẫn, các luật Đất đai - Nhà ở - Kinh doanh BĐS sửa đổi có hiệu lực giúp minh bạch pháp lý, dòng vốn đầu tư công vào hạ tầng được đẩy mạnh. Phân khúc căn hộ vừa túi tiền và đất nền vùng ven quanh các dự án hạ tầng lớn tiếp tục thu hút nhà đầu tư. Tuy vậy, thanh khoản phân hóa mạnh - sản phẩm pháp lý rõ ràng, giá hợp lý mới dễ giao dịch.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80' },
  { title: 'Lãi suất ngân hàng giảm: Cơ hội vàng cho người mua nhà', slug: 'lai-suat-ngan-hang-giam',
    summary: 'Mặt bằng lãi suất cho vay mua nhà đã giảm về mức thấp nhất nhiều năm, mở ra cơ hội sở hữu nhà cho người có nhu cầu ở thực.',
    content: 'Hiện nhiều ngân hàng áp dụng lãi suất vay mua nhà ưu đãi chỉ từ 6-8%/năm trong 1-2 năm đầu, kèm chính sách ân hạn nợ gốc. Với người mua ở thực, đây là thời điểm thuận lợi để cân nhắc: nên chọn khoản vay không quá 40-50% giá trị tài sản, ưu tiên lãi suất minh bạch theo lãi suất tham chiếu. Nên tính toán dòng tiền trả nợ hàng tháng không vượt quá 40% thu nhập để đảm bảo an toàn tài chính.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
  { title: 'Đầu tư bất động sản vùng ven: Xu hướng mới của giới đầu tư', slug: 'dau-tu-bat-dong-san-vung-ven',
    summary: 'Khi giá nhà đất trung tâm neo cao, dòng tiền đầu tư đang dịch chuyển mạnh về các khu vực vùng ven có hạ tầng phát triển.',
    content: 'Bất động sản vùng ven các đô thị lớn như Đồng Nai, Bình Dương, Long An, Hưng Yên đang hưởng lợi lớn từ làn sóng đầu tư hạ tầng. Ưu điểm là giá còn mềm, dư địa tăng giá lớn khi hạ tầng hoàn thiện. Tuy nhiên nhà đầu tư cần lưu ý: chọn khu vực có quy hoạch rõ ràng, pháp lý sổ đỏ riêng, kết nối giao thông thực tế, và xác định tầm nhìn đầu tư trung - dài hạn 3-5 năm để đạt hiệu quả tối ưu.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' },
  { title: '5 lưu ý quan trọng khi mua nhà lần đầu', slug: '5-luu-y-khi-mua-nha-lan-dau',
    summary: 'Mua nhà lần đầu là quyết định tài chính lớn. Nắm vững 5 lưu ý sau giúp bạn tránh rủi ro và chọn được ngôi nhà ưng ý.',
    content: '1) Xác định rõ ngân sách và khả năng vay - không nên vay quá 50% giá trị nhà; 2) Kiểm tra pháp lý kỹ càng: sổ hồng/sổ đỏ, quy hoạch, tranh chấp; 3) Khảo sát thực tế vị trí, hạ tầng, an ninh, ngập nước; 4) Đánh giá uy tín chủ đầu tư/người bán và tiến độ (với dự án hình thành trong tương lai); 5) Đọc kỹ hợp đồng, đặc biệt các điều khoản thanh toán, bàn giao và phạt vi phạm. Nên có chuyên viên tư vấn đồng hành để đảm bảo giao dịch an toàn.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
];
for (const p of posts) {
  await q("INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, 'Prime Realty', 'published')",
    [p.slug, p.title, p.summary, p.content, p.image]);
}
console.log('✅ Posts seeded');

await q('DELETE FROM coupons');
await q("INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES ('PRIME2024', 'fixed', 20000000, 2000000000, 20000000, 100, 1)");
console.log('✅ Coupon PRIME2024 seeded');

const prods = await q('SELECT name, price FROM products ORDER BY id');
console.log('\n📋 Properties in DB:');
prods.forEach((p) => console.log(`  - ${p.name}: ${Number(p.price).toLocaleString('vi-VN')}đ`));

await conn.end();
console.log('\n🎉 Seed hoàn tất! Database:', DB_NAME);
