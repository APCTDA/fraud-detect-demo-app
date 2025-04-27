
import { TransactionRequest, ApiResponse } from '@/types';

const API_URL = 'http://localhost:8000';

export const analyzeFraudTransaction = async (transaction: TransactionRequest): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/process-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing transaction:', error);
    throw error;
  }
};

interface VerifyTransactionRequest {
  user_id: string;
  transaction_id: string;
  is_legitimate: boolean;
}

export const verifyTransaction = async (data: VerifyTransactionRequest): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/verify-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to verify transaction');
    }
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw error;
  }
};

