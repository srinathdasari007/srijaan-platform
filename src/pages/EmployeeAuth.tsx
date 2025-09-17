import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

const EmployeeAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signInAnonymously = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo123'
      });

      if (!error) {
        navigate('/employee/dashboard');
      }
    };

    signInAnonymously();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-purple">Employee Portal</h2>
          <p className="mt-2 text-gray-600">Signing you in...</p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-purple mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAuth;