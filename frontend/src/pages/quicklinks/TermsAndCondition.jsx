import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🔹 Terms & Conditions
        </h1>
        <p className="text-gray-500 text-sm mb-6">Last Updated: 14 September 2025</p>

        <p className="text-gray-700 mb-6">
          Welcome to <span className="font-semibold">SeaBros Job Portal</span>
          (“we,” “our,” “us”). By registering, uploading documents, or making
          payments on our platform, you (“Candidate,” “User,” “you”) agree to the
          following Terms & Conditions. Please read them carefully.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-6">
          By accessing or using our platform, you agree to be bound by these
          Terms & Conditions, our Privacy Policy, and Refund Policy.  
          If you do not agree, you must not use our services.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Candidate Registration</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Candidates must provide accurate, complete, and true personal and professional details.</li>
          <li>Uploading of resume, domicile, and ID proof is mandatory for job application.</li>
          <li>Providing false, misleading, or fraudulent information may result in cancellation of registration without refund.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Payment Terms</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>A non-refundable registration/application fee is required to complete the candidate registration process.</li>
          <li>Payments are processed securely through Razorpay. We do not store your card/UPI/bank details.</li>
          <li>Once the payment is confirmed, the candidate will be considered successfully registered.</li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Refunds & Cancellations</h2>
        <p className="text-gray-700 mb-6">
          All fees once paid are non-refundable (refer to our Refund Policy).  
          Refunds will only be issued in case of duplicate transactions or failed payments.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Job Applications & Selection</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Our platform facilitates job applications by forwarding candidate details to the respective employer.</li>
          <li>We do not guarantee job placement, interviews, or selection. Final hiring decisions rest solely with employers.</li>
        </ul>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Use of Candidate Data</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Candidate details (resume, qualifications, documents) will only be shared with employers for job opportunities applied for.</li>
          <li>We do not sell candidate data to third parties (refer to our Privacy Policy).</li>
        </ul>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">7. User Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Candidates must keep login credentials secure and confidential.</li>
          <li>Users agree not to misuse the platform for fraud, impersonation, or illegal activities.</li>
          <li>Any violation may result in termination of access without refund.</li>
        </ul>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Limitation of Liability</h2>
        <p className="text-gray-700 mb-6">
          We act only as a job application facilitator.  
          We are not responsible for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Employer’s hiring decisions.</li>
          <li>Delays or rejections in recruitment.</li>
          <li>Any loss/damage arising from use of our services.</li>
        </ul>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Modifications</h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to update these Terms at any time.  
          Continued use of the platform after changes implies acceptance of updated Terms.
        </p>

        {/* Section 10 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">10. Governing Law & Jurisdiction</h2>
        <p className="text-gray-700 mb-6">
          These Terms & Conditions are governed by the laws of India.  
          Any disputes shall be subject to the jurisdiction of courts in{" "}
          <span className="font-semibold">Chhattisgarh, India</span>.
        </p>

        {/* Section 11 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">11. Contact Us</h2>
        <p className="text-gray-700">
          For questions regarding these Terms & Conditions, contact us at: <br />
          📧 <a href="mailto:seabrospvtld@gmail.com" className="text-blue-600">seabrospvtld@gmail.com</a> <br />
          📞 <a href="tel:+919149614760" className="text-blue-600">+91 91496 14760</a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
