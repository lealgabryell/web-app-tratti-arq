import { api } from "./api";
import { ContractResponse, ContractStep, CreateContractRequest, CreateContractStepRequest } from "../types/contracts";
import Cookie from "js-cookie";

export const getContracts = async (): Promise<ContractResponse[]> => {
  const token = Cookie.get("tratti_token");

  const { data } = await api.get<ContractResponse[]>("/api/contracts", {
    headers: {
      // Aqui enviamos o token exatamente como o cURL do Swagger exige
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Cancelar contrato
export const cancelContract = async (id: string) => {
  await api.patch(`/api/contracts/${id}/cancel`);
};

// Alterar status da etapa
export const updateStepStatus = async (
  contractId: string,
  stepId: string,
  status: string,
) => {
  await api.patch(
    `/api/contracts/${contractId}/steps/${stepId}/status?status=${status}`,
  );
};

// Criar nova etapa
export const createStep = async (contractId: string, stepData: CreateContractStepRequest) => {
  const { data } = await api.post(
    `/api/contracts/${contractId}/steps`,
    stepData,
  );
  return data;
};

export const getContractSteps = async (contractId: string): Promise<ContractStep[]> => {
  const { data } = await api.get<ContractStep[]>(`/api/contracts/${contractId}/steps`);
  return data;
};

export const createContract = async (contractData: CreateContractRequest) => {
  const { data } = await api.post('/api/contracts', contractData);
  return data;
};
