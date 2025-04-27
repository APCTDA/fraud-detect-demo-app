
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiResponse, AnalysisDetail } from '@/types';
import { AlertTriangle, Check, X, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { verifyTransaction } from '@/services/api';

interface ResultDisplayProps {
  result: ApiResponse | null;
  isLoading: boolean;
  onReset: () => void;
}

// Helper to determine risk level color based on score
const getRiskColor = (score: number) => {
  if (score < 50) return 'text-fraud-low bg-fraud-low/10';
  if (score < 75) return 'text-fraud-medium bg-fraud-medium/10';
  return 'text-fraud-high bg-fraud-high/10';
};

// Helper to determine risk level label based on score
const getRiskLevel = (score: number) => {
  if (score < 50) return 'Low Risk';
  if (score < 75) return 'Medium Risk';
  return 'High Risk';
};

// Helper to determine progress bar color based on score
const getProgressColor = (score: number) => {
  if (score < 50) return 'bg-fraud-low';
  if (score < 75) return 'bg-fraud-medium';
  return 'bg-fraud-high';
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, onReset }) => {
  // If loading or no result, show appropriate content
  if (isLoading) {
    return (
      <Card className="w-full h-full min-h-[400px] animate-pulse">
        <CardHeader>
          <CardTitle className="text-center">Analyzing transaction...</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-fraud-purple rounded-full animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="w-full min-h-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Transaction Analysis</CardTitle>
          <CardDescription className="text-center">
            Submit a transaction to see fraud detection results
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <Shield className="h-16 w-16 text-muted-foreground" />
          <p className="text-center text-muted-foreground">
            Fill in the transaction details and click "Analyze Transaction" to start the fraud detection process.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Handle verification actions
  const handleVerify = async (isLegitimate: boolean) => {
    if (!result) return;
    
    try {
      // Extract transaction_id from the response
      const transactionId = result?.transaction_id;
      if (!transactionId) {
        throw new Error('Transaction ID not found');
      }

      // Show loading toast
      const loadingToast = toast.loading("Verifying transaction...");
      
      // Call verify API
      await verifyTransaction({
        user_id: "user_1", // Using default user_id as per the example
        transaction_id: transactionId,
        is_legitimate: isLegitimate
      });
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success message
      if (isLegitimate) {
        toast.success("Transaction marked as legitimate");
      } else {
        toast.error("Transaction marked as fraudulent");
      }
      
      // Reset the form after verification
      setTimeout(onReset, 1500);
    } catch (error) {
      toast.error("Failed to verify transaction");
      console.error('Error verifying transaction:', error);
    }
  };

  // Group analysis details by source
  const aiAnalysis = result.data.analysis_details.filter(detail => detail.source === 'ai');
  const traditionalAnalysis = result.data.analysis_details.filter(detail => detail.source === 'traditional');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Fraud Score Card */}
      <Card className="overflow-hidden">
        <CardHeader className={`${result.data.is_suspicious ? 'bg-fraud-high/10' : 'bg-fraud-low/10'}`}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {result.data.is_suspicious ? (
                <AlertTriangle className="h-5 w-5 text-fraud-high" />
              ) : (
                <Check className="h-5 w-5 text-fraud-low" />
              )}
              Fraud Detection Result
            </CardTitle>
            <div className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${getRiskColor(result.data.fraud_score)}`}>
              {getRiskLevel(result.data.fraud_score)}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Risk Score</span>
              <span className="text-sm font-medium">{result.data.fraud_score.toFixed(0)}%</span>
            </div>
            <Progress 
              value={result.data.fraud_score} 
              className={`h-2 [&>div]:${getProgressColor(result.data.fraud_score)}`}
            />
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">System Message:</h4>
              <p className="text-sm border-l-2 pl-3 border-fraud-purple">
                {result.data.alert.message}
              </p>
              
              <h4 className="text-sm font-medium mt-4 mb-2">Suggested Action:</h4>
              <p className="text-sm border-l-2 pl-3 border-fraud-purple">
                {result.data.suggestions}
              </p>
            </div>
            
            {result.data.is_suspicious && (
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button 
                  onClick={() => handleVerify(true)} 
                  className="flex-1 bg-fraud-low hover:bg-fraud-low/90"
                >
                  <Check className="mr-2 h-4 w-4" /> Mark as Legitimate
                </Button>
                <Button 
                  onClick={() => handleVerify(false)} 
                  variant="destructive"
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" /> Confirm as Fraud
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    
      {/* Analysis Details */}
      <Tabs defaultValue="reasons">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reasons">Key Reasons</TabsTrigger>
          <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          <TabsTrigger value="traditional">Traditional Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reasons">
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activity Reasons</CardTitle>
              <CardDescription>Key factors that contributed to the fraud score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {result.data.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 flex h-2 w-2 rounded-full bg-fraud-high" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Results from our advanced machine learning models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 rounded-md bg-muted">
                <h4 className="font-medium mb-1">AI System Message</h4>
                <p className="text-sm">{result.data.alert.details.ai_analysis.message}</p>
                <h4 className="font-medium mt-3 mb-1">Details</h4>
                <p className="text-sm">{result.data.alert.details.ai_analysis.details}</p>
                <h4 className="font-medium mt-3 mb-1">Recommendation</h4>
                <p className="text-sm">{result.data.alert.details.ai_analysis.suggestions}</p>
              </div>
              
              <div className="space-y-3">
                {aiAnalysis.map((detail, index) => (
                  <div key={index} className="flex flex-col space-y-1 p-3 border rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium capitalize">{detail.type.replace('_', ' ')}</span>
                      <span className={`${getRiskColor(detail.fraud_score)} px-2 py-0.5 rounded-full text-xs font-medium`}>
                        Score: {detail.fraud_score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{detail.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traditional">
          <Card>
            <CardHeader>
              <CardTitle>Traditional Analysis</CardTitle>
              <CardDescription>
                Results from rule-based detection systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 rounded-md bg-muted">
                <h4 className="font-medium mb-1">Traditional System Message</h4>
                <p className="text-sm">{result.data.alert.details.traditional_analysis.message}</p>
                <h4 className="font-medium mt-3 mb-1">Details</h4>
                <p className="text-sm">{result.data.alert.details.traditional_analysis.details}</p>
                <h4 className="font-medium mt-3 mb-1">Recommendation</h4>
                <p className="text-sm">{result.data.alert.details.traditional_analysis.suggestions}</p>
              </div>
              
              <div className="space-y-3">
                {traditionalAnalysis.map((detail, index) => (
                  <div key={index} className="flex flex-col space-y-1 p-3 border rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium capitalize">{detail.type.replace('_', ' ')}</span>
                      <span className={`${getRiskColor(detail.fraud_score)} px-2 py-0.5 rounded-full text-xs font-medium`}>
                        Score: {detail.fraud_score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{detail.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultDisplay;

