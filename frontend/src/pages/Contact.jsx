export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          We’re here to help! Reach out to us anytime.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">📞 Phone</h3>
            <p className="text-blue-600 font-medium mt-1">+91 91496 14760</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">📧 Email</h3>
            <p className="text-blue-600 font-medium mt-1">seabrospvtld@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
