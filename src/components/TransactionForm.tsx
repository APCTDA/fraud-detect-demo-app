import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransactionRequest } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransactionFormProps {
  transaction: TransactionRequest;
  onTransactionChange: (transaction: TransactionRequest) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  onTransactionChange,
}) => {
  // Helper function to handle form field changes
  const handleChange = (field: keyof TransactionRequest, value: string | number) => {
    onTransactionChange({
      ...transaction,
      [field]: value,
    });
  };

  // Predefined locations
  const commonLocations = [
    'USA',
    'Vietnam',
    'Japan',
    'Singapore',
    'Taiwan'
  ];

  // Categories for the dropdown
  const categories = [
    'entertainment',
    'luxury',
    'travel',
    'investment',
    'gambling',
    'services',
    'shopping',
    'food',
    'transportation',
    'health',
  ];

  // Currencies for the dropdown
  const currencies = ['VND', 'TWD', 'USD', 'EUR', 'JPY'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="user_id">User ID</Label>
        <Input
          id="user_id"
          value={transaction.user_id}
          onChange={(e) => handleChange('user_id', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={transaction.amount}
          onChange={(e) => handleChange('amount', Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select 
          value={transaction.currency}
          onValueChange={(value) => handleChange('currency', value)}
        >
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ip_address">IP Address</Label>
        <Input
          id="ip_address"
          value={transaction.ip_address}
          onChange={(e) => handleChange('ip_address', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="geolocation">Geolocation</Label>
        <div className="flex gap-2">
          <Input
            id="geolocation"
            value={transaction.geolocation}
            onChange={(e) => handleChange('geolocation', e.target.value)}
            className="flex-1"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {commonLocations.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => handleChange('geolocation', location)}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="device_id">Device ID</Label>
        <Input
          id="device_id"
          value={transaction.device_id}
          onChange={(e) => handleChange('device_id', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          value={transaction.category}
          onValueChange={(value) => handleChange('category', value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timestamp">Timestamp</Label>
        <Input
          id="timestamp"
          type="datetime-local"
          value={transaction.timestamp.split('T')[0] + 'T' + transaction.timestamp.split('T')[1].substring(0, 5)}
          onChange={(e) => handleChange('timestamp', e.target.value + ':00')}
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={transaction.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
    </div>
  );
};

export default TransactionForm;
