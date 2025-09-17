import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  Shield, 
  Clock, 
  Globe, 
  Users, 

  Heart,
  Target,
  Zap,
  CheckCircle,
  Star,
 
  Mail,
  Linkedin,
  Twitter
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  color: string;
}

interface Stat {
  id: number;
  number: string;
  label: string;
  icon: React.ElementType;
}

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<number>(0);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Rotate active service every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4000);
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

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      image: 'https://i.ibb.co.com/zQDLxpK/pexels-olly-842811.jpg',
      bio: 'Visionary leader with 15+ years in logistics. Founded ParcelEx to revolutionize delivery services.',
      social: { linkedin: '#', twitter: '#', email: 'sarah@parcelex.com' }
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Tech innovator specializing in logistics technology and AI-powered route optimization.',
      social: { linkedin: '#', twitter: '#', email: 'michael@parcelex.com' }
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      position: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Operations expert ensuring seamless delivery experiences across all service channels.',
      social: { linkedin: '#', email: 'emma@parcelex.com' }
    },
    {
      id: 4,
      name: 'David Kim',
      position: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Customer advocate focused on delivering exceptional service experiences and building relationships.',
      social: { linkedin: '#', twitter: '#', email: 'david@parcelex.com' }
    }
  ];

  const stats: Stat[] = [
    { id: 1, number: '500K+', label: 'Packages Delivered', icon: Package },
    { id: 2, number: '99.8%', label: 'On-Time Delivery', icon: Clock },
    { id: 3, number: '50+', label: 'Countries Served', icon: Globe },
    { id: 4, number: '24/7', label: 'Customer Support', icon: Users }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every delivery is executed with meticulous attention to detail and accuracy.',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'We treat every package as if it were our own, with genuine care and responsibility.',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously advancing technology to provide faster, smarter delivery solutions.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and security.',
      color: 'from-blue-400 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen  mt-10   bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 relative overflow-hidden">
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

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 float"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-32 w-48 h-48 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full opacity-15 float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-32 left-1/2 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`max-w-7xl mx-auto py-16 px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Hero Section */}
        <div className="text-center mb-24 fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl glow">
              <Package className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-7xl font-black gradient-text">
              About ParcelEx
            </h1>
          </div>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Revolutionizing parcel delivery with cutting-edge technology, unmatched reliability, 
            and a passion for connecting people across the globe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Trusted', 'Innovative', 'Global', 'Secure'].map((tag, index) => (
              <span 
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full font-semibold text-lg border border-emerald-200 hover:scale-105 transition-transform duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className="glass rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black text-gray-800 mb-2">{stat.number}</h3>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-24">
          <div className="glass rounded-3xl p-12 slide-in-left">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                  <Target className="w-12 h-12 text-emerald-600" />
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  To create a world where distance doesn't matter. We're building the future of logistics 
                  through innovative technology, sustainable practices, and unwavering commitment to excellence.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Every package tells a story – a gift from a loved one, a business opportunity, 
                  a connection across continents. We're honored to be part of these moments.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Speed', 'Security', 'Sustainability', 'Service'].map((value, index) => (
                    <div key={index} className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                  <Truck className="w-32 h-32 text-white/90 float" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16 fade-in-up">Our Values</h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="glass rounded-3xl p-8 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300 scale-in group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-24">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16 fade-in-up">Our Services</h2>
          <div className="glass rounded-3xl p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Service Navigation */}
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      activeService === index
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl scale-105'
                        : 'bg-white/50 hover:bg-white/70 text-gray-800 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeService === index ? 'bg-white/20' : `bg-gradient-to-r ${service.color}`
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

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16 fade-in-up">Meet Our Team</h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className="glass rounded-3xl p-6 text-center hover:scale-105 hover:-translate-y-4 transition-all duration-500 scale-in group cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-4">{member.position}</p>
                
                <div className={`transition-all duration-300 ${hoveredMember === member.id ? 'opacity-100 max-h-40' : 'opacity-70 max-h-20 overflow-hidden'}`}>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                </div>

                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {member.social.twitter && (
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Twitter className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {member.social.email && (
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center fade-in-up">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Ready to Experience Excellence?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust ParcelEx for their delivery needs. 
              Let's make your next shipment extraordinary.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Get Started Today
              </button>
              <button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;