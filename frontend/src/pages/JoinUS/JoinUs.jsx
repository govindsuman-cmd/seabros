import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const JoinUs = () => {
  const { jobId } = useParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [orderData, setOrderData] = useState(null); // store order info
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    skills: [],
    experience:"",
    email: "",
    idProof: null,
    resume: null,
    address: "",
    nationality: "",
    domicile: null,
    date: "",
    time: "",
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  // Fetch order as soon as Step 4 is active
  useEffect(() => {
    if (step === 4 && paymentAmount === 0) {
      const fetchOrder = async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/candidates/create-candidate-order`,
            { jobId, email: formData.email }
          );
          setOrderData(res.data.order);
          setPaymentAmount(res.data.order.amount);
        } catch (err) {
          console.error("Error fetching order:", err);
        }
      };
      fetchOrder();
    }
  }, [step]);

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentAndSubmit = async () => {
    if (!orderData) return alert("Order not ready yet!");
    setLoading(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) return alert("Failed to load Razorpay SDK.");

      const { key, receipt } = orderData; // key and receipt from backend
      const options = {
        key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Job Application Fee",
        description: "Pay to submit your application",
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const payload = new FormData();
            Object.keys(formData).forEach((key) => {
              if (Array.isArray(formData[key])) {
                formData[key].forEach((item) => payload.append(`${key}[]`, item));
              } else if (formData[key] !== null) {
                payload.append(key, formData[key]);
              }
            });
            payload.append("jobId", jobId);
            payload.append("razorpay_order_id", response.razorpay_order_id);
            payload.append("razorpay_payment_id", response.razorpay_payment_id);
            payload.append("razorpay_signature", response.razorpay_signature);
            payload.append("receipt", receipt);

            const submitRes = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/candidates/verify-payment-and-create-candidate`,
              payload,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("✅ Application submitted successfully!");
          
          } catch (err) {
            console.error("Error submitting candidate:", err);
            alert("❌ Failed to submit candidate after payment.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating payment:", err);
      alert("❌ Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-6 mt-10 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Join Us</h2>
      <ProgressBar step={step} />

      {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
      {step === 4 && (
  <div className="text-center mt-6">
    {paymentAmount === 0 ? (
      <p className="mb-4 text-lg font-medium">Loading payment details...</p>
    ) : (
      <>
        <p className="mb-4 text-lg font-medium">
          Job Application Fee: <span className="font-bold">₹{paymentAmount / 100}</span>
        </p>
        <button
          onClick={handlePaymentAndSubmit}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded"
          disabled={loading}
        >
          {loading ? "Processing Payment..." : `Pay ₹${paymentAmount / 100} & Submit Application`}
        </button>
      </>
    )}
  </div>
)}


      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-400 text-white rounded"
            disabled={loading}
          >
            Previous
          </button>
        )}
        {step < 4 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default JoinUs;
