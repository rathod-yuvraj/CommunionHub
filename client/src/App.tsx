import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import EventsPage from "@/pages/events";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/events" component={EventsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
