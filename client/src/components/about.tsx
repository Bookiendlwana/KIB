import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="py-20 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/project-images/WhatsApp Image 2025-09-02 at 17.48.21_1757324896683.jpeg" 
              alt="Kanguya Builders team and construction work" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{t('about.title')}</h3>
            <p className="text-lg text-gray-neutral mb-6 leading-relaxed">
              {t('about.description')}
            </p>

            <div className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('about.vision')}</h4>
                <p className="text-gray-neutral text-sm">
                  {t('about.visionText')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('about.philosophy')}</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-neutral text-sm">{t('about.philosophyPoints.safety')}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-neutral text-sm">{t('about.philosophyPoints.planning')}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-neutral text-sm">{t('about.philosophyPoints.communication')}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-neutral text-sm">{t('about.philosophyPoints.tracking')}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-neutral text-sm">{t('about.philosophyPoints.supervision')}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-neutral text-sm">{t('about.philosophyPoints.completion')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-primary mb-1" data-testid="stat-experience">14+</div>
                <div className="text-gray-neutral text-sm">{t('about.yearsExperience')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-primary mb-1" data-testid="stat-projects">500+</div>
                <div className="text-gray-neutral text-sm">{t('about.projectsCompleted')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-primary mb-1" data-testid="stat-satisfaction">100%</div>
                <div className="text-gray-neutral text-sm">{t('about.clientSatisfaction')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
