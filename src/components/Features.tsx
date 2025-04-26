
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, LineChart, Zap, Brain, Globe, Clock } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Analysis',
    description: 'Utilize advanced machine learning algorithms to detect patterns and anomalies in transactions.',
    icon: Brain,
  },
  {
    title: 'Real-Time Detection',
    description: 'Analyze transactions in milliseconds to prevent fraud before it occurs.',
    icon: Clock,
  },
  {
    title: 'Global Protection',
    description: 'Identify suspicious activities across different countries and currencies.',
    icon: Globe,
  },
  {
    title: 'Multiple Detection Methods',
    description: 'Combines traditional rule-based checks with advanced AI analysis for comprehensive protection.',
    icon: ShieldAlert,
  },
  {
    title: 'Detailed Insights',
    description: 'Get clear explanations of why transactions are flagged as suspicious.',
    icon: LineChart,
  },
  {
    title: 'Lightning Fast',
    description: 'Our system processes transactions in milliseconds with minimal impact on user experience.',
    icon: Zap,
  },
];

const Features = () => {
  return (
    <section id="features" className="section-spacing bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Advanced Features
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Our fraud detection system uses cutting-edge technology to keep your business secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border border-muted card-gradient">
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-fraud-purple" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
