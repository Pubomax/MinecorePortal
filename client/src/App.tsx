import { Router as WouterRouter, Switch, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatbotWidget } from "@/components/chatbot-widget";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import Pricing from "@/pages/pricing";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import BlogPost from "@/pages/blog-post";
import ServiceOperator from "@/pages/service-operator";
import ServiceExec from "@/pages/service-exec";
import Admin from "@/pages/admin";
import Analytics from "@/pages/analytics";
import GoogleAdsLanding from "@/pages/google-ads-landing";
import Download from "@/pages/download";
import DirectDownload from "@/pages/direct-download";
import Share from "@/pages/share";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/operator" component={ServiceOperator} />
      <Route path="/services/exec" component={ServiceExec} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/get-started" component={GoogleAdsLanding} />
      <Route path="/download" component={Download} />
      <Route path="/direct-download" component={DirectDownload} />
      <Route path="/share/:id" component={Share} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <WouterRouter hook={useHashLocation}>
          <div className="site-shell min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
            <ChatbotWidget />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
