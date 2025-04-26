
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { TransactionRequest } from '@/types';

interface JsonEditorProps {
  transaction: TransactionRequest;
  onTransactionChange: (transaction: TransactionRequest) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ 
  transaction, 
  onTransactionChange 
}) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // When the transaction prop changes, update the JSON text
  useEffect(() => {
    try {
      setJsonText(JSON.stringify(transaction, null, 2));
      setError(null);
    } catch (err) {
      setError('Error converting transaction to JSON');
    }
  }, [transaction]);

  // When the user changes the JSON text, try to parse it
  const handleJsonChange = (value: string) => {
    setJsonText(value);
    try {
      const parsedJson = JSON.parse(value);
      // Validate that all required fields are present
      const requiredFields: (keyof TransactionRequest)[] = [
        'user_id', 'amount', 'ip_address', 'currency',
        'description', 'category', 'timestamp', 'geolocation', 'device_id'
      ];
      
      const missingFields = requiredFields.filter(field => !(field in parsedJson));
      
      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }
      
      onTransactionChange(parsedJson);
      setError(null);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        className="font-mono h-[300px] resize-none"
        value={jsonText}
        onChange={(e) => handleJsonChange(e.target.value)}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default JsonEditor;
