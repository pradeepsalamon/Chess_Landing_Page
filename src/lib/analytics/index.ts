import * as meta from '../meta/pixel';
import * as google from '../google/analytics';

export const trackPageView = (url: string) => {
  meta.pageview();
  google.pageview(url);
};

export const trackLead = (data: { value?: number; currency?: string; content_name?: string } = {}) => {
  meta.event('Lead', data);
  google.event({
    action: 'generate_lead',
    category: 'engagement',
    label: 'demo_registration'
  });
};

export const trackViewContent = (data: { content_name?: string } = {}) => {
  meta.event('ViewContent', data);
  google.event({
    action: 'view_content',
    category: 'engagement',
    label: data.content_name || 'content'
  });
};

export const trackCompleteRegistration = () => {
  meta.event('CompleteRegistration');
  google.event({
    action: 'sign_up',
    category: 'engagement',
    label: 'demo_registration'
  });
};
