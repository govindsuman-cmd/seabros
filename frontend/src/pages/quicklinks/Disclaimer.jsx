import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: 15-September-2025</p>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          The information provided on <strong>SeaBros Pvt Ltd</strong> (“we,” “our,” “us”) is for general purposes only. 
          By using our platform, candidates acknowledge and agree to the following:
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. No Guarantee of Employment</h2>
          <p>
            Our platform facilitates candidate registrations and job applications by forwarding profiles and documents to employers.
            We do not guarantee interviews, shortlisting, or final job offers. Hiring decisions are entirely at the discretion of the employer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Accuracy of Information</h2>
          <p>
            While we strive to ensure accuracy, we are not responsible for errors, omissions, or outdated information on job postings or employer requirements.
            Candidates are advised to verify details independently before applying.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Limitation of Liability</h2>
          <p>
            We are not liable for:
          </p>
          <ul className="list-disc pl-6">
            <li>Rejection of applications by employers.</li>
            <li>Any disputes between candidates and employers.</li>
            <li>Loss of money, data, or opportunity arising from use of our platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. External Links</h2>
          <p>
            Our platform may contain links to external websites. We are not responsible for the content, policies, or practices of third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Payment Disclaimer</h2>
          <p>
            All application/registration fees are non-refundable, except in cases of duplicate or failed transactions as per our Refund Policy.
            Payment processing is handled securely via Razorpay; we do not store payment credentials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Acceptance</h2>
          <p>
            By registering and making payments, candidates confirm that they have read, understood, and agreed to this Disclaimer along with our Privacy Policy, Refund Policy, and Terms & Conditions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
