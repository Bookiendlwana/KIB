import { useTranslation } from "react-i18next";
import { ReviewDisplay } from "@/components/review-display";
import { Star, Users2 } from "lucide-react";

export default function Reviews() {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-navy-primary text-white p-4 rounded-full">
              <Star className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <Users2 className="w-12 h-12 text-navy-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {t('reviews.authentic.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('reviews.authentic.description')}
              </p>
            </div>
          </div>

          <ReviewDisplay />
        </div>
      </div>
    </section>
  );
}