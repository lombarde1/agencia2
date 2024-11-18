import React, { useState } from 'react';
import * as motion from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, User, Mail, Phone, Instagram, Calendar, Clock, Target } from 'lucide-react';

const StepIcon = ({ step }) => {
  switch (step) {
    case 'personal':
      return <User className="w-6 h-6 text-pink-500" />;
    case 'contact':
      return <Mail className="w-6 h-6 text-pink-500" />;
    case 'social':
      return <Instagram className="w-6 h-6 text-pink-500" />;
    case 'experience':
      return <Clock className="w-6 h-6 text-pink-500" />;
    case 'goals':
      return <Target className="w-6 h-6 text-pink-500" />;
    default:
      return null;
  }
};

const steps = [
  {
    id: 'personal',
    title: 'Informações Pessoais',
    fields: ['name', 'age']
  },
  {
    id: 'contact',
    title: 'Contato',
    fields: ['email', 'phone']
  },
  {
    id: 'social',
    title: 'Redes Sociais',
    fields: ['instagram', 'primaryPlatform']
  },
  {
    id: 'experience',
    title: 'Experiência',
    fields: ['experience', 'schedule']
  },
  {
    id: 'goals',
    title: 'Objetivos',
    fields: ['income', 'goals']
  }
];

const Input = ({ label, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-200">{label}</label>
    <input
      {...props}
      className={`w-full p-3 bg-white/10 border ${error ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
    />
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
);

export default function ApplicationForm({ onClose, isModal = true }) {
  const MotionDiv = motion.motion.div;
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    instagram: '',
    experience: 'none',
    primaryPlatform: 'privacy',
    income: '',
    schedule: 'flexible',
    goals: ''
  });

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const errors = {};
    let isValid = true;
  
    // Log para debug
    console.log("Validando passo", currentStep, currentFields);
  
    currentFields.forEach(field => {
      if (!formData[field] && field !== 'instagram' && field !== 'goals') {
        errors[field] = 'Este campo é obrigatório';
        isValid = false;
      }
      if (field === 'age' && formData.age < 18) {
        errors.age = 'Você precisa ter 18 anos ou mais';
        isValid = false;
      }
      if (field === 'phone' && formData.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Número de telefone inválido';
        isValid = false;
      }
      if (field === 'email' && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email inválido';
        isValid = false;
      }
    });
  
    // Log para debug
    console.log("Resultado da validação:", { isValid, errors });
  
    setFormErrors(errors);
    return isValid;
  };

    const handleNext = async (e) => {
    e.preventDefault();
    console.log("Handle Next chamado", currentStep, steps.length - 1);
    
    if (validateStep()) {
      if (currentStep === steps.length - 1) {
        console.log("Último passo, chamando submit");
        await handleSubmit(); // Aguardar a conclusão do submit
      } else {
        console.log("Avançando para próximo passo");
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormErrors(prev => ({
      ...prev,
      [name]: null
    }));
  };

  const handleSubmit = async () => {
    console.log("HandleSubmit iniciado");
    setLoading(true);
    setError(null);
  
    try {
      let phoneNumber = formData.phone.replace(/\D/g, '');
      if (!phoneNumber.startsWith('55')) {
        phoneNumber = `55${phoneNumber}`;
      }
  
      console.log("Enviando dados", {
        phoneNumber,
        formData
      });
  
      // Usando o proxy configurado no Vite
      const response = await fetch('/api/funnel/execute', {
        method: 'POST',
        headers: {
          'x-api-key': 'hkt_96a4f4596a6a4fa29b3f9db971855b96',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          funnelId: "59d1db7e-28d7-4af6-a4fc-6ce01ddb937d",
          instanceKey: "agenciaspy",
          chatId: phoneNumber
        })
      });
  
      const data = await response.json().catch(() => null);
  
      if (!response.ok) {
        throw new Error(data?.message || 'Falha ao enviar formulário');
      }
  
      console.log("Resposta do servidor:", data);
      setSuccess(true);
      alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
      
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error("Erro no envio:", err);
      setError(err instanceof Error ? err.message : 'Erro ao enviar formulário');
      alert(err instanceof Error ? err.message : 'Erro ao enviar formulário');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    return (
      <MotionDiv
        key={step.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {step.id === 'personal' && (
          <>
            <Input
              label="Nome Completo"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              error={formErrors.name}
            />
            <Input
              label="Idade (18+)"
              type="number"
              name="age"
              min="18"
              required
              value={formData.age}
              onChange={handleChange}
              error={formErrors.age}
            />
          </>
        )}

        {step.id === 'contact' && (
          <>
            <Input
              label="Email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              error={formErrors.email}
            />
            <Input
              label="WhatsApp"
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              error={formErrors.phone}
            />
          </>
        )}

        {step.id === 'social' && (
          <>
            <Input
              label="Instagram"
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@seuinstagram"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Plataforma Principal</label>
              <select
                name="primaryPlatform"
                value={formData.primaryPlatform}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white"
              >
                <option value="privacy">Privacy</option>
                <option value="onlyfans">OnlyFans</option>
                <option value="both">Ambos</option>
              </select>
            </div>
          </>
        )}

        {step.id === 'experience' && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Experiência com Conteúdo</label>
              <select
                name="experience"
                className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="none">Sem Experiência</option>
                <option value="beginner">Iniciante (0-6 meses)</option>
                <option value="intermediate">Intermediário (6-12 meses)</option>
                <option value="advanced">Avançado (1+ anos)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Disponibilidade</label>
              <select
                name="schedule"
                className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white"
                value={formData.schedule}
                onChange={handleChange}
              >
                <option value="flexible">Horário Flexível</option>
                <option value="morning">Manhã</option>
                <option value="afternoon">Tarde</option>
                <option value="night">Noite</option>
              </select>
            </div>
          </>
        )}

        {step.id === 'goals' && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Objetivo de Renda Mensal</label>
              <select
                name="income"
                className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white"
                value={formData.income}
                onChange={handleChange}
              >
                <option value="5k">Até R$5.000</option>
                <option value="10k">R$5.000 - R$10.000</option>
                <option value="15k">R$10.000 - R$15.000</option>
                <option value="20k">R$15.000+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Seus Objetivos</label>
              <textarea
                name="goals"
                rows={4}
                className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={formData.goals}
                onChange={handleChange}
                placeholder="Conte-nos sobre seus objetivos..."
              />
            </div>
          </>
        )}
      </MotionDiv>
    );
  };

  const formContent = (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
              Progresso
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-pink-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>
        <div className="flex h-2 mb-4 overflow-hidden rounded-full bg-pink-200">
          <MotionDiv
            className="bg-gradient-to-r from-pink-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Title */}
      <div className="flex items-center gap-3 mb-6">
        <StepIcon step={steps[currentStep].id} />
        <h3 className="text-xl font-bold text-white">{steps[currentStep].title}</h3>
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Voltar
          </button>
        )}
      <button
  type="button"
  onClick={handleNext}
  disabled={loading}
  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
>
  {loading ? (
    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
  ) : success ? (
    <><CheckCircle className="w-5 h-5" /> Enviado com Sucesso!</>
  ) : currentStep === steps.length - 1 ? (
    <>Finalizar <ArrowRight className="w-5 h-5" /></>
  ) : (
    <>Próximo <ArrowRight className="w-5 h-5" /></>
  )}
</button>

      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mt-4">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );

  if (!isModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-16 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Cadastro de Modelo</h1>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <MotionDiv
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
        <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-white mb-8">Cadastro de Modelo</h2>
        {formContent}
      </MotionDiv>
    </MotionDiv>
  );
}