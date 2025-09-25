import { Home, Wrench, PaintBucket, Hammer, Building, Layers, Square, Droplets, Drill, Grid3x3, TreePine, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const getServices = (t: any) => [
  {
    icon: Grid3x3,
    title: t('services.tiling'),
    description: t('services.tilingDesc')
  },
  {
    icon: Layers,
    title: t('services.plastering'),
    description: t('services.plasteringDesc')
  },
  {
    icon: Square,
    title: t('services.brickwork'),
    description: t('services.brickworkDesc')
  },
  {
    icon: PaintBucket,
    title: t('services.painting'),
    description: t('services.paintingDesc')
  },
  {
    icon: Building,
    title: t('services.paving'),
    description: t('services.pavingDesc')
  },
  {
    icon: Droplets,
    title: t('services.plumbing'),
    description: t('services.plumbingDesc')
  },
  {
    icon: Hammer,
    title: t('services.carpentry'),
    description: t('services.carpentryDesc')
  },
  {
    icon: Wrench,
    title: t('services.maintenance'),
    description: t('services.maintenanceDesc')
  }
];

export default function Services() {
  const { t } = useTranslation();
  
  return (
    <section id="services" className="py-20 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h3>
          <p className="text-xl text-gray-neutral max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getServices(t).map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              data-testid={`service-card-${index}`}
            >
              <div className="text-orange-primary text-4xl mb-4">
                <service.icon className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-neutral">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
