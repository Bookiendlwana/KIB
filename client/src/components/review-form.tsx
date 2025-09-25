import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { insertReviewSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const reviewFormSchema = insertReviewSchema.extend({
  rating: z.string().min(1, "Please select a rating"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  review: z.string().min(20, "Review must be at least 20 characters"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
  serviceUsed: z.string().min(1, "Please select the service used"),
  recommendToOthers: z.string().min(1, "Please select if you would recommend us")
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  onSuccess?: () => void;
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      rating: "",
      title: "",
      review: "",
      serviceUsed: "",
      projectLocation: "",
      recommendToOthers: ""
    },
  });

  const createReview = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      toast({
        title: t('reviewForm.success.title'),
        description: data.message || t('reviewForm.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews/approved"] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: t('reviewForm.error.title'),
        description: error.message || t('reviewForm.error.description'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    createReview.mutate(data);
  };

  const renderStarRating = () => {
    const rating = parseInt(form.watch("rating")) || 0;
    return (
      <div className="flex gap-1" data-testid="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => form.setValue("rating", star.toString())}
            className={`text-2xl ${
              star <= rating 
                ? "text-yellow-400" 
                : "text-gray-300 dark:text-gray-600"
            } hover:text-yellow-300 transition-colors`}
            data-testid={`star-${star}`}
          >
            <Star fill="currentColor" />
          </button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              {t('reviewForm.success.title')}
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              {t('reviewForm.success.message')}
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600"
              data-testid="button-submit-another"
            >
              {t('reviewForm.success.submitAnother')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          {t('reviewForm.title')}
        </CardTitle>
        <CardDescription>
          {t('reviewForm.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('reviewForm.form.fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('reviewForm.form.fullNamePlaceholder')} {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('reviewForm.form.emailAddress')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t('reviewForm.form.emailPlaceholder')} {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewForm.form.phoneNumber')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('reviewForm.form.phonePlaceholder')} {...field} value={field.value || ""} data-testid="input-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="serviceUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('reviewForm.form.serviceUsed')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-service">
                          <SelectValue placeholder={t('reviewForm.form.serviceUsedPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="brickwork">Brickwork</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="plastering">Plastering</SelectItem>
                        <SelectItem value="paving">Paving</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="roofing">Roofing</SelectItem>
                        <SelectItem value="drywalls">Drywalls</SelectItem>
                        <SelectItem value="skimming">Skimming</SelectItem>
                        <SelectItem value="tiling">Tiling</SelectItem>
                        <SelectItem value="landscaping">Landscaping</SelectItem>
                        <SelectItem value="waterproofing">Waterproofing</SelectItem>
                        <SelectItem value="maintenance">General Maintenance</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="construction">New Construction</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('reviewForm.form.projectLocation')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('reviewForm.form.locationPlaceholder')} {...field} value={field.value || ""} data-testid="input-location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewForm.form.overallRating')}</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {renderStarRating()}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {field.value && `${field.value} star${parseInt(field.value) !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewForm.form.reviewTitle')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('reviewForm.form.reviewTitlePlaceholder')} {...field} data-testid="input-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewForm.form.yourReview')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('reviewForm.form.reviewPlaceholder')}
                      className="min-h-[120px]"
                      {...field}
                      data-testid="textarea-review"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendToOthers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewForm.form.recommendQuestion')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-recommend">
                        <SelectValue placeholder={t('reviewForm.form.recommendPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I would recommend them</SelectItem>
                      <SelectItem value="maybe">Maybe, with some reservations</SelectItem>
                      <SelectItem value="no">No, I would not recommend them</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={createReview.isPending}
              className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
              data-testid="button-submit-review"
            >
              {createReview.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Review...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Review
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}