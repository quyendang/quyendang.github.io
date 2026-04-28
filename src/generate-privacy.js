// generate-privacy.js - Tự động sinh Privacy Policy cho mỗi app
import { config } from './config.js';

/**
 * Lấy data collection settings cho từng app (kết hợp default + override)
 */
function getDataCollection(appId) {
  const base = { ...config.privacy.dataCollected };
  const overrides = config.privacy.appSpecificOverrides[appId] || {};
  return { ...base, ...overrides };
}

/**
 * Sinh nội dung Privacy Policy theo chuẩn GDPR/CCPA
 */
export function generatePrivacyPolicy(app) {
  const data = getDataCollection(app.id);
  const { companyName, address, lastUpdated } = config.privacy;
  const { email } = config.developer;

  const collectedItems = [];
  if (data.crashReports) collectedItems.push({
    title: 'Diagnostic & Crash Data',
    desc: 'Anonymous crash logs and performance data to improve app stability. This data cannot be linked to your identity.'
  });
  if (data.analytics) collectedItems.push({
    title: 'Usage Analytics',
    desc: 'Anonymous app usage statistics (screens viewed, features used) to understand how to improve the app.'
  });
  if (data.advertising) collectedItems.push({
    title: 'Advertising Identifiers',
    desc: 'IDFA may be used to deliver and measure advertising. You can opt out via iOS Settings → Privacy & Security → Tracking.'
  });
  if (data.userAccounts) collectedItems.push({
    title: 'Account Information',
    desc: 'Email address and profile data you voluntarily provide to create an account.'
  });
  if (data.location) collectedItems.push({
    title: 'Location Data',
    desc: 'GPS location is used only when you grant permission, solely for in-app features. Not stored on our servers.'
  });
  if (data.camera) collectedItems.push({
    title: 'Camera Access',
    desc: 'Camera is accessed only when you actively use camera-based features. Photos taken stay on your device unless you choose to share them.'
  });
  if (data.photos) collectedItems.push({
    title: 'Photo Library Access',
    desc: 'Photo library is accessed only when you actively select photos. Selected photos are processed locally on your device.'
  });
  if (data.iCloud) collectedItems.push({
    title: 'iCloud Sync',
    desc: 'Your data may be synced via your personal iCloud account. We do not have access to this data — it remains under your Apple ID control.'
  });
  if (data.inAppPurchases) collectedItems.push({
    title: 'Purchase Information',
    desc: 'In-app purchases are processed entirely by Apple. We do not receive your payment details.'
  });
  if (data.notifications) collectedItems.push({
    title: 'Push Notification Token',
    desc: 'If you enable notifications, an anonymous device token is used to deliver alerts. No personal data is attached.'
  });

  // Nếu không thu thập gì
  const collectsNothing = collectedItems.length === 0;

  return {
    title: `Privacy Policy — ${app.name}`,
    appName: app.name,
    appId: app.id,
    lastUpdated,
    sections: [
      {
        heading: 'Introduction',
        body: `This Privacy Policy describes how ${companyName} ("we", "us", or "our") handles information in connection with the mobile application "${app.name}" (the "App"). We are committed to protecting your privacy and being transparent about our practices.`
      },
      {
        heading: 'Information We Collect',
        body: collectsNothing
          ? `${app.name} is designed with privacy as a core principle. We do not collect, store, or transmit any personal information from your device. All data you create within the App stays on your device.`
          : `${app.name} may collect the following types of information, only as necessary to provide the App's functionality:`,
        items: collectsNothing ? null : collectedItems
      },
      {
        heading: 'How We Use Information',
        body: collectsNothing
          ? 'Since we do not collect personal information, this section does not apply.'
          : 'Any information collected is used solely to: (1) provide and maintain the App\'s functionality, (2) diagnose and fix bugs, and (3) improve the user experience. We never sell your information to third parties.'
      },
      {
        heading: 'Data Storage & Security',
        body: data.iCloud
          ? 'Your personal app data is stored locally on your device and may be synced to your private iCloud account. Apple manages all iCloud encryption and security. We do not operate any servers that store your personal app content.'
          : 'Your personal app data is stored locally on your device. We do not operate any servers that store your personal app content.'
      },
      {
        heading: 'Third-Party Services',
        body: (() => {
          const services = [];
          if (data.crashReports) services.push('Apple App Analytics / Crashlytics (anonymous crash reporting)');
          if (data.analytics) services.push('Anonymous analytics service');
          if (data.advertising) services.push('Apple Advertising / SKAdNetwork');
          if (data.inAppPurchases) services.push('Apple In-App Purchase');
          
          if (services.length === 0) {
            return 'The App does not integrate with any third-party services that collect personal information.';
          }
          return `The App may use the following third-party services, each of which has its own privacy policy: ${services.join('; ')}.`;
        })()
      },
      {
        heading: 'Children\'s Privacy',
        body: `${app.name} does not knowingly collect any personal information from children under the age of 13. The App's content rating on the App Store is ${app.contentRating || '4+'}. If you believe a child has provided us with personal information, please contact us and we will delete such information immediately.`
      },
      {
        heading: 'Your Rights (GDPR & CCPA)',
        body: 'Depending on your location, you may have rights including: the right to access, correct, or delete your data; the right to data portability; and the right to object to processing. Since most of your data stays on your device, you can exercise these rights directly by deleting the app or its data. For any additional requests, contact us at the email below.'
      },
      {
        heading: 'Changes to This Policy',
        body: `We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect any changes. Continued use of the App after changes are posted constitutes acceptance of the updated policy.`
      },
      {
        heading: 'Contact Us',
        body: `If you have any questions about this Privacy Policy or the App's data practices, please contact us:\n\nEmail: ${email}\nDeveloper: ${companyName}\nLocation: ${address}`
      }
    ]
  };
}

