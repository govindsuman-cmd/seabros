import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🔹 Refund Policy
        </h1>
        <p className="text-gray-500 text-sm mb-6">Last Updated: 14 September 2025</p>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">SeaBros Job Portal</span>, we charge a one-time 
          application/registration fee from candidates who wish to apply for jobs 
          through our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Non-Refundable Fees</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>All fees paid towards candidate registration or job application are non-refundable.</li>
          <li>
            Once the payment is successfully processed, it cannot be canceled, 
            reversed, or refunded under any circumstances.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Exceptions</h2>
        <p className="text-gray-700 mb-2">
          Refunds will only be considered in the following exceptional cases:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>If the transaction was deducted twice due to a technical error.</li>
          <li>
            If the amount was deducted from the candidate’s account but not 
            reflected in our system.
          </li>
        </ul>
        <p className="text-gray-700 mb-6">
          In such cases, candidates must contact our support team with valid proof 
          (transaction ID, payment receipt, bank statement).
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          3. Processing of Valid Refunds
        </h2>
        <p className="text-gray-700 mb-6">
          If a refund is approved, it will be initiated to the original payment 
          method within <span className="font-semibold">7–10 working days</span>.  
          The timeline may vary depending on the payment gateway and bank policies.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          4. Contact for Refund Queries
        </h2>
        <p className="text-gray-700">
          For refund-related queries, candidates can reach out to us at: <br />
          📧 <a href="mailto:seabrospvtld@gmail.com" className="text-blue-600">seabrospvtld@gmail.com</a> <br />
          📞 <a href="tel:+919149614760" className="text-blue-600">+91 91496 14760</a>
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
