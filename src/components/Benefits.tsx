import { DollarSign, Users, Shield, Rocket } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: "Premium Earnings",
    description: "Our models consistently earn above market average with our premium client network"
  },
  {
    icon: Users,
    title: "Professional Support",
    description: "Full team support for content strategy, marketing, and customer service"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "We prioritize your privacy and security with strict content protection measures"
  },
  {
    icon: Rocket,
    title: "Fast Growth",
    description: "Proven strategies to rapidly grow your following and income"
  }
];

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg text-center">
              <benefit.icon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}