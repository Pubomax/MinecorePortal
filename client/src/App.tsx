import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
import Admin from "@/pages/admin";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";
import Download from "@/pages/download";
import Share from "@/pages/share";
import DirectDownload from "@/pages/direct-download";
import GoogleAdsLanding from "@/pages/google-ads-landing";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/consultation-gratuite" component={GoogleAdsLanding} />
      <Route path="/download" component={Download} />
      <Route path="/share" component={Share} />
      <Route path="/file/knowledge-base.pdf" component={DirectDownload} />
      <Route path="/kb.pdf" component={DirectDownload} />
      <Route path="/admin" component={Admin} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Switch>
            {/* Catch all /admin routes to hide usual layout */}
            <Route path="/admin/:rest*">
              <Admin />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            {/* Standard Website Routes */}
            <Route>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Router />
                </main>
                <Footer />
                <ChatbotWidget />
              </div>
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
