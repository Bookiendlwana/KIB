import { Phone, Mail, MapPin } from "lucide-react";
import { SiFacebook, SiX, SiInstagram, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import LogoImage from "./LogoImage";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <LogoImage />
              <h5 className="text-xl font-bold text-foreground">Kanguya Builders</h5>
            </div>
            <p className="text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/Kanguyabuilders" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-navy-primary transition-colors"
                data-testid="social-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/27790562847?text=Hi%20Kanguya%20Builders!%20I%27m%20interested%20in%20your%20construction%20services." 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-navy-primary transition-colors"
                data-testid="social-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
              <a 
                href="#"
                className="text-muted-foreground hover:text-navy-primary transition-colors"
                data-testid="social-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="#"
                className="text-muted-foreground hover:text-navy-primary transition-colors"
                data-testid="social-linkedin"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-foreground">{t('footer.topServices')}</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/services" className="hover:text-navy-primary transition-colors">{t('services.brickwork')}</Link></li>
              <li><Link href="/services" className="hover:text-navy-primary transition-colors">{t('services.plumbing')}</Link></li>
              <li><Link href="/services" className="hover:text-navy-primary transition-colors">{t('services.carpentry')}</Link></li>
              <li><Link href="/services" className="hover:text-navy-primary transition-colors">{t('services.plastering')}</Link></li>
              <li><Link href="/services" className="hover:text-navy-primary transition-colors">{t('services.paving')}</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-foreground">{t('footer.quickLinks')}</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link 
                  href="/"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-home"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-about"
                >
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-projects"
                >
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/services"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-services"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/cost-estimator"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-cost-estimator"
                >
                  {t('nav.costEstimator')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/quote"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-quote"
                >
                  {t('nav.getQuote')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-nav-contact"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-foreground">{t('footer.contactInfo')}</h5>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center">
                <Phone className="mr-3 h-4 w-4 text-navy-primary" />
                <a
                  href="tel:+27790562847"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-phone"
                >
                  +27 79 056 2847
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-4 w-4 text-navy-primary" />
                <a
                  href="mailto:Kanguyabuilders@gmail.com"
                  className="hover:text-navy-primary transition-colors"
                  data-testid="footer-email"
                >
                  Kanguyabuilders@gmail.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-4 w-4 text-navy-primary mt-1" />
                <div>
                  <div>{t('footer.address.line1')}</div>
                  <div>{t('footer.address.line2')}</div>
                  <div className="text-xs mt-1">{t('footer.hours')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
