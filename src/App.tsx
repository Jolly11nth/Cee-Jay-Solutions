import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Consultation } from './components/Consultation';
import { Admin } from './components/Admin';
import { Navigation } from './components/Navigation';
import { WhatsAppSupport } from './components/WhatsAppSupport';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Handle sitemap and robots.txt requests (fallback if static files don't work)
  useEffect(() => {
    const path = window.location.pathname;
    
    // Serve sitemap.xml dynamically if requested
    if (path === '/sitemap.xml') {
      const sitemap = generateSitemapXML();
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      window.location.href = url;
      return;
    }
    
    // Serve robots.txt dynamically if requested
    if (path === '/robots.txt') {
      const robots = generateRobotsTxt();
      const blob = new Blob([robots], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      window.location.href = url;
      return;
    }
  }, []);

  // Add Google Analytics
  useEffect(() => {
    // Add meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Cee Jay - Building Innovative & User-Centric IT Solutions. Professional web development, mobile app development, and UI/UX design services in Nigeria.';
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'web development, mobile app development, UI/UX design, IT solutions, software development, Nigeria, Cee Jay';
      document.head.appendChild(meta);
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      document.head.appendChild(meta);
    }

    // Update page title
    document.title = 'Cee Jay - Building Innovative & User-Centric IT Solutions';

    // Add gtag.js script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-SXQTTPJ2DD';
    document.head.appendChild(gtagScript);

    // Add gtag configuration
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SXQTTPJ2DD');
    `;
    document.head.appendChild(configScript);

    // Cleanup function
    return () => {
      document.head.removeChild(gtagScript);
      document.head.removeChild(configScript);
    };
  }, []);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    
    // Update page title based on current page for SEO
    const pageTitles: { [key: string]: string } = {
      home: 'Cee Jay - Building Innovative & User-Centric IT Solutions',
      about: 'About Us - Cee Jay IT Solutions',
      services: 'Our Services - Web & Mobile Development | Cee Jay',
      portfolio: 'Portfolio - Our Work | Cee Jay',
      consultation: 'Get a Free Consultation | Cee Jay',
      admin: 'Admin Dashboard | Cee Jay'
    };
    
    document.title = pageTitles[page] || pageTitles.home;
    
    // Update meta description based on page
    const pageDescriptions: { [key: string]: string } = {
      home: 'Cee Jay - Building Innovative & User-Centric IT Solutions. Professional web development, mobile app development, and UI/UX design services in Nigeria.',
      about: 'Learn about Cee Jay, our vision to transform businesses through innovative technology solutions, and our commitment to excellence.',
      services: 'Professional web development, mobile app development, and UI/UX design services. Custom software solutions tailored to your business needs.',
      portfolio: 'View our portfolio of successful projects including mobile apps, web platforms, and UI/UX designs for clients across Nigeria.',
      consultation: 'Request a free consultation for your web development, mobile app, or UI/UX design project. Get expert advice and a custom quote.',
      admin: 'Cee Jay Admin Dashboard'
    };
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescriptions[page] || pageDescriptions.home);
    }
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateToPage} />;
      case 'about':
        return <About onNavigate={navigateToPage} />;
      case 'services':
        return <Services onNavigate={navigateToPage} />;
      case 'portfolio':
        return <Portfolio onNavigate={navigateToPage} />;
      case 'consultation':
        return <Consultation onNavigate={navigateToPage} />;
      case 'admin':
        return <Admin onNavigate={navigateToPage} />;
      default:
        return <Home onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={navigateToPage} />
      {renderPage()}
      <WhatsAppSupport />
    </div>
  );
}