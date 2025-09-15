import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🔹 Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-6">Last Updated: 14 September 2025</p>

        <p className="text-gray-700 mb-6">
          We at <span className="font-semibold">SeaBros Job Portal</span> (“we,” “our,” “us”) 
          value the privacy of our users. This Privacy Policy explains how we 
          collect, use, and protect the personal information of candidates who 
          register, upload documents, and make payments through our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li><strong>Personal Information:</strong> Name, age, email address, contact details, address, nationality.</li>
          <li><strong>Professional Information:</strong> Qualifications, experience, skills, and job preferences.</li>
          <li><strong>Documents:</strong> Resume, ID proof, domicile certificate (uploaded via Cloudinary).</li>
          <li><strong>Payment Information:</strong> Transaction details via Razorpay (we do not store card/UPI/bank details).</li>
          <li><strong>Usage Data:</strong> Device info, IP address, and activity logs.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Processing job applications and sharing with employers.</li>
          <li>Verifying identity and uploaded documents.</li>
          <li>Processing payments securely.</li>
          <li>Communicating about updates, interviews, or job opportunities.</li>
          <li>Improving platform, security, and user experience.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Sharing of Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li><strong>Employers:</strong> Where you have applied for jobs.</li>
          <li><strong>Payment Gateway (Razorpay):</strong> For secure transaction processing.</li>
          <li><strong>Legal Authorities:</strong> If required by law or to prevent fraud.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Data Security</h2>
        <p className="text-gray-700 mb-6">
          All documents are securely stored in Cloudinary. Payments are processed 
          via Razorpay’s PCI-DSS compliant system. We use encryption, firewalls, 
          and strict access controls to safeguard your data.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Your Rights</h2>
        <p className="text-gray-700 mb-6">
          You may access, update, or request deletion of your personal data (except where legally required).  
          You may also withdraw consent to processing, though this may limit our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Cookies & Tracking</h2>
        <p className="text-gray-700 mb-6">
          We may use cookies for analytics, user experience, and fraud prevention.  
          You can disable cookies in browser settings, but some features may not work properly.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Third-Party Links</h2>
        <p className="text-gray-700 mb-6">
          Our platform may contain links to external sites. We are not responsible 
          for their privacy practices.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Updates to Privacy Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update this policy from time to time. Changes will be posted 
          here with the updated date.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions regarding this Privacy Policy, contact us at: <br />
          📧 <a href="mailto:seabrospvtld@gmail.com" className="text-blue-600">seabrospvtld@gmail.com</a> <br />
          📞 <a href="tel:+919149614760" className="text-blue-600">+91 91496 14760</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
