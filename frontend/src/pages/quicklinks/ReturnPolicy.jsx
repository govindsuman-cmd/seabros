// src/pages/ReturnPolicy.jsx
import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Return Policy
      </h1>

      {/* For Products (Shoes) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Return Policy for Products</h2>
        <p>
          At <strong>SeaBros</strong>, customer satisfaction is our top priority.
          If you are not fully satisfied with your purchase of shoes, you may
          request a return or exchange under the following conditions:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>Returns/exchanges must be requested within <strong>7 days</strong> of delivery.</li>
          <li>The product must be <strong>unused, unworn, and in original packaging</strong>.</li>
          <li>Proof of purchase (order ID/invoice) is required for all returns.</li>
          <li>Refunds (if approved) will be processed to the original payment method within <strong>7-10 business days</strong>.</li>
          <li>Shipping charges are non-refundable. Return shipping cost will be borne by the customer, unless the product delivered was defective or incorrect.</li>
        </ul>
      </section>

      {/* For Candidate Registration */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Return Policy for Candidate Registration</h2>
        <p>
          Our platform also provides <strong>digital services</strong> related to candidate
          registration and job application processes. Please note:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>The <strong>registration fee is non-returnable</strong> once payment is successfully completed.</li>
          <li>No refunds will be issued for cancellation of registration by the candidate.</li>
          <li>Please verify all details carefully before making the payment.</li>
        </ul>
      </section>

      {/* Duplicate Transactions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Duplicate Transactions</h2>
        <p>
          In case of a <strong>duplicate payment</strong> due to technical errors, the extra
          amount (if any) will be refunded to the original payment method within{" "}
          <strong>7-10 business days</strong>.
        </p>
      </section>

      {/* Failed Transactions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Failed Transactions</h2>
        <p>
          If your transaction fails but the amount is deducted from your account, the
          same will be <strong>automatically refunded</strong> by your bank/payment
          provider within the standard processing time.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">5. Contact Us</h2>
        <p>If you face any issues related to returns or payments, please contact us:</p>
        <ul className="list-disc list-inside mt-3">
          <li>
            📧 Email:{" "}
            <a
              href="mailto:seabrospvtld@gmail.com"
              className="text-indigo-500 underline"
            >
              seabrospvtld@gmail.com
            </a>
          </li>
          <li>📞 Phone: +91-9149614760</li>
        </ul>
      </section>
    </div>
  );
};

export default ReturnPolicy;
