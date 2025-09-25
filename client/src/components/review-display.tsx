import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Review } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ThumbsUp, Calendar } from "lucide-react";

export function ReviewDisplay() {
  const { t } = useTranslation();
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews/approved"],
  });

  const renderStars = (rating: string) => {
    const numRating = parseInt(rating);
    return (
      <div className="flex gap-1" data-testid={`stars-${rating}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= numRating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const getServiceBadgeColor = (service: string) => {
    const colors: { [key: string]: string } = {
      brickwork: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      plumbing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      carpentry: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      plastering: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      tiling: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      landscaping: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      painting: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
    };
    return colors[service] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="reviews-loading">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="text-center py-12" data-testid="no-reviews">
        <CardContent>
          <div className="text-gray-500 dark:text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('reviews.noReviews')}</h3>
            <p>{t('reviews.noReviewsDesc')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageRating = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <Card className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/20 dark:to-blue-900/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2" data-testid="average-rating-stars">
              {renderStars(Math.round(averageRating).toString())}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t('reviews.basedOn')} {reviews.length} {reviews.length === 1 ? t('reviews.customerReview') : t('reviews.customerReviews')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4" data-testid="reviews-list">
        {reviews.map((review, index) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow" data-testid={`review-${index}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold text-lg text-blue-900 dark:text-blue-100">
                    {review.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {review.customerName}
                    </span>
                    {review.projectLocation && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {review.projectLocation}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  {renderStars(review.rating)}
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {review.review}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={getServiceBadgeColor(review.serviceUsed)}>
                  {review.serviceUsed}
                </Badge>
                
                {review.recommendToOthers === "yes" && (
                  <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-400 dark:border-green-600">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {t('reviews.recommends', 'Recommends')}
                  </Badge>
                )}
              </div>

              {review.recommendToOthers === "yes" && (
                <div className="text-sm text-green-700 dark:text-green-400 font-medium">
                  ✓ {t('reviews.wouldRecommend', 'Would recommend')} {t('common.companyName')} {t('reviews.toOthers', 'to others')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}