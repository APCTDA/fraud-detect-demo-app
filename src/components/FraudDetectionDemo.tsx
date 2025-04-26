
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

const FraudDetectionDemo = () => {
  const [transaction, setTransaction] = useState<TransactionRequest>(defaultTransaction);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeTransaction = async () => {
    try {
      setIsLoading(true);
      
      // Show loading toast
      const loadingToast = toast.loading("Analyzing transaction...");
      
      // For the demo, we'll simulate an API call
      const simulateApiCall = async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // This is the sample response from your provided data
        const mockResponse: ApiResponse = {
          data: {
            alert: {
              details: {
                ai_analysis: {
                  details: "Transaction conducted from an unrecognized device and location with a high transaction amount.",
                  is_alert: true,
                  message: "Potential fraud activity detected.",
                  suggestions: "Consider blocking this transaction until further verification."
                },
                traditional_analysis: {
                  details: "New location: USA has never appeared in history, New IP: 45.67.89.123 has never appeared in history, Amount (1000000) is higher than normal threshold (300000.00), New product category: Entertainment, New device: mobile-ios-1",
                  is_alert: true,
                  message: "Suspicious transaction detected",
                  suggestions: "Verify transaction with user"
                }
              },
              is_alert: true,
              message: "Suspicious transaction detected by multiple methods",
              suggestions: "Verify transaction with user and consider additional security measures"
            },
            analysis_details: [
              {
                fraud_score: 90,
                message: "Transaction amount exceeds normal thresholds for this account.",
                source: "ai",
                type: "amount_check"
              },
              {
                fraud_score: 90.0,
                message: "Amount (1000000) is higher than normal threshold (300000.00)",
                source: "traditional",
                type: "amount"
              },
              {
                fraud_score: 80,
                message: "Transaction from an unusual geographic location.",
                source: "ai",
                type: "location_check"
              },
              {
                fraud_score: 70,
                message: "Transaction initiated from a new device.",
                source: "ai",
                type: "device_check"
              },
              {
                fraud_score: 70.0,
                message: "New location: USA has never appeared in history",
                source: "traditional",
                type: "geolocation"
              },
              {
                fraud_score: 70.0,
                message: "New IP: 45.67.89.123 has never appeared in history",
                source: "traditional",
                type: "ip_address"
              },
              {
                fraud_score: 60.0,
                message: "New device: mobile-ios-1",
                source: "traditional",
                type: "device"
              },
              {
                fraud_score: 50.0,
                message: "New product category: Entertainment",
                source: "traditional",
                type: "category"
              },
              {
                fraud_score: 50.0,
                message: "Machine learning model detected potential fraud",
                source: "traditional",
                type: "ml_model"
              }
            ],
            fraud_score: 84.0,
            is_suspicious: true,
            reasons: [
              "New IP: 45.67.89.123 has never appeared in history",
              "Amount (1000000) is higher than normal threshold (300000.00)",
              "New product category: Entertainment",
              "New device: mobile-ios-1",
              "Transaction from an unusual geographic location.",
              "New location: USA has never appeared in history",
              "Transaction amount exceeds normal thresholds for this account.",
              "Transaction initiated from a new device.",
              "Transaction amount is significantly high and from an unusual location and device."
            ],
            suggestions: "Contact user for confirmation and verify the legitimacy of the transaction."
          },
          status: "success"
        };
        
        // Dynamically update some fields based on the input
        mockResponse.data.analysis_details = mockResponse.data.analysis_details.map(detail => {
          if (detail.type === 'amount' || detail.type === 'amount_check') {
            return {
              ...detail,
              message: detail.message.replace('1000000', transaction.amount.toString())
            };
          }
          if (detail.type === 'geolocation' || detail.type === 'location_check') {
            return {
              ...detail,
              message: detail.message.replace('USA', transaction.geolocation)
            };
          }
          if (detail.type === 'device' || detail.type === 'device_check') {
            return {
              ...detail,
              message: detail.message.replace('mobile-ios-1', transaction.device_id)
            };
          }
          if (detail.type === 'ip_address') {
            return {
              ...detail,
              message: detail.message.replace('45.67.89.123', transaction.ip_address)
            };
          }
          if (detail.type === 'category') {
            return {
              ...detail,
              message: detail.message.replace('Entertainment', transaction.category)
            };
          }
          return detail;
        });
        
        // Update traditional analysis details
        mockResponse.data.alert.details.traditional_analysis.details = 
          mockResponse.data.alert.details.traditional_analysis.details
            .replace('USA', transaction.geolocation)
            .replace('45.67.89.123', transaction.ip_address)
            .replace('1000000', transaction.amount.toString())
            .replace('Entertainment', transaction.category)
            .replace('mobile-ios-1', transaction.device_id);
            
        // Update reasons array
        mockResponse.data.reasons = mockResponse.data.reasons.map(reason => {
          return reason
            .replace('45.67.89.123', transaction.ip_address)
            .replace('1000000', transaction.amount.toString())
            .replace('Entertainment', transaction.category)
            .replace('mobile-ios-1', transaction.device_id)
            .replace('USA', transaction.geolocation);
        });
        
        return mockResponse;
      };
      
      // Simulate fetching data from the API
      const response = await simulateApiCall();
      
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
