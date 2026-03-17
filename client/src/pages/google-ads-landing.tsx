import { MultiStepConsultationForm } from "@/components/multi-step-consultation-form";

export default function GoogleAdsLanding() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full inline-block mb-6">
              ⚡ CONSULTATION GRATUITE
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Réservez Votre Consultation Gratuite
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Remplissez notre formulaire en 3 étapes pour recevoir une stratégie d'automatisation personnalisée pour votre entreprise.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-2xl">
            <MultiStepConsultationForm />
          </div>
        </div>
      </div>

      {/* GA4 is now loaded globally in index.html */}
    </div>
  );
}