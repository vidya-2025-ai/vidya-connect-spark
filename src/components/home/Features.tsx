
import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  Handshake, 
  Award, 
  Briefcase, 
  Globe 
} from 'lucide-react';

const features = [
  {
    name: 'For Students',
    description: 'Access curated internships and projects aligned with your skills and interests.',
    icon: GraduationCap,
    iconBg: 'bg-vs-green-100',
    iconColor: 'text-vs-green-600'
  },
  {
    name: 'For Organizations',
    description: 'Connect with talented students for your projects and initiatives.',
    icon: Building2,
    iconBg: 'bg-vs-orange-100',
    iconColor: 'text-vs-orange-500'
  },
  {
    name: 'Mentorship',
    description: 'Receive guidance from industry professionals during your projects.',
    icon: Handshake,
    iconBg: 'bg-vs-purple-100',
    iconColor: 'text-vs-purple-500'
  },
  {
    name: 'Certifications',
    description: 'Earn verified certificates upon successful completion of projects.',
    icon: Award,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Social Impact',
    description: 'Work on projects that make a real difference in communities.',
    icon: Globe,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    name: 'Career Growth',
    description: 'Build your portfolio and enhance your resume with real-world experience.',
    icon: Briefcase,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  }
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Platform Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Everything you need to connect, learn, and grow through meaningful opportunities.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="vs-card">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-md flex items-center justify-center ${feature.iconBg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} aria-hidden="true" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
