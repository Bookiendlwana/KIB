import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { insertQuoteRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { InsertQuoteRequest } from "@shared/schema";

export default function QuoteForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCustomBudget, setShowCustomBudget] = useState(false);
  
  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      projectType: "",
      budget: "",
      location: "",
      description: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const response = await apiRequest("POST", "/api/quote-requests", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: t('quote.toast.success'),
        description: data.message,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
    },
    onError: (error: any) => {
      toast({
        title: t('common.error'),
        description: error.message || t('quote.toast.error'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    submitQuoteMutation.mutate(data);
  };

  return (
    <section id="quote" className="py-20 bg-blue-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-12">
            <h3 className="text-4xl font-bold mb-4">{t('quote.title')}</h3>
            <p className="text-xl text-blue-100">
              {t('quote.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quote.form.fullName')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('quote.form.fullNamePlaceholder')} 
                          {...field} 
                          data-testid="input-full-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quote.form.phoneNumber')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('quote.form.phoneNumberPlaceholder')} 
                          {...field} 
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quote.form.emailAddress')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={t('quote.form.emailAddressPlaceholder')} 
                          {...field} 
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quote.form.projectType')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-project-type">
                            <SelectValue placeholder={t('quote.form.selectProjectType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new-construction">{t('quote.form.projectTypes.newConstruction')}</SelectItem>
                          <SelectItem value="renovation">{t('quote.form.projectTypes.renovation')}</SelectItem>
                          <SelectItem value="interior-exterior">{t('quote.form.projectTypes.interiorExterior')}</SelectItem>
                          <SelectItem value="maintenance">{t('quote.form.projectTypes.maintenance')}</SelectItem>
                          <SelectItem value="commercial">{t('quote.form.projectTypes.commercial')}</SelectItem>
                          <SelectItem value="other">{t('quote.form.projectTypes.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quote.form.budgetRange')}</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setShowCustomBudget(value === "custom");
                        }} 
                        defaultValue={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-budget">
                            <SelectValue placeholder={t('quote.form.selectBudgetRange')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-5k">{t('quote.form.budgetRanges.under5k')}</SelectItem>
                          <SelectItem value="5k-15k">{t('quote.form.budgetRanges.5k15k')}</SelectItem>
                          <SelectItem value="15k-30k">{t('quote.form.budgetRanges.15k30k')}</SelectItem>
                          <SelectItem value="30k-50k">{t('quote.form.budgetRanges.30k50k')}</SelectItem>
                          <SelectItem value="50k-100k">{t('quote.form.budgetRanges.50k100k')}</SelectItem>
                          <SelectItem value="over-100k">{t('quote.form.budgetRanges.over100k')}</SelectItem>
                          <SelectItem value="custom">{t('quote.form.budgetRanges.custom')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showCustomBudget && (
                  <div className="space-y-2">
                    <label htmlFor="customBudget" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t('quote.form.enterBudget')}
                    </label>
                    <Input
                      id="customBudget"
                      type="number"
                      placeholder={t('quote.form.enterAmountPlaceholder')}
                      data-testid="input-custom-budget"
                      className="mt-1"
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quote.form.location')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('quote.form.locationPlaceholder')} 
                          {...field} 
                          data-testid="input-location"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('quote.form.projectDescription')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder={t('quote.form.projectDescriptionPlaceholder')} 
                            className="resize-none" 
                            {...field} 
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-primary hover:bg-orange-secondary text-white py-4 text-lg font-semibold"
                    disabled={submitQuoteMutation.isPending}
                    data-testid="button-submit-quote"
                  >
                    {submitQuoteMutation.isPending ? t('common.submitting') : t('quote.form.submitButton')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
