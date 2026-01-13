/**
 * Analytics Tracking Utilities
 * Wrapper functions for Google Analytics and other tracking services
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', 'engagement', formName);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', 'engagement', `${buttonName} - ${location}`);
};

// Track errors
export const trackError = (errorMessage: string, errorLocation: string) => {
  trackEvent('error', 'technical', `${errorLocation}: ${errorMessage}`);
};

// Track conversions
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', 'business', conversionType, value);
};

// Track user signup
export const trackSignup = (method: string) => {
  trackEvent('sign_up', 'user_action', method);
  trackConversion('signup');
};

// Track demo requests
export const trackDemoRequest = () => {
  trackEvent('demo_request', 'user_action', 'demo_form');
  trackConversion('demo_request');
};

// Track login
export const trackLogin = (method: string) => {
  trackEvent('login', 'user_action', method);
};

// Track logout
export const trackLogout = () => {
  trackEvent('logout', 'user_action');
};

// Track search
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'engagement', searchTerm);
};

// Track video play
export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('video_play', 'engagement', videoTitle);
};

// Track file download
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', 'engagement', fileName);
};

// Track external link clicks
export const trackExternalLink = (url: string) => {
  trackEvent('external_link', 'navigation', url);
};

// Track social share
export const trackSocialShare = (platform: string, contentType: string) => {
  trackEvent('social_share', 'engagement', `${platform} - ${contentType}`);
};

// Custom dimension tracking
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

// E-commerce tracking
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items,
    });
  }
};
