
import React, { useState, useEffect } from 'react';

import { CheckCircle, Globe, Shield, Truck, Zap } from "lucide-react"

interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    features: string[];
    color: string;
}





const WhyWe = () => {




    const [activeService, setActiveService] = useState<number>(0);




    // Rotate active service every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveService(prev => (prev + 1) % services.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);


    const services: Service[] = [
        {
            id: 1,
            title: 'Express Delivery',
            description: 'Lightning-fast delivery for urgent packages with real-time tracking.',
            icon: Zap,
            features: ['Same-day delivery', '2-hour time slots', 'Priority handling', 'Live tracking'],
            color: 'from-yellow-400 to-orange-500'
        },
        {
            id: 2,
            title: 'Standard Shipping',
            description: 'Reliable and cost-effective shipping solution for everyday needs.',
            icon: Truck,
            features: ['3-5 business days', 'Secure packaging', 'Insurance included', 'Proof of delivery'],
            color: 'from-blue-400 to-blue-600'
        },
        {
            id: 3,
            title: 'International Delivery',
            description: 'Global reach with customs handling and international tracking.',
            icon: Globe,
            features: ['Worldwide coverage', 'Customs clearance', 'Multi-language support', 'Currency flexibility'],
            color: 'from-purple-400 to-purple-600'
        },
        {
            id: 4,
            title: 'Secure Transport',
            description: 'Maximum security for valuable and sensitive deliveries.',
            icon: Shield,
            features: ['Enhanced security', 'Signature required', 'Insurance up to $10K', 'Chain of custody'],
            color: 'from-red-400 to-red-600'
        }
    ];





    return (
        <div>

            {/* Services Section */}

                <div className="   bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 relative overflow-hidden ">

            <div  className='container mx-auto lg:px-4 py-20'>



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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .slide-in-right { animation: slideInRight 0.8s ease-out; }
        .scale-in { animation: scaleIn 0.6s ease-out; }
        .float { animation: float 6s ease-in-out infinite; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .gradient-text {
          background: linear-gradient(45deg, #10b981, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

                    <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">Why Choose Us ?</h2>
                    <div className="glass rounded-3xl p-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Service Navigation */}
                            <div className="space-y-4">
                                {services.map((service, index) => (
                                    <div
                                        key={service.id}
                                        onClick={() => setActiveService(index)}
                                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeService === index
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl scale-105'
                                                : 'bg-white/50 hover:bg-white/70 text-gray-800 hover:scale-102'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeService === index ? 'bg-white/20' : `bg-gradient-to-r ${service.color}`
                                                }`}>
                                                <service.icon className={`w-6 h-6 ${activeService === index ? 'text-white' : 'text-white'}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                                                <p className={`text-sm ${activeService === index ? 'text-white/80' : 'text-gray-600'}`}>
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Active Service Details */}
                            <div className="slide-in-right">
                                <div className="bg-white/60 rounded-2xl p-8 h-full">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${services[activeService].color} rounded-2xl flex items-center justify-center mb-6 pulse`}>
                                        {React.createElement(services[activeService].icon, { className: "w-8 h-8 text-white" })}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{services[activeService].title}</h3>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{services[activeService].description}</p>

                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Key Features:</h4>
                                    <div className="space-y-3">
                                        {services[activeService].features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-gray-700 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyWe;