
// Transaction request type
export interface TransactionRequest {
  user_id: string;
  amount: number;
  ip_address: string;
  currency: string;
  description: string;
  category: string;
  timestamp: string;
  geolocation: string;
  device_id: string;
}
const getLocalISOString = () => {
  const date = new Date();
  return date.getFullYear() +
      '-' + String(date.getMonth() + 1).padStart(2, '0') +
      '-' + String(date.getDate()).padStart(2, '0') +
      'T' + String(date.getHours()).padStart(2, '0') +
      ':' + String(date.getMinutes()).padStart(2, '0') +
      ':' + String(date.getSeconds()).padStart(2, '0');
};

// Default transaction for initial state
export const defaultTransaction: TransactionRequest = {
  user_id: "user_1",
  amount: 100000,
  ip_address: "203.160.89.123",
  currency: "VND",
  description: "Buy ticket",
  category: "Entertainment",
  timestamp: getLocalISOString(),
  geolocation: "Vietnam",
  device_id: "mobile-ios-1"
};

// Analysis detail from response
export interface AnalysisDetail {
  fraud_score: number;
  message: string;
  source: string;
  type: string;
}

// Alert analysis sections
export interface AlertAnalysis {
  details: string;
  is_alert: boolean;
  message: string;
  suggestions: string;
}

// Alert details structure
export interface AlertDetails {
  ai_analysis: AlertAnalysis;
  traditional_analysis: AlertAnalysis;
}

// Alert structure in response
export interface Alert {
  details: AlertDetails;
  is_alert: boolean;
  message: string;
  suggestions: string;
}

// Response data structure
export interface ResponseData {
  alert: Alert;
  analysis_details: AnalysisDetail[];
  fraud_score: number;
  is_suspicious: boolean;
  reasons: string[];
  suggestions: string;
}

// Full API response structure
export interface ApiResponse {
  data: ResponseData;
  status: string;
}
