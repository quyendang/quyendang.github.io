# 🍎 App Store Landing Page Generator

Hệ thống tự động sinh landing page, privacy policy, và support page cho toàn bộ apps trên tài khoản Apple Developer của bạn — chỉ cần thêm app mới lên App Store, chạy 1 lệnh `npm run build`, mọi page sẽ tự động cập nhật.

## ✨ Tính năng

- 🔄 **Auto-fetch** danh sách apps qua iTunes Search API (không cần App Store Connect API key)
- 🎨 **Landing page tổng** liệt kê tất cả apps với thiết kế editorial cao cấp
- 📱 **Landing page riêng** cho mỗi app với screenshots, mô tả, thông số chi tiết
- 🛡️ **Privacy Policy** tự sinh động theo chuẩn GDPR/CCPA dựa trên data app thực sự thu thập
- 🆘 **Support page** với FAQ và contact form
- 🗺️ **SEO optimized** — sitemap.xml, robots.txt, OpenGraph, Twitter cards
- ⚡ **Static site** — deploy miễn phí lên GitHub Pages, Vercel, Netlify, Cloudflare Pages

## 📂 Cấu trúc

```
appstore-landing/
├── src/
│   ├── config.js           ← ⭐ Sửa file này để cấu hình
│   ├── fetch-apps.js       ← Lấy data từ iTunes API
│   ├── generate-privacy.js ← Sinh nội dung privacy/support
│   ├── templates.js        ← HTML/CSS chung
│   ├── page-home.js        ← Trang chủ
│   ├── page-app.js         ← Landing page mỗi app
│   ├── page-legal.js       ← Privacy & support pages
│   └── build.js            ← Build script chính
├── apps-cache.json         ← Cache (sinh tự động)
├── dist/                   ← Output (sinh tự động) 
└── package.json
```

## 🚀 Cách dùng

### Bước 1: Cấu hình

Mở `src/config.js` và sửa các thông tin sau:

```js
developer: {
  id: '1122114237',                    // ← Developer ID của bạn
  email: 'support@yourdomain.com',     // ← Email thật của bạn
  websiteUrl: 'https://yourdomain.com',
},
deployment: {
  baseUrl: 'https://yourdomain.com',   // ← Domain bạn sẽ deploy
}
```

**Quan trọng**: trong mục `privacy.dataCollected`, đánh dấu `true/false` cho từng loại dữ liệu app bạn thực sự thu thập. Privacy policy sẽ được sinh chính xác dựa trên các flag này.

### Bước 2: Build

```bash
# Lần đầu - fetch fresh data từ iTunes
npm run build

# Lần sau - dùng cache (nhanh hơn)
node src/build.js --cache

# Dev mode với local server
npm run dev
```

Output sẽ được tạo trong thư mục `dist/`.

### Bước 3: Deploy

Có 4 lựa chọn miễn phí phổ biến (chọn 1):

#### Option A — GitHub Pages (đơn giản nhất)

1. Push code lên GitHub repo
2. Vào **Settings → Pages → Source: GitHub Actions**
3. Workflow `.github/workflows/deploy.yml` đã được tạo sẵn — sẽ tự build và deploy mỗi lần push

#### Option B — Vercel

```bash
npm i -g vercel
vercel --prod
```

Set build command: `npm run build`, output directory: `dist`.

#### Option C — Netlify

Drag-drop folder `dist/` vào netlify.com hoặc connect GitHub.

#### Option D — Cloudflare Pages

Connect GitHub, set build command `npm run build`, output `dist`.

### Bước 4: Cấu hình URLs trong App Store Connect

Sau khi deploy, mỗi app sẽ có 3 URL chuẩn để paste vào App Store Connect:

```
Marketing URL: https://yourdomain.com/apps/{app-slug}/
Support URL:   https://yourdomain.com/apps/{app-slug}/support/
Privacy URL:   https://yourdomain.com/apps/{app-slug}/privacy/
```

Build script sẽ in ra danh sách URLs đầy đủ ở cuối log. Bạn cũng có thể xem `dist/apps.json` để lấy toàn bộ.

## 🔁 Workflow khi có app mới

1. Bạn release app mới trên App Store
2. Đợi App Store index app (~ vài giờ)
3. Chạy `npm run build` → đẩy lên domain
4. Trong App Store Connect, paste 3 URL như trên
5. **Xong!** Privacy policy & support page đã tự có

Hoặc set GitHub Actions để **tự build hàng ngày** (đã include trong `.github/workflows/deploy.yml`).

## 🎨 Tùy chỉnh

### Đổi màu / logo
Sửa trong `src/config.js`:
```js
brand: {
  logo: '⚡',                  // emoji hoặc URL
  accentColor: '#FF5A1F',      // màu nhấn
  bgColor: '#FAFAF7',          // màu nền
}
```

### Override privacy theo từng app
Nếu app A có dùng camera nhưng app B không, dùng:
```js
appSpecificOverrides: {
  '6474615556': { camera: true, photos: true },
}
```

### Đổi typography / layout
Các CSS chính nằm trong `templates.js` (CSS chung) và mỗi `page-*.js` (CSS riêng).

## 🔒 Lưu ý về privacy policy

Privacy policy sinh tự động dựa trên flags bạn cấu hình. Tuy nhiên, **bạn vẫn cần review lại** trước khi publish vì:
- Apple yêu cầu privacy policy phải mô tả chính xác hành vi app
- Nếu app có hành vi đặc biệt (3rd-party SDK, analytics tùy biến...), cần bổ sung thủ công
- Nội dung legal nên được luật sư review nếu app có doanh thu lớn

**Đây không phải lời khuyên pháp lý.** Tôi đã sinh template theo best practices nhưng trách nhiệm cuối cùng là của bạn.

## 📈 Roadmap gợi ý

- [ ] Đa ngôn ngữ (vi/en)
- [ ] Press kit page
- [ ] Newsletter signup
- [ ] Analytics dashboard cho ratings
- [ ] Auto-screenshot từ TestFlight builds

## 📝 License

MIT
