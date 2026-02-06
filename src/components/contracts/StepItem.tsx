"use client";

import { useState } from "react";
import { ContractStep, EtapaStatus } from "../../types/contracts";

export interface StepItemProps {
  etapa: ContractStep;
  isAdmin?: boolean; // Define se exibe o select ou apenas o texto do status
  onStatusChange?: (newStatus: EtapaStatus) => void;
  onEdit?: (etapa: ContractStep) => void;
}

export default function StepItem({
  etapa,
  isAdmin = false,
  onStatusChange,
  onEdit,
}: StepItemProps) {
  const statusConfig = {
    PROGRAMADA: {
      label: "Programada",
      color: "border-l-4 border-slate-300 bg-slate-50 text-slate-600",
    },
    EM_ANDAMENTO: {
      label: "Em Andamento",
      color: "border-l-4 border-blue-500 bg-blue-50 text-blue-700",
    },
    CONCLUIDA: {
      label: "Concluída",
      color: "border-l-4 border-green-500 bg-green-50 text-green-700",
    },
    CANCELADA: {
      label: "Cancelada",
      color: "border-l-4 border-red-500 bg-red-50 text-red-700",
    },
  };

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg shadow-sm border border-slate-100 transition-all ${statusConfig[etapa.status].color}`}
    >
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

      <div className="flex flex-row items-end gap-2">
        {/* BOTÃO DE EDITAR (Lápis) */}
        {isAdmin && onEdit && (
          <button 
            onClick={() => onEdit(etapa)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar dados da etapa"
          >
            {/* Ícone Lápis (Heroicons) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
        )}
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
