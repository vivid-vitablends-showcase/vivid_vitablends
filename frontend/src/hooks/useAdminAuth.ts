import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { loginAdmin } from '@/services/api/adminApiClient';
import type { LoginCredentials } from '@/types/admin';

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginAdmin(credentials);
      sessionStorage.setItem('adminToken', response.data.token);
      sessionStorage.setItem('adminAuth', 'true');
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${response.data.user.username}.`,
      });
      
      navigate('/sys-admin-dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
