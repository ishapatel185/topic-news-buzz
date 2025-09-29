import { NewsSubscriptionForm } from "@/components/NewsSubscriptionForm";
import { Newspaper, TrendingUp, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                NewsNotify
              </h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Personalized News Delivery
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Personal News,
              <span className="bg-gradient-hero bg-clip-text text-transparent block">
                Delivered Automatically
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stay informed with curated news updates tailored to your interests. 
              Get the latest stories delivered to your inbox every 30 minutes.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Fresh news every 30 minutes, automatically curated for your interests
              </p>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Personalized</h3>
              <p className="text-muted-foreground">
                Choose your topics and receive only the news that matters to you
              </p>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
              <Newspaper className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Curated Content</h3>
              <p className="text-muted-foreground">
                Quality articles from trusted sources, filtered and summarized
              </p>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="flex justify-center">
            <NewsSubscriptionForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 NewsNotify. Bringing you the news that matters, when it matters.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
