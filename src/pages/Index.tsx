
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FraudDetectionDemo from '@/components/FraudDetectionDemo';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <FraudDetectionDemo />
      
      <footer className="bg-muted mt-12 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">FraudShield</h3>
              <p className="text-sm text-muted-foreground">
                Advanced Fraud Detection System
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FraudShield. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
