// src/components/contracts/ClientSelector.tsx
import { useState } from 'react';
import { User } from '@/src/types/user';
import { getUserByCpf } from '@/src/services/users';

interface ClientSelectorProps {
  onSelect: (user: User | null, cpfTyped: string) => void;
}

export default function ClientSelector({ onSelect }: ClientSelectorProps) {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [foundUser, setFoundUser] = useState<User | null>(null);

  const handleSearch = async () => {
    if (!cpf || cpf.length < 11) return; // Validação básica de tamanho
    
    setLoading(true);
    setSearchDone(false);
    
    try {
      // CHAMADA AO SEU NOVO MÉTODO DO SERVICE
      const user = await getUserByCpf(cpf);
      
      if (user) {
        setFoundUser(user);
        onSelect(user, cpf);
      } else {
        setFoundUser(null);
        onSelect(null, cpf);
      }
    } catch (e) {
      console.error("Erro na busca de cliente:", e);
      setFoundUser(null);
      onSelect(null, cpf);
    } finally {
      setLoading(false);
      setSearchDone(true);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase">
        Buscar Cliente por CPF
      </label>
      <div className="flex gap-2">
        <input 
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Apenas números"
          value={cpf}
          maxLength={11}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} // Apenas números
        />
        <button 
          type="button" 
          onClick={handleSearch}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {loading ? '...' : '🔍'}
        </button>
      </div>

      {searchDone && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-300">
          {foundUser ? (
            <p className="text-[11px] text-green-600 font-bold italic">
              ✅ Cliente encontrado: {foundUser.name}
            </p>
          ) : (
            <p className="text-[11px] text-orange-600 font-bold italic">
              ⚠️ CPF não cadastrado. Preencha os dados abaixo:
            </p>
          )}
        </div>
      )}
    </div>
  );
}