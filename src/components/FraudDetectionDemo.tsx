import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TransactionForm from './TransactionForm';
import JsonEditor from './JsonEditor';
import ResultDisplay from './ResultDisplay';
import { TransactionRequest, defaultTransaction, ApiResponse } from '@/types';
import { AlertTriangle, Shield } from 'lucide-react';
import { analyzeFraudTransaction } from '@/services/api';

const FraudDetectionDemo = () => {
  const [transaction, setTransaction] = useState<TransactionRequest>(defaultTransaction);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeTransaction = async () => {
    try {
      setIsLoading(true);
      
      // Show loading toast
      const loadingToast = toast.loading("Analyzing transaction...");
      
      // Call the API
      const response = await analyzeFraudTransaction(transaction);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Set the result
      setResult(response);
      
      // Show success or warning toast based on the result
      if (response.data.is_suspicious) {
        toast.warning("Suspicious transaction detected!", {
          icon: <AlertTriangle className="h-4 w-4" />
        });
      } else {
        toast.success("Transaction appears legitimate", {
          icon: <Shield className="h-4 w-4" />
        });
      }
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      toast.error("Failed to analyze transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTransaction(defaultTransaction);
    setResult(null);
  };

  return (
    <section id="demo" className="section-spacing bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Try Our Fraud Detection Demo
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            See how our system analyzes transactions in real-time to detect potential fraud.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="form">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="form" className="space-y-4">
                    <TransactionForm 
                      transaction={transaction}
                      onTransactionChange={setTransaction}
                    />
                  </TabsContent>
                  
                  <TabsContent value="json">
                    <JsonEditor
                      transaction={transaction}
                      onTransactionChange={setTransaction}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button onClick={handleReset} variant="outline">
                    Reset
                  </Button>
                  <Button 
                    onClick={handleAnalyzeTransaction} 
                    className="bg-fraud-purple hover:bg-fraud-purple/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze Transaction'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <ResultDisplay 
              result={result} 
              isLoading={isLoading} 
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FraudDetectionDemo;
