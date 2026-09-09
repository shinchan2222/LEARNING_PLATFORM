'use client';

import React, { useState } from 'react';
import { Internship, User } from '@/types';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Receipt, 
  ArrowRight, 
  Lock, 
  Loader2,
  Download,
  Printer
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

interface PaymentModalProps {
  internship: Internship;
  user: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  internship,
  user,
  onClose,
  onSuccess
}) => {
  const router = useRouter();
  const [gateway, setGateway] = useState<'razorpay' | 'stripe'>('razorpay');
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('intern.student@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [bank, setBank] = useState('HDFC Bank');

  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');
  const [receiptData, setReceiptData] = useState<{
    transactionId: string;
    receiptNumber: string;
    amount: number;
    method: string;
    date: string;
  } | null>(null);

  const handlePay = async () => {
    if (!user) return;
    setStep('processing');

    try {
      const selectedMethodName =
        gateway === 'razorpay'
          ? method === 'upi'
            ? `Razorpay UPI (${upiId})`
            : method === 'card'
            ? 'Razorpay Credit/Debit Card'
            : `Razorpay NetBanking (${bank})`
          : 'Stripe Instant Card Checkout (Visa)';

      // Simulate network request to payment checkout API
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipId: internship.id,
          userId: user.id,
          paymentMethod: selectedMethodName
        })
      });

      const data = await res.json();

      // Delay 1.8 seconds to display realistic payment gateway processing
      setTimeout(() => {
        if (data.success) {
          setReceiptData({
            transactionId: data.receipt.transactionId,
            receiptNumber: data.receipt.receiptNumber,
            amount: data.receipt.amount,
            method: data.receipt.method,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          });

          setStep('success');

          // Trigger confetti
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {
            console.log('Confetti effect:', e);
          }

          if (onSuccess) {
            onSuccess();
          }
        } else {
          alert('Payment simulation failed: ' + (data.error || 'Unknown error'));
          setStep('select');
        }
      }, 1800);
    } catch (err) {
      console.error('Payment checkout error:', err);
      alert('Error connecting to payment gateway.');
      setStep('select');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const goToDashboard = () => {
    onClose();
    router.push('/student');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {step === 'success' ? 'Payment Verified & Enrolled' : 'Secure Checkout Gateway'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {gateway === 'razorpay' ? 'Razorpay Certified Sandbox' : 'Stripe Verified Payment'}
              </p>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: Select Payment Method & Review */}
        {step === 'select' && (
          <div className="p-6 space-y-5">
            {/* Internship mini summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {internship.domain}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                  {internship.title}
                </h4>
                <span className="text-xs text-slate-500">Duration: {internship.durationWeeks} Weeks</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Total Tuition</span>
                <span className="text-xl font-extrabold text-slate-900">
                  {formatCurrency(internship.fee)}
                </span>
              </div>
            </div>

            {/* Frictionless Test Badge */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-900">
                  Instant Sandbox Test Mode
                </span>
              </div>
              <span className="text-[11px] text-emerald-700">
                No actual card or charge required • 1-click test enrollment
              </span>
            </div>

            {/* Gateway Brand Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Choose Gateway Provider
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGateway('razorpay')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    gateway === 'razorpay'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="text-blue-600 font-extrabold">₹</span> Razorpay Gateway
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('stripe')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    gateway === 'stripe'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="text-indigo-600 font-extrabold">$</span> Stripe Gateway
                </button>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`p-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    method === 'upi'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    method === 'card'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Debit / Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`p-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    method === 'netbanking'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Method Inputs */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              {method === 'upi' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Virtual Payment Address (VPA / UPI ID)</label>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Fast Auto-Approve
                    </span>
                  </div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="student@okhdfcbank"
                  />
                  <div className="flex gap-2 mt-2">
                    {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                      <span key={app} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === 'netbanking' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Bank</label>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white outline-none"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Chase Bank">Chase Bank</option>
                    <option value="Citibank">Citibank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Simulated 256-bit SSL encrypted sandbox transaction. Instant activation.</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              Pay {formatCurrency(internship.fee)} & Confirm Enrollment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Processing state */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center mx-auto text-indigo-600 animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Contacting Payment Gateway...</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Authorizing {formatCurrency(internship.fee)} with {gateway.toUpperCase()} banking network. Please do not refresh.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Payment Success & Receipt */}
        {step === 'success' && receiptData && (
          <div className="p-6 space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Enrollment Confirmed!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your payment was successfully authorized. Welcome to the cohort!
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-indigo-600" />
                  Official Payment Receipt
                </span>
                <span className="text-[10px] font-mono text-slate-500">{receiptData.receiptNumber}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Program:</span>
                <span className="font-semibold text-slate-900 text-right line-clamp-1 max-w-[200px]">{internship.title}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Intern Name:</span>
                <span className="font-semibold text-slate-900">{user?.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Transaction ID:</span>
                <span className="font-mono text-slate-800">{receiptData.transactionId}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Method:</span>
                <span className="text-slate-800">{receiptData.method}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Timestamp:</span>
                <span className="text-slate-800">{receiptData.date}</span>
              </div>
              <div className="flex justify-between text-slate-900 pt-2 border-t border-slate-200 font-bold text-sm">
                <span>Amount Paid:</span>
                <span className="text-emerald-600">{formatCurrency(receiptData.amount)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={goToDashboard}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                Go to My Student Workspace
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrint}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save Payment Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
