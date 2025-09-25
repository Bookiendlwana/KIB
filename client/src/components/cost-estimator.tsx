import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, Info, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const estimatorSchema = z.object({
  serviceType: z.string().min(1, "Please select a service"),
  area: z.number().min(1, "Area must be at least 1 square meter"),
  location: z.string().min(1, "Please enter your location"),
  complexity: z.string().min(1, "Please select complexity level"),
});

type EstimatorForm = z.infer<typeof estimatorSchema>;

// Pricing per square meter in ZAR - Affordable rates to attract all customers
const servicePricing = {
  tiling: { basic: 45, standard: 65, premium: 85 },
  plastering: { basic: 35, standard: 50, premium: 70 },
  brickwork: { basic: 55, standard: 75, premium: 95 },
  painting: { basic: 25, standard: 35, premium: 50 },
  paving: { basic: 40, standard: 60, premium: 80 },
  plumbing: { basic: 75, standard: 100, premium: 130 },
  carpentry: { basic: 60, standard: 85, premium: 110 },
  maintenance: { basic: 30, standard: 45, premium: 65 },
};

export default function CostEstimator() {
  const { t } = useTranslation();
  const [estimate, setEstimate] = useState<{
    total: number;
    serviceType: string;
    area: number;
    pricePerSqm: number;
  } | null>(null);

  const form = useForm<EstimatorForm>({
    resolver: zodResolver(estimatorSchema),
    defaultValues: {
      serviceType: "",
      area: 0,
      location: "",
      complexity: "",
    },
  });

  const onSubmit = (data: EstimatorForm) => {
    const service = servicePricing[data.serviceType as keyof typeof servicePricing];
    const complexity = data.complexity as keyof typeof service;
    const pricePerSqm = service[complexity];
    const total = data.area * pricePerSqm;

    setEstimate({
      total,
      serviceType: data.serviceType,
      area: data.area,
      pricePerSqm,
    });
  };

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA')}`;
  };

  return (
    <section className="py-20 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('costEstimator.title')}
          </h2>
          <p className="text-lg text-gray-neutral max-w-3xl mx-auto">
            {t('costEstimator.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-orange-primary" />
                  {t('costEstimator.projectDetails')}
                </CardTitle>
                <CardDescription>
                  {t('costEstimator.projectDetailsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">{t('costEstimator.serviceType')}</Label>
                    <Select
                      onValueChange={(value) => form.setValue("serviceType", value)}
                      value={form.watch("serviceType")}
                    >
                      <SelectTrigger data-testid="select-service-type">
                        <SelectValue placeholder={t('costEstimator.selectService')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tiling">{t('services.tiling')}</SelectItem>
                        <SelectItem value="plastering">{t('services.plastering')}</SelectItem>
                        <SelectItem value="brickwork">{t('services.brickwork')}</SelectItem>
                        <SelectItem value="painting">{t('services.painting')}</SelectItem>
                        <SelectItem value="paving">{t('services.paving')}</SelectItem>
                        <SelectItem value="plumbing">{t('services.plumbing')}</SelectItem>
                        <SelectItem value="carpentry">{t('services.carpentry')}</SelectItem>
                        <SelectItem value="maintenance">{t('services.maintenance')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.serviceType && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.serviceType.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">{t('costEstimator.area')}</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder={t('costEstimator.areaPlaceholder')}
                      data-testid="input-area"
                      {...form.register("area", { valueAsNumber: true })}
                    />
                    {form.formState.errors.area && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.area.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complexity">{t('costEstimator.complexity')}</Label>
                    <Select
                      onValueChange={(value) => form.setValue("complexity", value)}
                      value={form.watch("complexity")}
                    >
                      <SelectTrigger data-testid="select-complexity">
                        <SelectValue placeholder={t('costEstimator.selectComplexity')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">{t('costEstimator.basic')}</SelectItem>
                        <SelectItem value="standard">{t('costEstimator.standard')}</SelectItem>
                        <SelectItem value="premium">{t('costEstimator.premium')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.complexity && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.complexity.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t('costEstimator.location')}</Label>
                    <Input
                      id="location"
                      placeholder={t('costEstimator.locationPlaceholder')}
                      data-testid="input-location"
                      {...form.register("location")}
                    />
                    {form.formState.errors.location && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.location.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-primary hover:bg-orange-secondary"
                    data-testid="button-calculate"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    {t('costEstimator.calculate')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {estimate ? (
                <Card className="border-orange-primary/20 bg-orange-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-primary">
                      <DollarSign className="mr-2 h-5 w-5" />
                      {t('costEstimator.costEstimate')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-neutral">{t('costEstimator.serviceType')}</p>
                        <p className="font-semibold capitalize">{estimate.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-neutral">{t('costEstimator.area')}</p>
                        <p className="font-semibold">{estimate.area} m²</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-neutral">{t('costEstimator.ratePerSqm')}</p>
                        <p className="font-semibold">{formatCurrency(estimate.pricePerSqm)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-neutral">{t('costEstimator.totalEstimate')}</p>
                        <p className="text-2xl font-bold text-orange-primary">
                          {formatCurrency(estimate.total)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-5 w-5 text-blue-primary" />
                      {t('costEstimator.aboutEstimates')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-neutral mb-4">
                      {t('costEstimator.estimateDesc')}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-neutral">
                      {t('costEstimator.estimatePoints', { returnObjects: true }).map((point: string, index: number) => (
                        <li key={index}>• {point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> {t('costEstimator.importantNote')}
                </AlertDescription>
              </Alert>

              {estimate && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-semibold">{t('costEstimator.readyToStart')}</h3>
                      <p className="text-gray-neutral text-sm">
                        {t('costEstimator.contactDesc')}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          asChild
                          className="flex-1 bg-orange-primary hover:bg-orange-secondary"
                        >
                          <a href="/quote" data-testid="button-get-quote">
                            {t('costEstimator.getDetailedQuote')}
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1"
                        >
                          <a href="/contact" data-testid="button-contact-us">
                            <MapPin className="mr-2 h-4 w-4" />
                            {t('costEstimator.contactUs')}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}