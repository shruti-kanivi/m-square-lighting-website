import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title = 'M Square Lighting - Rest Assured',
  description = 'Professional lighting solutions for residential, commercial, and architectural spaces. Custom design, quality assurance, and expert installation.',
  keywords = 'lighting solutions, architectural lighting, LED lighting, commercial lighting, residential lighting, smart lighting, Bengaluru',
  image = '/logo.jpeg',
  type = 'website'
}) => {
  const location = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://msquarelighting.com';
  const currentUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', `${siteUrl}${image}`, true);
    updateMetaTag('og:site_name', 'M Square Lighting', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${siteUrl}${image}`);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'M Square Lighting');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

  }, [title, description, keywords, image, type, currentUrl, siteUrl]);

  return null;
};

export default SEO;
