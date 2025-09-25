import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiYoutube } from "react-icons/si";

import type { InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact-messages", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: t('common.success'),
        description: data.message,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
    },
    onError: (error: any) => {
      toast({
        title: t('common.error'),
        description: error.message || t('common.error'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    submitContactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">{t('contact.title')}</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-navy-primary text-white p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contact.phone')}</h4>
                    <p className="text-muted-foreground">{t('contact.phoneDescription')}</p>
                  </div>
                </div>
                <a 
                  href="tel:+27790562847" 
                  className="text-navy-primary hover:text-navy-secondary font-medium"
                  data-testid="contact-phone"
                >
                  +27 79 056 2847
                </a>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-green-600 text-white p-3 rounded-full mr-4">
                    <SiWhatsapp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contact.whatsapp')}</h4>
                    <p className="text-muted-foreground">{t('contact.whatsappDescription')}</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/27790562847?text=Hi%20Kanguya%20Builders!%20I%27m%20interested%20in%20your%20construction%20services." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium flex items-center"
                  data-testid="contact-whatsapp"
                >
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white p-3 rounded-full mr-4">
                    <SiFacebook className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contact.facebook')}</h4>
                    <p className="text-muted-foreground">{t('contact.facebookDescription')}</p>
                  </div>
                </div>
                <a 
                  href="https://www.facebook.com/profile.php?id=61580674452616" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  data-testid="contact-facebook"
                >
                  <SiFacebook className="mr-2 h-4 w-4" />
                  Kanguya Builders
                </a>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-navy-primary text-white p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contact.email')}</h4>
                    <p className="text-muted-foreground">{t('contact.emailDescription')}</p>
                  </div>
                </div>
                <a
                  href="mailto:Kanguyabuilders@gmail.com"
                  className="text-navy-primary hover:text-navy-secondary font-medium"
                  data-testid="contact-email"
                >
                  Kanguyabuilders@gmail.com
                </a>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-600 text-white p-3 rounded-full mr-4">
                      <SiYoutube className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">YouTube</h4>
                      <p className="text-muted-foreground">Watch our latest videos and project showcases on our YouTube channel.</p>
                    </div>
                  </div>
                  <a 
                    href="https://www.youtube.com/@KanguyaBuilders" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium flex items-center"
                    data-testid="contact-youtube"
                  >
                    <SiYoutube className="mr-2 h-4 w-4" />
                    Kanguya Builders
                  </a>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-navy-primary text-white p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contact.address')}</h4>
                    <p className="text-muted-foreground">{t('contact.addressDescription')}</p>
                  </div>
                </div>
                <p className="text-foreground mb-4">
                  21 Church Street, Langa, Cape Town 7455
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>{t('contact.hours')}:</strong><br />
                  {t('contact.mondayFriday')}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-xl border border-border">
              <h4 className="text-2xl font-bold text-foreground mb-6">{t('contact.send')}</h4>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.name')} *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-contact-name" />
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
                          <FormLabel>{t('contact.email')} *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-contact-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.subject')} *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-contact-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')} *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5} 
                            className="resize-none" 
                            {...field} 
                            data-testid="textarea-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-navy-primary hover:bg-navy-secondary text-white px-8 py-3"
                    disabled={submitContactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {submitContactMutation.isPending ? t('common.loading') : t('contact.send')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
