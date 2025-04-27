
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section  id="hero"  className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 rounded-full w-96 h-96 bg-fraud-purple/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 rounded-full w-96 h-96 bg-accent/10 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            AI-powered cheating transaction detect assistant System
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Next-Generation <span className="gradient-text">Fraud Detection</span> Made Simple
          </h1>
          
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Protect your business with our AI-powered fraud detection system. Real-time analysis, 
            higher accuracy, and fewer false positives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2">
            <Button onClick={scrollToDemo} size="lg" className="bg-fraud-purple hover:bg-fraud-purple/90">
              Try Demo
            </Button>
          </div>
          
          <div className="pt-8 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToDemo}
              aria-label="Scroll to demo"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
