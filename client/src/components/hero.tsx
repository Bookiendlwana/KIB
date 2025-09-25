import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  
  return (
    <section 
      id="home" 
      className="relative bg-gradient-to-r from-blue-primary to-blue-secondary min-h-screen flex items-center"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: "url('/hero-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
          </h2>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="bg-blue-primary hover:bg-blue-secondary text-white px-8 py-4 rounded-lg transition-colors font-semibold text-lg text-center"
              data-testid="hero-quote-button"
            >
              {t('nav.getQuote')}
            </Link>
            <Link 
              href="/projects" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-colors font-semibold text-lg text-center"
              data-testid="hero-projects-button"
            >
              {t('projects.viewDetails')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
