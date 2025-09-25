import { Home, Wrench, PaintBucket, Hammer, Building, Layers, Square, Droplets, Drill, Grid3x3, TreePine, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const getServices = (t: any) => [
  {
    icon: Grid3x3,
    title: t('services.tiling'),
    description: t('services.tilingDesc', { returnObjects: true })
  },
  {
    icon: Wrench,
    title: t('services.plastering'),
    description: t('services.plasteringDesc', { returnObjects: true })
  },
  {
    icon: Building,
    title: t('services.brickwork'),
    description: t('services.brickworkDesc', { returnObjects: true })
  },
  {
    icon: PaintBucket,
    title: t('services.painting'),
    description: t('services.paintingDesc', { returnObjects: true })
  },
  {
    icon: Square,
    title: t('services.paving'),
    description: t('services.pavingDesc', { returnObjects: true })
  },
  {
    icon: Droplets,
    title: t('services.plumbing'),
    description: t('services.plumbingDesc', { returnObjects: true })
  },
  {
    icon: Hammer,
    title: t('services.carpentry'),
    description: t('services.carpentryDesc', { returnObjects: true })
  },
  {
    icon: Shield,
    title: t('services.maintenance'),
    description: t('services.maintenanceDesc', { returnObjects: true })
  }
];


export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-navy-primary mb-4">{t('services.title')}</h3>
          <p className="text-xl text-navy-light max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="space-y-10">
          {getServices(t).map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-navy-primary/10"
              data-testid={`service-card-${index}`}
            >
              <div className="flex-shrink-0 flex flex-col items-center justify-center p-8 bg-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="mb-4">
                  <img
                    src="/logo.png"
                    alt="Kanguya Builders Logo"
                    className="w-20 h-20 max-w-20 max-h-20 rounded-full shadow-lg border border-navy-primary/20 object-contain bg-white p-1"
                    style={{ aspectRatio: '1 / 1', display: 'block' }}
                  />
                </div>
                <h4 className="text-2xl font-bold text-black text-center">{service.title}</h4>
              </div>
              <div className="flex-1 p-8">
                {Array.isArray(service.description) ? (
                  <ul className="space-y-2">
                    {service.description.map((point: string, i: number) => {
                      // Bold section headers if present
                      if (point.startsWith('What we do:')) {
                        return <li key={i}><span className="font-semibold text-black">What we do:</span> {point.replace('What we do:', '').trim()}</li>;
                      }
                      if (point.startsWith('Process:')) {
                        return <li key={i}><span className="font-semibold text-black">Process:</span> {point.replace('Process:', '').trim()}</li>;
                      }
                      if (point.startsWith('Requirements:')) {
                        return <li key={i}><span className="font-semibold text-black">Requirements:</span> {point.replace('Requirements:', '').trim()}</li>;
                      }
                      if (point.startsWith('Time frame:')) {
                        return <li key={i}><span className="font-semibold text-black">Time frame:</span></li>;
                      }
                      // Indent time frame sub-points
                      if (point.match(/^(Small|Large|Single|Full|Minor|Larger|Standard|Full exterior|Small jobs|Large projects|Small repairs)/)) {
                        return <li key={i} className="ml-6 list-disc text-black">{point}</li>;
                      }
                      return <li key={i} className="text-black">{point}</li>;
                    })}
                  </ul>
                ) : (
                  <p className="text-navy-light">{service.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
