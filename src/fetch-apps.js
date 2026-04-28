// fetch-apps.js - Module lấy dữ liệu apps từ iTunes API
import { config } from './config.js';

const ITUNES_API = 'https://itunes.apple.com/lookup';

/**
 * Tạo URL slug từ tên app (ví dụ: "FastFocus: Deep Work" -> "fastfocus-deep-work")
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Fetch toàn bộ apps của developer từ iTunes API
 */
export async function fetchDeveloperApps(devId = config.developer.id, country = config.developer.country) {
  const url = `${ITUNES_API}?id=${devId}&country=${country}&entity=software,iPadSoftware,macSoftware&limit=200`;
  
  console.log(`📡 Fetching apps from: ${url}`);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`iTunes API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Result đầu tiên là thông tin developer, còn lại là apps
  const apps = data.results.filter(item => item.wrapperType === 'software' || item.kind === 'software');
  
  // Chuẩn hóa dữ liệu
  return apps.map(app => ({
    id: String(app.trackId),
    name: app.trackName,
    slug: slugify(app.trackName),
    bundleId: app.bundleId,
    description: app.description || '',
    shortDescription: (app.description || '').split('\n')[0].slice(0, 160),
    icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60,
    iconSmall: app.artworkUrl100,
    screenshots: app.screenshotUrls || [],
    ipadScreenshots: app.ipadScreenshotUrls || [],
    appStoreUrl: app.trackViewUrl,
    price: app.formattedPrice || 'Free',
    rating: app.averageUserRating || 0,
    ratingCount: app.userRatingCount || 0,
    version: app.version,
    releaseDate: app.releaseDate,
    currentVersionReleaseDate: app.currentVersionReleaseDate,
    genre: app.primaryGenreName,
    genres: app.genres || [],
    contentRating: app.contentAdvisoryRating || '4+',
    languages: app.languageCodesISO2A || ['EN'],
    minimumOsVersion: app.minimumOsVersion,
    fileSize: app.fileSizeBytes,
    isUniversal: app.supportedDevices?.length > 5,
    features: app.features || [],
    developerName: app.artistName,
    developerUrl: app.artistViewUrl,
    sellerName: app.sellerName,
  }));
}

/**
 * Tạo file JSON cache để dùng offline
 */
export async function saveAppsCache(apps, path) {
  const fs = await import('fs/promises');
  await fs.writeFile(path, JSON.stringify(apps, null, 2), 'utf-8');
  console.log(`💾 Saved ${apps.length} apps to ${path}`);
}

// Cho phép chạy trực tiếp file này để test
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchDeveloperApps()
    .then(apps => {
      console.log(`✅ Found ${apps.length} apps:`);
      apps.forEach((app, i) => {
        console.log(`  ${i + 1}. ${app.name} (${app.id}) - ${app.genre}`);
      });
      return saveAppsCache(apps, './apps-cache.json');
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
