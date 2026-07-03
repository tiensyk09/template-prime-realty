import { query } from './db';
import { hashPassword } from './auth';

export async function initDatabase() {
  // Signups table
  await query(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Contact messages table (tin nhắn từ trang Liên hệ)
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      email VARCHAR(255),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
      \`value\` TEXT
    )
  `);

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      display_name TEXT,
      email TEXT,
      phone VARCHAR(100),
      address TEXT,
      role VARCHAR(50) NOT NULL DEFAULT 'member',
      tier VARCHAR(50) NOT NULL DEFAULT 'Free',
      active INTEGER NOT NULL DEFAULT 1,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  try {
    await query('ALTER TABLE users ADD COLUMN phone VARCHAR(100)');
  } catch (err) {}

  try {
    await query('ALTER TABLE users ADD COLUMN address TEXT');
  } catch (err) {}

  try {
    await query("ALTER TABLE users ADD COLUMN tier VARCHAR(50) NOT NULL DEFAULT 'Free'");
  } catch (err) {}

  // Alter products table columns if missing
  const productsColumns = [
    { name: 'original_price', type: 'REAL' },
    { name: 'images', type: 'TEXT' },
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'origin', type: 'VARCHAR(255)' },
    { name: 'unit', type: "VARCHAR(100) DEFAULT 'Hộp'" },
    { name: 'sold_count', type: 'INTEGER DEFAULT 0' },
    { name: 'view_count', type: 'INTEGER DEFAULT 0' },
    { name: 'rating', type: 'REAL DEFAULT 0' },
    { name: 'is_featured', type: 'INTEGER DEFAULT 0' },
    { name: 'is_flash_sale', type: 'INTEGER DEFAULT 0' },
    { name: 'flash_sale_price', type: 'REAL' },
    { name: 'flash_sale_end', type: 'VARCHAR(100)' },
    { name: 'tags', type: 'TEXT' },
    { name: 'meta_title', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' }
  ];

  for (const col of productsColumns) {
    try {
      await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      // Column might already exist
    }
  }

  // Posts/Changelog table
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT,
      content TEXT,
      image TEXT,
      author_id INTEGER,
      author_name TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      views INTEGER DEFAULT 0,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Pages table
  await query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      layout TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // API Keys table
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_key VARCHAR(255) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // File Categories table
  await query(`
    CREATE TABLE IF NOT EXISTS file_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Files table
  await query(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(500) NOT NULL,
      file_type VARCHAR(50),
      url LONGTEXT NOT NULL,
      file_size VARCHAR(50),
      folder VARCHAR(200) DEFAULT 'general',
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      description TEXT,
      is_public INT DEFAULT 1,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Post Attachments table
  await query(`
    CREATE TABLE IF NOT EXISTS post_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INT,
      name VARCHAR(500) NOT NULL,
      original_name VARCHAR(500),
      file_type VARCHAR(100),
      file_size BIGINT DEFAULT 0,
      file_size_label VARCHAR(50),
      url LONGTEXT NOT NULL,
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Download tokens tracking table
  await query(`
    CREATE TABLE IF NOT EXISTS download_tokens (
      token VARCHAR(200) PRIMARY KEY,
      use_count INT DEFAULT 0,
      expires_at BIGINT NOT NULL
    )
  `);

  // Installed Plugins table — lưu plugin đã cài và config trong DB của website
  await query(`
    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      config TEXT DEFAULT '{}',
      active INTEGER NOT NULL DEFAULT 1,
      installed_at DATETIME DEFAULT (datetime('now'))
    )
  `);


  // ─── E-COMMERCE TABLES ───────────────────────────────────────

  // Shop Categories (danh mục sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS shop_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      parent_id INTEGER,
      icon VARCHAR(100),
      image TEXT,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Products (sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      short_description TEXT,
      description TEXT,
      price REAL NOT NULL DEFAULT 0,
      original_price REAL,
      thumbnail TEXT,
      images TEXT,
      brand VARCHAR(255),
      origin VARCHAR(255),
      unit VARCHAR(100) DEFAULT 'Hộp',
      stock INTEGER DEFAULT 0,
      sold_count INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      is_featured INTEGER DEFAULT 0,
      is_flash_sale INTEGER DEFAULT 0,
      flash_sale_price REAL,
      flash_sale_end VARCHAR(100),
      tags TEXT,
      meta_title TEXT,
      meta_description TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
    )
  `);

  // Product Variants (biến thể sản phẩm: Hộp, Vỉ, Chai...)
  await query(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product Reviews (đánh giá)
  await query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      order_id INTEGER,
      reviewer_name VARCHAR(255) NOT NULL,
      reviewer_id INTEGER,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT,
      is_verified INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Orders (đơn hàng)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_code VARCHAR(100) NOT NULL UNIQUE,
      user_id INTEGER,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(100) NOT NULL,
      customer_email VARCHAR(255),
      shipping_address TEXT NOT NULL,
      shipping_province VARCHAR(255),
      shipping_note TEXT,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      shipping_fee REAL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      coupon_code VARCHAR(100),
      payment_method VARCHAR(50) DEFAULT 'cod',
      payment_status VARCHAR(50) DEFAULT 'pending',
      status VARCHAR(50) DEFAULT 'pending',
      admin_note TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Coupons (mã giảm giá)
  await query(`
    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code VARCHAR(100) NOT NULL UNIQUE,
      discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
      discount_value REAL NOT NULL,
      min_order REAL DEFAULT 0,
      max_discount REAL,
      usage_limit INTEGER,
      usage_count INTEGER DEFAULT 0,
      expires_at VARCHAR(100),
      is_active INTEGER DEFAULT 1,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Alter tables to add SEO columns dynamically if they do not exist
  const addColumns = [
    { table: 'pages', column: 'meta_title', type: 'TEXT' },
    { table: 'pages', column: 'meta_description', type: 'TEXT' },
    { table: 'pages', column: 'meta_keywords', type: 'TEXT' },
    { table: 'posts', column: 'meta_title', type: 'TEXT' },
    { table: 'posts', column: 'meta_description', type: 'TEXT' },
    { table: 'posts', column: 'meta_keywords', type: 'TEXT' }
  ];

  for (const item of addColumns) {
    try {
      await query(`ALTER TABLE ${item.table} ADD COLUMN ${item.column} ${item.type}`);
      console.log(`Added column ${item.column} to table ${item.table}`);
    } catch (err) {
      // Column already exists or error
    }
  }

  console.log('✅ Database tables created and migrated');
}


export async function seedData(adminPassword, force = false) {
  const passwordToSeed = adminPassword || 'admin123';
  
  // Check if we should force override because the database was previously seeded with data of another template
  let isOtherTemplate = false;
  try {
    const existingLogo = await query('SELECT `value` FROM settings WHERE `key` = ?', ['header_logo_text']);
    const oldLogos = ['Command Code', 'FPT Long Châu', 'Sâm Ngọc Linh', 'Nha Khoa Smile', 'ARCHI'];
    if (existingLogo.length > 0 && oldLogos.includes(existingLogo[0].value)) {
      isOtherTemplate = true;
    }
  } catch (e) {
    // Table or settings might not exist yet
  }

  const shouldForce = force || isOtherTemplate;

  // Seed Settings
  const defaultSettings = [
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
      { label: 'Liên hệ', href: '/contact' }
    ])],
    ['footer_copyright', '© 2024 Prime Realty. All rights reserved.'],
    // Liên hệ mạng xã hội (để trống = ẩn icon tương ứng)
    ['social_facebook', 'https://facebook.com/nhadatprime'],
    ['social_zalo', 'https://zalo.me/0909123456'],
    ['social_youtube', ''],
    ['social_tiktok', ''],
    ['social_instagram', ''],
    ['social_x', ''],
    ['social_telegram', ''],
    ['social_discord', ''],
    ['social_linkedin', ''],
    ['footer_columns', JSON.stringify([
      {
        title: 'Về chúng tôi',
        links: [
          { label: 'Giới thiệu', href: '/about' },
          { label: 'Đội ngũ bác sĩ', href: '/about' },
          { label: 'Chính sách bảo hành', href: '#' }
        ]
      },
      {
        title: 'Hỗ trợ khách hàng',
        links: [
          { label: 'Câu hỏi thường gặp', href: '/blog' },
          { label: 'Hướng dẫn thanh toán', href: '#' },
          { label: 'Chính sách bảo mật', href: '#' }
        ]
      }
    ])]
  ];

  for (const [key, val] of defaultSettings) {
    try {
      if (shouldForce) {
        await query('INSERT OR REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      } else {
        await query('INSERT OR IGNORE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      }
    } catch (err) {
      console.error(`Failed to seed setting key ${key}:`, err);
    }
  }

  // Seed default admin and moderator users
  try {
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    const hashedAdminPw = await hashPassword(passwordToSeed);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['admin', hashedAdminPw, 'Administrator', 'admin@nhadatprime.vn', 'admin', 'Enterprise']
      );
      console.log('👑 Default admin user seeded');
    } else if (adminPassword) {
      await query('UPDATE users SET password = ? WHERE username = ?', [hashedAdminPw, 'admin']);
      console.log('👑 Admin user password updated to custom password');
    }

    const modExists = await query('SELECT id FROM users WHERE username = ?', ['moderator']);
    if (modExists.length === 0) {
      const hashedModPw = await hashPassword('mod123');
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['moderator', hashedModPw, 'Staff Moderator', 'mod@nhadatprime.vn', 'mod', 'Pro']
      );
      console.log('🛡️ Default moderator user seeded');
    }
  } catch (err) {
    console.error('Failed to seed default users:', err);
  }

  // Seed default dynamic pages
  try {
    const pageExists = await query('SELECT id FROM pages WHERE slug = ?', ['about']);
    if (pageExists.length === 0 || shouldForce) {
      const defaultLayout = [
        {
          id: 'b_about_hero',
          type: 'hero',
          visible: true,
          configs: {
            title: 'Sứ mệnh Prime Realty',
            description: 'Kết nối khách hàng với những bất động sản chất lượng, pháp lý minh bạch và mức giá tốt nhất thị trường.',
            buttonText: 'Xem dịch vụ',
            buttonLink: '/products'
          }
        },
        {
          id: 'b_about_feat',
          type: 'features',
          visible: true,
          configs: {
            tag: 'GIÁ TRỊ CỐT LÕI',
            title: 'Cam kết đồng hành cùng bạn',
            description: 'Hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản.',
            items: [
              { title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Chuyên viên tư vấn giàu kinh nghiệm, am hiểu thị trường và tận tâm.' },
              { title: 'Pháp Lý An Toàn', desc: 'Mọi bất động sản đều được kiểm duyệt kỹ lưỡng, minh bạch.' },
              { title: 'Giá Tốt Nhất', desc: 'Cam kết mức giá cạnh tranh, hỗ trợ đàm phán tối ưu cho khách hàng.' }
            ]
          }
        }
      ];
      if (pageExists.length > 0) {
        await query('DELETE FROM pages WHERE slug = ?', ['about']);
      }
      await query(
        'INSERT INTO pages (slug, title, description, layout, status) VALUES (?, ?, ?, ?, ?)',
        ['about', 'Giới thiệu về chúng tôi', 'Prime Realty - Đối tác tin cậy trên hành trình tìm kiếm tổ ấm và đầu tư bất động sản.', JSON.stringify(defaultLayout), 'published']
      );
      console.log('📄 Default about page seeded');
    }
  } catch (err) {
    console.error('Failed to seed default pages:', err);
  }

  // Seed default file categories
  try {
    const existingFileCats = await query('SELECT COUNT(*) as cnt FROM file_categories');
    if (existingFileCats[0].cnt === 0) {
      const defaultFileCats = [
        { name: 'Chưa phân loại', slug: 'general' },
        { name: 'Ảnh minh họa', slug: 'images' },
        { name: 'Tài liệu hướng dẫn', slug: 'documents' },
        { name: 'Mã nguồn / Code', slug: 'code' },
        { name: 'Khác', slug: 'other' }
      ];
      for (const c of defaultFileCats) {
        await query('INSERT OR IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
      }
      console.log('📁 Default file categories seeded');
    }
  } catch (err) {
    console.error('Failed to seed default file categories:', err);
  }

  // Seed E-Commerce data (shop categories + sample products + coupon)
  try {
    const catCount = await query('SELECT COUNT(*) as cnt FROM shop_categories');
    if (catCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM shop_categories');
      }
      const defaultCats = [
        { name: 'Căn hộ chung cư', slug: 'can-ho', icon: '🏢', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80', sort_order: 1 },
        { name: 'Nhà phố', slug: 'nha-pho', icon: '🏘️', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', sort_order: 2 },
        { name: 'Biệt thự', slug: 'biet-thu', icon: '🏡', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', sort_order: 3 },
        { name: 'Đất nền', slug: 'dat-nen', icon: '🗺️', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', sort_order: 4 },
        { name: 'Văn phòng', slug: 'van-phong', icon: '💼', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', sort_order: 5 },
      ];
      for (const c of defaultCats) {
        await query(
          'INSERT OR IGNORE INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [c.name, c.slug, c.icon, c.image, c.sort_order]
        );
      }
      console.log('🛍️ Default shop categories seeded');
    }

    const prodCount = await query('SELECT COUNT(*) as cnt FROM products');
    if (prodCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM products');
        await query('DELETE FROM product_variants');
      }
      const catCanHo = await query("SELECT id FROM shop_categories WHERE slug = 'can-ho'");
      const catNhaPho = await query("SELECT id FROM shop_categories WHERE slug = 'nha-pho'");
      const catBietThu = await query("SELECT id FROM shop_categories WHERE slug = 'biet-thu'");
      const catDatNen = await query("SELECT id FROM shop_categories WHERE slug = 'dat-nen'");
      const catVanPhong = await query("SELECT id FROM shop_categories WHERE slug = 'van-phong'");

      const catIdCanHo = catCanHo[0]?.id || null;
      const catIdNhaPho = catNhaPho[0]?.id || null;
      const catIdBietThu = catBietThu[0]?.id || null;
      const catIdDatNen = catDatNen[0]?.id || null;
      const catIdVanPhong = catVanPhong[0]?.id || null;

      const sampleProducts = [
        { category_id: catIdCanHo, name: 'Căn hộ Vinhomes Central Park', slug: 'can-ho-vinhomes-central-park', short_description: 'Căn hộ 2PN view sông Sài Gòn, nội thất cao cấp, sổ hồng lâu dài', price: 2900000000, original_price: 3500000000, thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', brand: 'Căn hộ', origin: 'Bình Thạnh, TP. HCM', unit: '68 m²', stock: 5, is_featured: 1, is_flash_sale: 1, flash_sale_price: 2900000000 },
        { category_id: catIdNhaPho, name: 'Nhà phố KDT Sala', slug: 'nha-pho-kdt-sala', short_description: 'Nhà phố 1 trệt 3 lầu, khu compound an ninh, gần trường quốc tế', price: 16500000000, original_price: 18000000000, thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', brand: 'Nhà phố', origin: 'Quận 2, TP. Thủ Đức', unit: '100 m²', stock: 3, is_featured: 1 },
        { category_id: catIdBietThu, name: 'Biệt thự Lakeview City', slug: 'biet-thu-lakeview-city', short_description: 'Biệt thự đơn lập ven hồ, sân vườn rộng, thiết kế hiện đại', price: 28000000000, original_price: 32000000000, thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', brand: 'Biệt thự', origin: 'Quận 2, TP. Thủ Đức', unit: '200 m²', stock: 2, is_featured: 1, is_flash_sale: 1, flash_sale_price: 28000000000 },
        { category_id: catIdDatNen, name: 'Đất nền Long Thành', slug: 'dat-nen-long-thanh', short_description: 'Đất nền sổ đỏ riêng, gần sân bay Long Thành, hạ tầng hoàn thiện', price: 1800000000, original_price: 2200000000, thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', brand: 'Đất nền', origin: 'Long Thành, Đồng Nai', unit: '100 m²', stock: 20, is_featured: 1 },
        { category_id: catIdCanHo, name: 'Căn hộ Masteri Thảo Điền', slug: 'can-ho-masteri-thao-dien', short_description: 'Studio full nội thất, ngay ga Metro, tiện ích 5 sao', price: 4200000000, original_price: 4800000000, thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', brand: 'Căn hộ', origin: 'Quận 2, TP. Thủ Đức', unit: '55 m²', stock: 8, is_featured: 1, is_flash_sale: 1, flash_sale_price: 4200000000 },
        { category_id: catIdNhaPho, name: 'Shophouse Aqua City', slug: 'shophouse-aqua-city', short_description: 'Shophouse mặt tiền sông, vừa ở vừa kinh doanh, pháp lý sổ hồng', price: 10500000000, original_price: 12000000000, thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', brand: 'Nhà phố', origin: 'Biên Hòa, Đồng Nai', unit: '120 m²', stock: 6, is_featured: 1 },
        { category_id: catIdVanPhong, name: 'Văn phòng cho thuê Quận 1', slug: 'van-phong-cho-thue-quan-1', short_description: 'Sàn văn phòng hạng A, view trung tâm, cho thuê dài hạn', price: 350000000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', brand: 'Văn phòng', origin: 'Quận 1, TP. HCM', unit: '150 m²', stock: 4, tags: 'thue' },
        { category_id: catIdCanHo, name: 'Cho thuê căn hộ The Sun Avenue', slug: 'cho-thue-can-ho-the-sun-avenue', short_description: 'Căn hộ 2PN full nội thất, cho thuê 18 triệu/tháng', price: 216000000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', brand: 'Căn hộ', origin: 'Quận 2, TP. Thủ Đức', unit: '75 m²', stock: 3, tags: 'thue' }
      ];

      for (const p of sampleProducts) {
        try {
          await query(
            `INSERT OR IGNORE INTO products (category_id, name, slug, short_description, price, original_price, thumbnail, brand, origin, unit, stock, is_featured, is_flash_sale, flash_sale_price, tags, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [p.category_id, p.name, p.slug, p.short_description, p.price, p.original_price || null, p.thumbnail || null, p.brand || null, p.origin || null, p.unit || 'm²', p.stock || 0, p.is_featured || 0, p.is_flash_sale || 0, p.flash_sale_price || null, p.tags || 'ban']
          );
          // Add variants for each product
          const prod = await query('SELECT id FROM products WHERE slug = ?', [p.slug]);
          if (prod.length > 0) {
            const pid = prod[0].id;
            await query('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, ?)', [pid, p.unit || 'm²', p.price, p.stock]);
          }
        } catch (e) { /* ignore duplicate */ }
      }
      console.log('🛒 Sample products seeded');
    }

    // Seed default blog posts
    const postCount = await query('SELECT COUNT(*) as cnt FROM posts');
    if (postCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM posts');
      }
      
      const defaultPosts = [
        {
          title: 'Thị trường bất động sản 2024: Cơ hội và thách thức',
          slug: 'thi-truong-bat-dong-san-2024',
          summary: 'Năm 2024 được dự báo là thời điểm bản lề của thị trường bất động sản Việt Nam với nhiều tín hiệu phục hồi tích cực sau giai đoạn trầm lắng.',
          content: 'Thị trường bất động sản 2024 ghi nhận nhiều chuyển biến tích cực: lãi suất cho vay giảm về vùng hấp dẫn, các luật Đất đai - Nhà ở - Kinh doanh BĐS sửa đổi có hiệu lực giúp minh bạch pháp lý, dòng vốn đầu tư công vào hạ tầng được đẩy mạnh. Phân khúc căn hộ vừa túi tiền và đất nền vùng ven quanh các dự án hạ tầng lớn (Vành đai 3, cao tốc, sân bay Long Thành) tiếp tục thu hút nhà đầu tư. Tuy vậy, thanh khoản phân hóa mạnh - sản phẩm pháp lý rõ ràng, giá hợp lý mới dễ giao dịch.',
          image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
          author_name: 'Prime Realty'
        },
        {
          title: 'Lãi suất ngân hàng giảm: Cơ hội vàng cho người mua nhà',
          slug: 'lai-suat-ngan-hang-giam',
          summary: 'Mặt bằng lãi suất cho vay mua nhà đã giảm về mức thấp nhất nhiều năm, mở ra cơ hội sở hữu nhà cho người có nhu cầu ở thực.',
          content: 'Hiện nhiều ngân hàng áp dụng lãi suất vay mua nhà ưu đãi chỉ từ 6-8%/năm trong 1-2 năm đầu, kèm chính sách ân hạn nợ gốc. Với người mua ở thực, đây là thời điểm thuận lợi để cân nhắc: nên chọn khoản vay không quá 40-50% giá trị tài sản, ưu tiên lãi suất thả nổi được tính minh bạch theo lãi suất tham chiếu. Nên tính toán kỹ dòng tiền trả nợ hàng tháng không vượt quá 40% thu nhập để đảm bảo an toàn tài chính.',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
          author_name: 'Prime Realty'
        },
        {
          title: 'Đầu tư bất động sản vùng ven: Xu hướng mới của giới đầu tư',
          slug: 'dau-tu-bat-dong-san-vung-ven',
          summary: 'Khi giá nhà đất trung tâm neo cao, dòng tiền đầu tư đang dịch chuyển mạnh về các khu vực vùng ven có hạ tầng phát triển.',
          content: 'Bất động sản vùng ven các đô thị lớn như Đồng Nai, Bình Dương, Long An, Hưng Yên đang hưởng lợi lớn từ làn sóng đầu tư hạ tầng. Ưu điểm là giá còn mềm, dư địa tăng giá lớn khi hạ tầng hoàn thiện. Tuy nhiên nhà đầu tư cần lưu ý: chọn khu vực có quy hoạch rõ ràng, pháp lý sổ đỏ riêng, kết nối giao thông thực tế (không chỉ trên giấy), và xác định tầm nhìn đầu tư trung - dài hạn 3-5 năm để đạt hiệu quả tối ưu.',
          image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
          author_name: 'Prime Realty'
        }
      ];

      for (const p of defaultPosts) {
        await query(
          `INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`,
          [p.slug, p.title, p.summary, p.content, p.image, p.author_name]
        );
      }
      console.log('📝 Sample posts seeded');
    }

    // Seed a sample coupon
    const couponExists = await query("SELECT id FROM coupons WHERE code = 'PRIME2024'");
    if (couponExists.length === 0) {
      await query(
        "INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        ['PRIME2024', 'fixed', 20000000, 2000000000, 20000000, 100]
      );
      console.log('🎟️ Sample coupon SMILE30 seeded');
    }

  } catch (err) {
    console.error('Failed to seed E-Commerce data:', err);
  }

  console.log('✅ Seed data complete');
}
