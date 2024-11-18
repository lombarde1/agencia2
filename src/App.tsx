import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import MultiStepForm from './components/MultiStepForm';
import { ArrowRight } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Services />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Pronta para Começar?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Estamos aceitando novas modelos. Vagas limitadas!
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-700 transition-colors inline-flex items-center"
          >
            Quero me Cadastrar <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Requisitos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Requisitos Básicos</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Maior de 18 anos</li>
                <li>• Documento de identificação válido</li>
                <li>• Conexão de internet estável</li>
                <li>• Smartphone ou câmera profissional</li>
                <li>• Dedicação e profissionalismo</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Nós Oferecemos</h3>
              <ul className="text-gray-300 space-y-2">
               
                <li>• Marketing e promoção</li>
                <li>• Estratégia de conteúdo</li>
                <li>• Suporte 24/7</li>
                <li>• Processamento seguro de pagamentos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {showForm && <MultiStepForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default App;