/**
 * Sinh nội dung Support page
 */
export function generateSupportContent(app) {
  const { email } = config.developer;
  const { companyName } = config.privacy;
  
  return {
    title: `Support — ${app.name}`,
    appName: app.name,
    appId: app.id,
    sections: [
      {
        heading: 'Need Help?',
        body: `We're sorry you ran into trouble with ${app.name}. Most issues can be resolved quickly — please review the FAQ below first, then reach out if you still need help.`
      },
      {
        heading: 'Frequently Asked Questions',
        faqs: [
          {
            q: `How do I update ${app.name}?`,
            a: `Open the App Store on your iPhone or iPad, tap your profile icon, and scroll down to see available updates. Tap "Update" next to ${app.name}.`
          },
          {
            q: 'The app is crashing or freezing — what can I do?',
            a: 'Try these steps in order: (1) Force-close the app and reopen it. (2) Restart your device. (3) Make sure your iOS is up to date. (4) Reinstall the app. If the problem persists, please email us with your iOS version and device model.'
          },
          {
            q: 'How do I restore my purchases?',
            a: 'Open the app, go to Settings inside the app, and tap "Restore Purchases". Make sure you\'re signed into the same Apple ID you used to make the original purchase.'
          },
          {
            q: 'How do I cancel a subscription?',
            a: 'On your iPhone or iPad, open Settings → tap your name → tap Subscriptions → select the subscription → tap Cancel. Apple manages all subscription billing directly.'
          },
          {
            q: 'How do I request a refund?',
            a: 'Refunds are handled by Apple. Visit reportaproblem.apple.com, sign in with your Apple ID, find the purchase, and request a refund.'
          },
          {
            q: 'Will my data sync across devices?',
            a: `${app.name} uses iCloud to sync data between devices signed in to the same Apple ID. Make sure iCloud is enabled in your device Settings.`
          },
          {
            q: 'Can I export my data?',
            a: 'Yes, please contact us using the email below and we\'ll guide you through exporting your data from the app.'
          },
        ]
      },
      {
        heading: 'Contact Support',
        body: `If your question isn't answered above, send us an email and we'll respond within 1–2 business days.`,
        contact: {
          email,
          subject: `Support: ${app.name}`,
          tip: 'Tip: include your iOS version, device model, and app version (found in app Settings) so we can help you faster.'
        }
      }
    ]
  };
}
