import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Video, Play, X, ChevronLeft, ChevronRight, Images } from "lucide-react";

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  category: string;
}

export default function Gallery() {
  const { t } = useTranslation();
  
  const galleryItems: GalleryItem[] = [
    { id: '1', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.21_1_1756736427418.jpeg', title: t('gallery.items.constructionProgress'), category: t('gallery.categories.buildingWork') },
    { id: '2', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.22_1_1756736427415.jpeg', title: t('gallery.items.foundationWork'), category: t('gallery.categories.buildingWork') },
    { id: '3', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.22_1756736427417.jpeg', title: t('gallery.items.structuralWork'), category: t('gallery.categories.buildingWork') },
    { id: '4', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.23_1_1756736427414.jpeg', title: t('gallery.items.interiorWork'), category: t('gallery.categories.renovations') },
    { id: '5', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.23_2_1756736427413.jpeg', title: t('gallery.items.finishingWork'), category: t('gallery.categories.renovations') },
    { id: '6', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.23_1756736427414.jpeg', title: t('gallery.items.qualityCraftsmanship'), category: t('gallery.categories.buildingWork') },
    { id: '7', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.24_1_1756736427411.jpeg', title: t('gallery.items.detailWork'), category: t('gallery.categories.renovations') },
    { id: '8', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.24_2_1756736427410.jpeg', title: t('gallery.items.professionalInstallation'), category: t('gallery.categories.buildingWork') },
    { id: '9', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.24_1756736427413.jpeg', title: t('gallery.items.constructionSite'), category: t('gallery.categories.buildingWork') },
    { id: '10', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.25_1_1756736427408.jpeg', title: t('gallery.items.projectCompletion'), category: t('gallery.categories.buildingWork') },
    { id: '11', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.26_1756736427407.jpeg', title: t('gallery.items.finalTouches'), category: t('gallery.categories.renovations') },
    { id: '12', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.28_1_1756736058558.jpeg', title: t('gallery.items.qualityResults'), category: t('gallery.categories.renovations') },
    { id: '13', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.28_2_1756736058556.jpeg', title: t('gallery.items.professionalWork'), category: t('gallery.categories.buildingWork') },
    { id: '14', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.28_1756736058560.jpeg', title: t('gallery.items.constructionDetails'), category: t('gallery.categories.buildingWork') },
    { id: '15', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.29_1_1756736023311.jpeg', title: t('gallery.items.renovationWork'), category: t('gallery.categories.renovations') },
    { id: '16', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.29_1757330687485.jpeg', title: t('gallery.items.buildingProgress'), category: t('gallery.categories.buildingWork') },
    { id: '17', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.30_1_1756736023309.jpeg', title: t('gallery.items.qualityFinish'), category: t('gallery.categories.renovations') },
    { id: '18', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.30_1756736023310.jpeg', title: t('gallery.items.completedWork'), category: t('gallery.categories.renovations') },
    { id: '19', type: 'video', src: '/attached_assets/WhatsApp Video 2025-08-26 at 20.10.27_1757330668549.mp4', title: t('gallery.items.constructionProcess'), category: t('gallery.categories.buildingWork') },
    { id: '20', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.10_1_1756736058564.jpeg', title: t('gallery.items.constructionProgress'), category: t('gallery.categories.buildingWork') },
    { id: '21', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.10_2_1756736058564.jpeg', title: t('gallery.items.foundationWork'), category: t('gallery.categories.buildingWork') },
    { id: '22', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.10_1_1756736427424.jpeg', title: t('gallery.items.structuralWork'), category: t('gallery.categories.buildingWork') },
    { id: '23', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.10_2_1756736427423.jpeg', title: t('gallery.items.interiorWork'), category: t('gallery.categories.renovations') },
    { id: '24', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.12_1_1756736427422.jpeg', title: t('gallery.items.finishingWork'), category: t('gallery.categories.renovations') },
    { id: '25', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.12_1756736058563.jpeg', title: t('gallery.items.qualityCraftsmanship'), category: t('gallery.categories.buildingWork') },
    { id: '26', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.12_1756736427422.jpeg', title: t('gallery.items.detailWork'), category: t('gallery.categories.renovations') },
    { id: '27', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.13_1756736427421.jpeg', title: t('gallery.items.professionalInstallation'), category: t('gallery.categories.buildingWork') },
    { id: '28', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.15_1_1756736427420.jpeg', title: t('gallery.items.constructionSite'), category: t('gallery.categories.buildingWork') },
    { id: '29', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.15_1756736427420.jpeg', title: t('gallery.items.projectCompletion'), category: t('gallery.categories.buildingWork') },
    { id: '30', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.21_1_1757330687489.jpeg', title: t('gallery.items.finalTouches'), category: t('gallery.categories.renovations') },
    { id: '31', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.22_1_1757330687489.jpeg', title: t('gallery.items.qualityResults'), category: t('gallery.categories.renovations') },
    { id: '32', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.22_1757330687489.jpeg', title: t('gallery.items.professionalWork'), category: t('gallery.categories.buildingWork') },
    { id: '33', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.28_2_1757330687485.jpeg', title: t('gallery.items.constructionDetails'), category: t('gallery.categories.buildingWork') },
    { id: '34', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.29_1_1757330687484.jpeg', title: t('gallery.items.renovationWork'), category: t('gallery.categories.buildingWork') },
    { id: '35', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.29_1757330687485.jpeg', title: t('gallery.items.buildingProgress'), category: t('gallery.categories.buildingWork') },
    { id: '36', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.30_1_1757330687484.jpeg', title: t('gallery.items.qualityFinish'), category: t('gallery.categories.renovations') },
    { id: '37', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.30_1757330687484.jpeg', title: t('gallery.items.completedWork'), category: t('gallery.categories.renovations') },
    { id: '38', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.31_1_1756736023306.jpeg', title: t('gallery.items.constructionProcess'), category: t('gallery.categories.buildingWork') },
    { id: '39', type: 'image', src: '/attached_assets/WhatsApp_Image_2025_08_26_at_20.10.31_1756736023307.jpeg', title: t('gallery.items.detailWork'), category: t('gallery.categories.renovations') },
  ];

  const categories = [t('gallery.categories.all'), t('gallery.categories.buildingWork'), t('gallery.categories.renovations')];
  const [selectedCategory, setSelectedCategory] = useState(t('gallery.categories.all'));
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = selectedCategory === t('gallery.categories.all') 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-navy-primary text-white p-4 rounded-full">
              <Camera className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('gallery.title', 'Project Gallery')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('gallery.subtitle', 'Explore our portfolio of completed projects. See the quality craftsmanship and attention to detail that sets Kanguya Builders apart.')}
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? "bg-navy-primary text-white" 
                    : "border-navy-primary text-navy-primary hover:bg-navy-primary hover:text-white"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-card border border-border"
              onClick={() => openModal(item)}
              data-testid={`gallery-item-${item.id}`}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-64 bg-slate-200 flex items-center justify-center">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <Play className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 mb-1">
                  {item.type === 'image' ? (
                    <Camera className="w-4 h-4" />
                  ) : (
                    <Video className="w-4 h-4" />
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full-size view */}
        <Dialog open={!!selectedItem} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            <DialogHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-2">
                    {selectedItem?.type === 'image' ? (
                      <Camera className="w-5 h-5" />
                    ) : (
                      <Video className="w-5 h-5" />
                    )}
                    {selectedItem?.title}
                  </DialogTitle>
                  <Badge variant="secondary" className="mt-1">
                    {selectedItem?.category}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={closeModal}
                  className="h-8 w-8"
                  data-testid="close-modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="relative">
              {selectedItem?.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <video
                  src={selectedItem?.src}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] object-contain"
                  data-testid="video-player"
                />
              )}

              {/* Navigation arrows */}
              {filteredItems.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    data-testid="previous-item"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    data-testid="next-item"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {filteredItems.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card p-8 rounded-xl border border-border max-w-2xl mx-auto">
            <Images className="w-12 h-12 text-navy-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {t('gallery.cta.title', 'Ready to Start Your Project?')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('gallery.cta.subtitle', 'Let us create something amazing for you too. Get in touch for a free consultation and quote.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  const element = document.getElementById('quote');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-navy-primary hover:bg-navy-primary/90 text-white"
                data-testid="gallery-get-quote"
              >
                {t('gallery.cta.quote', 'Get Free Quote')}
              </Button>
              <Button
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="border-navy-primary text-navy-primary hover:bg-navy-primary hover:text-white"
                data-testid="gallery-contact"
              >
                {t('gallery.cta.contact', 'Contact Us')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}