'use client';

import React, { useState, useRef } from 'react';

export default function OTPPage() {
  const [otp, setOtp] = useState(['', '', '', '' , '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^[0-9]*$/.test(value)) return;
    
    // Take only the last character if multiple are entered
    const char = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-advance to next input if a digit was entered
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input if current is empty and backspace is pressed
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    // Implementation for verifying OTP would go here
    console.log('Verifying code:', code);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 space-y-8 border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Enter Code</h1>
          <p className="text-sm text-gray-500">We've sent a 6-digit code to your phone.</p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                required
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
          >
            Verify
          </button>
        </form>

      </div>
    </div>
  );
}
