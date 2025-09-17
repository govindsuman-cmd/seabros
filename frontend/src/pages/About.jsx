import React from 'react';
import Vikram from '../assets/images/VikramSingh.jpg';
import Meena from '../assets/images/MeenaKumari.jpg';
import Govind from '../assets/images/Govind.jpg';
import { useNavigate } from 'react-router-dom';
const About = () => {

  const navigate = useNavigate();

   const handleClick = () => {
    navigate('/get-all-jobs');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn more about our company and the team behind our success.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
  Founded in 2025, SeaBros began with a simple idea — to craft shoes that blend 
  comfort, durability, and modern style. We believe footwear should empower 
  every step you take, whether on the streets, at work, or in training.  
</p>
<p className="text-gray-600">
  From premium materials to innovative designs, our collections are built to 
  keep you moving with confidence. What started as a small team with a passion 
  for sneakers has grown into a brand trusted by style enthusiasts and athletes alike.
</p>

        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Integrity in all our dealings</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Commitment to excellence</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Customer-centric approach</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Continuous innovation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Vikram Singh',
              role: 'CEO & Founder',
              image: Vikram,
            },
            {
              name: 'Govind Suman',
              role: 'Lead Developer',
              image: Govind,
            },
            {
              name: 'Meena Kumari',
              role: 'HR',
              image: Meena,
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to work with us?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals to join our team. Check out our current
          openings.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
         onClick={handleClick}
        >
          View Careers
        </button>
      </div>
    </div>
  );
};

export default About;