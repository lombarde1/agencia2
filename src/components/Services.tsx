import { Camera, Users, Shield, Target, Megaphone, Palette } from 'lucide-react';

const services = [
  {
    title: "Planejamento Spicy",
    icon: Camera,
    description: "Nossa equipe cria conteúdos exclusivos e constantes, tudo pensando no seu estilo e no seu público."
  },
  {
    title: "Atendimento Premium",
    icon: Users,
    description: "Imagine uma equipe só para vender e gerenciar seu conteúdo? Com nosso atendimento premium, cada assinante fica mais próximo."
  },
  {
    title: "Consultoria de Imagem",
    icon: Palette,
    description: "Estudamos sua personalidade e criamos um arquétipo que potencializa sua presença e faz suas vendas explodirem."
  },
  {
    title: "Assessoria Jurídica",
    icon: Shield,
    description: "Vazamento de conteúdo? Você está protegida conosco. Nossa equipe jurídica cuida da sua segurança e privacidade."
  },
  {
    title: "Tráfego Direcionado",
    icon: Target,
    description: "Nosso tráfego pago direcionado potencializa seu alcance, trazendo retorno em curtíssimo prazo."
  },
  {
    title: "Marketing Exclusivo",
    icon: Megaphone,
    description: "Criamos conteúdo do zero, com roteiros e produção própria. Sua marca se torna única no mercado."
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">O que oferecemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <service.icon className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}