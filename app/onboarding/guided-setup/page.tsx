// 1. Define la interfaz para un objeto Step
interface StepData {
  id: string | number;
  title: string;
  description: string;
  icon: React.ElementType;
  isComplete: boolean;
}

// 2. Define las props del componente StepCard
interface StepCardProps {
  step: StepData;
  onMarkComplete: (id: string | number) => void;
}

// 3. Aplica los tipos al componente
const StepCard = ({ step, onMarkComplete }: StepCardProps) => {
    const isComplete = step.isComplete;
    const Icon = isComplete ? CheckCircleIcon : step.icon;

    return (
        <div className={`p-6 rounded-xl border ${isComplete ? 'bg-green-500/10 border-green-500/50' : 'bg-white/5 border-white/10'} transition-all`}>
            {/* Contenido del componente... */}
            <div className="flex items-center gap-4">
                <Icon className={`w-8 h-8 ${isComplete ? 'text-green-400' : 'text-cyan-400'}`} />
                <div>
                    <h3 className="text-white font-bold">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
            </div>
            {!isComplete && (
                <button 
                    onClick={() => onMarkComplete(step.id)}
                    className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    Marcar como completado
                </button>
            )}
        </div>
    );
};
