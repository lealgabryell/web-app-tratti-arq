'use client';

import { EtapaStatus, StepItemProps } from '../../types/contracts';


export default function StepItem({ etapa, isAdmin = false, onStatusChange }: StepItemProps) {
  
  const statusConfig = {
    PROGRAMADA: { label: "Programada", color: "border-l-4 border-slate-300 bg-slate-50 text-slate-600" },
    EM_ANDAMENTO: { label: "Em Andamento", color: "border-l-4 border-blue-500 bg-blue-50 text-blue-700" },
    CONCLUIDA: { label: "Concluída", color: "border-l-4 border-green-500 bg-green-50 text-green-700" },
    CANCELADA: { label: "Cancelada", color: "border-l-4 border-red-500 bg-red-50 text-red-700" },
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded-lg shadow-sm border border-slate-100 transition-all ${statusConfig[etapa.status].color}`}>
      <div>
        <p className="font-semibold text-slate-800">{etapa.title}</p>
        <div className="flex gap-3 mt-1">
          <p className="text-[10px] uppercase tracking-wider font-medium opacity-70">
            👤 {etapa.responsible}
          </p>
          <p className="text-[10px] uppercase tracking-wider font-medium opacity-70">
            📅 Prev: {new Date(etapa.expectedEndDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {isAdmin ? (
          <select
            defaultValue={etapa.status}
            onChange={(e) => onStatusChange?.(e.target.value as EtapaStatus)}
            className="text-xs p-1.5 border rounded-md bg-white font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer shadow-sm"
          >
            <option value="PROGRAMADA">Programada</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDA">Concluída</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        ) : (
          <span className="text-[10px] font-bold uppercase px-2 py-1 bg-white/50 rounded shadow-sm">
            {statusConfig[etapa.status].label}
          </span>
        )}
      </div>
    </div>
  );
}