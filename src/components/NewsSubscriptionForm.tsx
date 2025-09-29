import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Sparkles, Clock, CheckCircle } from "lucide-react";

const subscriptionSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  news_topic: z.string().trim().min(2, "Topic must be at least 2 characters").max(100, "Topic must be less than 100 characters"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export function NewsSubscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
      news_topic: "",
    },
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("news_subscriptions")
        .insert([{
          name: data.name,
          email: data.email,
          news_topic: data.news_topic,
        }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed!",
            description: "You're already subscribed to this topic. Check your email for updates.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "Successfully subscribed!",
          description: "You'll receive personalized news updates every 30 minutes.",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="w-full max-w-md bg-gradient-subtle border-border/50 shadow-elegant">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="w-16 h-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">You're all set!</h3>
          <p className="text-muted-foreground mb-6">
            Welcome to your personalized news experience. You'll receive updates every 30 minutes.
          </p>
          <Button 
            variant="ghost" 
            onClick={() => setIsSubscribed(false)}
            className="text-primary hover:text-primary/80"
          >
            Subscribe to another topic
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-gradient-subtle border-border/50 shadow-elegant">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Stay Informed
        </CardTitle>
        <p className="text-muted-foreground">
          Get personalized news updates delivered to your inbox every 30 minutes
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Real-time Updates</p>
            <p className="text-muted-foreground">Fresh news every 30 minutes</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name"
                      className="bg-background border-border focus:border-primary"
                      {...field}
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
                  <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-background border-border focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="news_topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">News Topic</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Technology, Sports, Politics"
                      className="bg-background border-border focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground text-xs">
                    Choose any topic you're interested in following
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Subscribe to News Updates
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to receive news updates. Unsubscribe anytime.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}