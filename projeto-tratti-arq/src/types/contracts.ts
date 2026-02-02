export type ContractStatus = 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED' | 'CANCELED';

export type EtapaStatus = 'PROGRAMADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';

export interface ContractStep {
  id: string;
  title: string;
  startDate: string;
  expectedEndDate: string;
  status: EtapaStatus;
  responsible: string;
}

export interface ContractResponse {
  id: string;
  title: string;
  description: string;
  status: ContractStatus;
  totalValue: number;
  startDate: string;
  endDate: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  etapas?: ContractStep[];
}


export interface StepItemProps {
  etapa: ContractStep;
  isAdmin?: boolean; // Define se exibe o select ou apenas o texto do status
  onStatusChange?: (newStatus: EtapaStatus) => void;
}

export interface CreateContractStepRequest {
  title: string;
  startDate: string; // ISO date YYYY-MM-DD
  expectedEndDate: string; // ISO date YYYY-MM-DD
  status: EtapaStatus;
  responsible: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CreateContractRequest {
  title: string;
  description: string;
  totalValue: number;
  startDate: string;
  endDate: string;
  clientId?: string; 
}

export interface NewContractModalProps {
  onClose: () => void;
  onSave: (contract: ContractResponse) => void; // Ou o tipo específico do seu contrato
}