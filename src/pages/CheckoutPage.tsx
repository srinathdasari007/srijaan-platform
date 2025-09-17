import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Ban as Bank, QrCode } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workshop = location.state?.workshop;
  
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Workshop not found</h2>
          <button
            onClick={() => navigate('/workshops')}
            className="text-brand-purple hover:text-brand-magenta"
          >
            Return to Workshops
          </button>
        </div>
      </div>
    );
  }

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <QrCode className="w-6 h-6" />,
      description: 'Pay using any UPI app (GPay, PhonePe, Paytm, etc.)'
    },
    {
      id: 'card',
      name: 'Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Credit/Debit Cards (Visa, Mastercard, RuPay)'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Bank className="w-6 h-6" />,
      description: 'All major Indian banks supported'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Paytm, PhonePe, Amazon Pay'
    }
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      // Navigate to success page or show success message
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Workshop Summary */}
          <div className="bg-brand-purple p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Checkout</h1>
            <p className="text-white/80">Complete your registration for</p>
            <h2 className="text-xl font-semibold mt-2">{workshop.title}</h2>
          </div>

          <div className="p-6">
            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Workshop Fee</span>
                  <span>₹{workshop.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(workshop.price * 0.18)}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{Math.round(workshop.price * 1.18)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <form onSubmit={handlePayment}>
              <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-brand-purple bg-brand-purple/5'
                        : 'border-gray-200 hover:border-brand-purple/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        selectedMethod === method.id
                          ? 'bg-brand-purple text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={!selectedMethod || loading}
                className={`mt-8 w-full py-3 px-6 rounded-full font-medium text-white
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-brand-purple hover:bg-brand-magenta'
                  } transition-colors duration-300`}
              >
                {loading ? 'Processing...' : `Pay ₹${Math.round(workshop.price * 1.18)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;