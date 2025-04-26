
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-fraud-purple" />
          <span className="text-xl font-bold">FraudShield</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-fraud-purple">
            Features
          </a>
          <a href="#demo" className="text-sm font-medium transition-colors hover:text-fraud-purple">
            Demo
          </a>
          <a href="#about" className="text-sm font-medium transition-colors hover:text-fraud-purple">
            About
          </a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Documentation
          </Button>
          <Button size="sm" className="bg-fraud-purple hover:bg-fraud-purple/90">
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
