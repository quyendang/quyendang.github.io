// config.js - File cấu hình trung tâm
// Bạn chỉ cần sửa file này, các trang sẽ tự động cập nhật

export const config = {
  // ============ THÔNG TIN DEVELOPER ============
  developer: {
    id: '1122114237',                    // Developer ID trên App Store
    name: 'Quyen Dang',
    tagline: 'Crafting beautifully simple iOS apps for productivity & focus',
    email: 'support@quyendang.dev',      // ⚠️ Đổi thành email thật của bạn
    websiteUrl: 'https://quyendang.dev', // ⚠️ Đổi thành domain thật của bạn
    country: 'us',                        // App Store country code
  },

  // ============ THÔNG TIN BRAND ============
  brand: {
    logo: '⚡',                          // Emoji hoặc URL logo
    primaryColor: '#0A0A0A',
    accentColor: '#FF5A1F',              // Cam đậm - phong cách bold
    bgColor: '#FAFAF7',                  // Off-white ấm
    textColor: '#1A1A1A',
  },

  // ============ THÔNG TIN PRIVACY POLICY ============
  // Các thông tin này dùng để tự sinh privacy policy theo chuẩn GDPR/CCPA
  privacy: {
    companyName: 'Quyen Dang',
    address: 'Da Lat, Lam Dong, Vietnam',
    lastUpdated: '2026-04-28',
    
    // Liệt kê những thông tin app của bạn THỰC SỰ thu thập
    // Privacy policy sẽ được sinh tự động dựa trên các flag này
    dataCollected: {
      analytics: false,        // Có dùng Firebase/Google Analytics không?
      crashReports: true,      // Có dùng Crashlytics/Sentry không?
      advertising: false,      // Có hiển thị quảng cáo không?
      userAccounts: false,     // Có yêu cầu tạo tài khoản không?
      location: false,         // Có dùng GPS không?
      camera: false,           // Có dùng camera không?
      photos: false,           // Có truy cập photo library không?
      notifications: true,     // Có gửi push notifications không?
      iCloud: true,            // Có dùng iCloud sync không?
      inAppPurchases: true,    // Có in-app purchases không?
    },
    
    // Apps đặc biệt cần override config (nếu app nào đó có hành vi khác)
    appSpecificOverrides: {
      // 'app-id': { camera: true, photos: true }
      '6474615556': { camera: true, photos: true }, // Tet Filter dùng camera
    },
  },

  // ============ APPS CHƯA LÊN STORE ============
  // Thêm URL App Store vào đây để tạo privacy & support page tạm thời
  // trước khi app được Apple duyệt và dữ liệu có thể fetch từ iTunes API
  pendingApps: [
    // Thêm app chưa được duyệt vào đây. Chỉ cần URL từ App Store Connect.
    {
      appStoreUrl: 'https://apps.apple.com/us/app/fastremind-nh%E1%BA%AFc-tr%E1%BA%A3-n%E1%BB%A3/id6762947777',
      name: 'FastRemind Nhắc Trả Nợ', // Tùy chọn: ghi đè tên tự trích xuất từ URL
    }
  ],

  // ============ DEPLOYMENT ============
  deployment: {
    baseUrl: 'https://quyendang.dev',    // ⚠️ Đổi thành domain thật
    // GitHub Pages: https://username.github.io/repo-name
  },
};
