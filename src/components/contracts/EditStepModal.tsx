import { useState, useEffect } from "react";
import { ContractStep } from "../../types/contracts";

interface EditStepModalProps {
  step: ContractStep;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStep: ContractStep) => Promise<void>;
}

export default function EditStepModal({ step, isOpen, onClose, onSave }: EditStepModalProps) {
  const [formData, setFormData] = useState<ContractStep>(step);
  const [loading, setLoading] = useState(false);

  // Atualiza o form se o step mudar
  useEffect(() => {
    setFormData(step);
  }, [step]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-70 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Editar Etapa</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Título */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Título</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Responsável */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Responsável</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Data Início */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Início</label>
              <input
                type="date"
                required
                className="w-full border rounded-lg p-2 text-sm text-slate-900 outline-none"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            
            {/* Data Fim */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Previsão Fim</label>
              <input
                type="date"
                required
                className="w-full border rounded-lg p-2 text-sm text-slate-900 outline-none"
                value={formData.expectedEndDate}
                onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}