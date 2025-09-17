import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Package, Clock, MessageCircle, User, Briefcase } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Animate page on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const serviceTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'shipping', label: 'Shipping Question', icon: Package },
    { value: 'tracking', label: 'Tracking Issue', icon: MapPin },
    { value: 'billing', label: 'Billing Support', icon: Briefcase },
    { value: 'complaint', label: 'File a Complaint', icon: User }
  ];

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      // Shake animation for errors
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          formElement.style.animation = '';
        }, 500);
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'general'
      });
      
      // Auto-hide success message after 6 seconds
      setTimeout(() => setIsSubmitted(false), 6000);
      
    } catch (error) {
      setIsSubmitting(false);
      console.error('Submission error:', error);
    }
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 flex items-center justify-center p-6">
        <style>{`
          @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .bounce-in { animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
          .pulse-success { animation: pulse 2s infinite; }
        `}</style>
        
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full bounce-in border border-white/20">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 pulse-success shadow-lg shadow-emerald-200">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Message Sent Successfully!
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Thank you for contacting ParcelEx. Our team will review your inquiry and respond within 24 hours.
          </p>
          
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg shadow-orange-200"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 relative overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.5); }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .slide-in-right { animation: slideInRight 0.8s ease-out; }
        .float { animation: float 6s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .gradient-border {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(45deg, #10b981, #f97316) border-box;
          border: 2px solid transparent;
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full opacity-15 float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className={`max-w-7xl mx-auto py-16 px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header Section */}
        <div className="text-center mb-20 fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl glow">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience premium parcel delivery services. Our expert team is ready to assist you with all your shipping needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information Card */}
          <div className="slide-in-left">
            <div className="glass rounded-3xl shadow-2xl p-10 h-full">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-emerald-600" />
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                {[
                  { icon: Phone, title: 'Phone', content: '+1 (555) 123-4567', gradient: 'from-blue-400 to-blue-600' },
                  { icon: Mail, title: 'Email', content: 'support@parcelex.com', gradient: 'from-purple-400 to-purple-600' },
                  { icon: MapPin, title: 'Address', content: '123 Delivery Street, Logistics City, LC 12345', gradient: 'from-pink-400 to-pink-600' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center group cursor-pointer p-4 rounded-2xl hover:bg-white/50 transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                      <p className="text-gray-600 text-base">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-bold text-emerald-800 text-xl">Business Hours</h3>
                </div>
                <div className="space-y-2 text-emerald-700">
                  {[
                    { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Sunday', hours: '10:00 AM - 4:00 PM' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-4 bg-white/60 rounded-lg">
                      <span className="font-semibold">{schedule.day}:</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="slide-in-right">
            <div id="contact-form" className="glass rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3">
                <Send className="w-8 h-8 text-orange-500" />
                Send Message
              </h2>
              
              <div className="space-y-8">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 text-lg ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-emerald-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm font-semibold mt-2 animate-pulse">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 text-lg ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-emerald-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm font-semibold mt-2 animate-pulse">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone and Service Type Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 text-lg"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Service Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 text-lg"
                    >
                      {serviceTypes.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-6 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 text-lg ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-emerald-300'
                    }`}
                    placeholder="How can we help you today?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm font-semibold mt-2 animate-pulse">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-6 py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 resize-none text-lg ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-emerald-300'
                    }`}
                    placeholder="Please describe your inquiry in detail. The more information you provide, the better we can assist you."
                  />
                  {errors.message && <p className="text-red-500 text-sm font-semibold mt-2 animate-pulse">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 rounded-2xl text-white font-bold text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-2xl ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-orange-400  hover:from-emerald-600 hover:via-emerald-500 hover:to-orange-500  active:scale-95 hover:shadow-lg hover:shadow-orange-200  transition-all duration-300 ease-in-out  focus:ring-emerald-200'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;