import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./language-selector";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    return location === path;
  };

  return (
    <header className={`bg-navy-dark/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled ? "shadow-xl border-navy-primary/20" : "shadow-lg border-navy-primary/10"}`}>
      <nav className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-primary to-navy-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-navy-primary/20">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">Kanguya Builders</span>
              <span className="text-xs text-navy-light font-medium tracking-wider">{t('header.tagline')}</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-2">
            <Link 
              href="/" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-home"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/services" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/services") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-services"
            >
              {t('nav.services')}
            </Link>
            <Link 
              href="/projects" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/projects") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-projects"
            >
              {t('nav.projects')}
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/about") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-about"
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/reviews" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/reviews") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-reviews"
            >
              {t('nav.reviews')}
            </Link>
            <Link 
              href="/gallery" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/gallery") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-gallery"
            >
              {t('nav.gallery')}
            </Link>
            <Link 
              href="/cost-estimator" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/cost-estimator") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-cost-estimator"
            >
              {t('nav.costEstimator')}
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-navy-primary/20 ${isActiveLink("/contact") ? "text-navy-light bg-navy-primary/30 shadow-sm" : "text-navy-light/80 hover:text-white"}`}
              data-testid="nav-contact"
            >
              {t('nav.contact')}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <div className="w-px h-6 bg-navy-primary/30"></div>
            <a 
              href="https://wa.me/27790562847?text=Hi%20Kanguya%20Builders!%20I%27m%20interested%20in%20your%20construction%20services." 
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-all duration-200 flex items-center px-3 py-2 rounded-lg hover:bg-green-500/20"
              data-testid="header-whatsapp"
              title={t('header.whatsappButton')}
            >
              <SiWhatsapp className="h-5 w-5" />
            </a>
            <Link 
              href="/quote" 
              className="bg-gradient-to-r from-navy-primary to-navy-secondary hover:from-navy-secondary hover:to-navy-primary text-white px-6 py-2.5 rounded-lg transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-navy-primary/20"
              data-testid="header-quote-button"
            >
              {t('nav.getQuote')}
            </Link>
          </div>

          <button 
            className="lg:hidden text-white hover:text-navy-light transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-navy-primary/30 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-home"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/services" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/services") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link 
                href="/projects" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/projects") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-projects"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.projects')}
              </Link>
              <Link 
                href="/about" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/about") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                href="/reviews" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/reviews") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-reviews"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.reviews')}
              </Link>
              <Link 
                href="/gallery" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/gallery") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-gallery"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.gallery')}
              </Link>
              <Link 
                href="/cost-estimator" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/cost-estimator") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-cost-estimator"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.costEstimator')}
              </Link>
              <Link 
                href="/contact" 
                className={`hover:text-navy-light transition-colors text-left ${isActiveLink("/contact") ? "text-navy-light" : "text-white/80"}`}
                data-testid="mobile-nav-contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              <a 
                href="tel:+27790562847" 
                className="text-muted-foreground hover:text-orange-primary transition-colors flex items-center"
                data-testid="mobile-phone"
              >
                <Phone className="mr-2 h-4 w-4" />
                +27 79 056 2847
              </a>
              <a 
                href="https://wa.me/27790562847?text=Hi%20Kanguya%20Builders!%20I%27m%20interested%20in%20your%20construction%20services." 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-primary transition-colors flex items-center"
                data-testid="mobile-whatsapp"
              >
                <SiWhatsapp className="mr-2 h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link 
                href="/quote" 
                className="bg-orange-primary hover:bg-orange-secondary text-white px-6 py-2 rounded-lg transition-colors text-center"
                data-testid="mobile-quote-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
