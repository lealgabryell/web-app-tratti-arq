"use client";
import { useState } from "react";
import ClientSelector from "../users/ClientSelector";
import { User } from "@/src/types/user";
import { createUser } from "@/src/services/users";
import { toast } from "react-hot-toast/headless";
import { createContract } from "@/src/services/contracts";
import {
  CreateContractRequest,
  NewContractModalProps,
} from "@/src/types/contracts";

export default function NewContractModal({ onClose }: NewContractModalProps) {
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalValue: 0,
    startDate: "",
    endDate: "",
    clientName: "",
    clientEmail: "",
  });

  const [, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpf: "",
    birthdate: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  // Para campos simples (nome, email, etc)
  const handleUserChange = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  // Para campos dentro de address
  const handleAddressChange = (field: string, value: string) => {
    setNewUser((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleFinalSubmit = async (
    userData: typeof newUser,
    contractRequest: CreateContractRequest,
  ) => {
    setLoading(true);
    try {
      let clientId = selectedClient?.id;

      if (!selectedClient) {
        // Montamos o objeto completo para o backend
        const payloadUser: Omit<User, "id"> = {
          ...userData,
          role: "CLIENT",
          active: true,
          // Garanta que o CPF que veio do seletor esteja aqui se necessário
        };

        const createdUser = await createUser(payloadUser as unknown as User);
        clientId = createdUser.id;
      }

      // Agora o clientId é garantidamente uma string
      await createContract({ ...contractRequest, clientId: clientId! });

      toast.success("Contrato e Cliente criados!");
      onClose();
    } catch (error) {
      toast.error("Erro ao criar contrato ou cliente: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparamos o objeto de contrato baseado no formData
    const contractRequest: CreateContractRequest = {
      title: formData.title,
      description: formData.description,
      totalValue: formData.totalValue,
      startDate: formData.startDate,
      endDate: formData.endDate,
      clientId: selectedClient?.id, // Pode ser undefined se for novo cliente
    };

    // Chamamos a função que faz a mágica da sequência
    await handleFinalSubmit(newUser as User, contractRequest);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl text-blue-600 font-bold mb-6">Novo Contrato</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lado Esquerdo: Dados do Contrato */}
          <div className="space-y-4">
            <input
              placeholder="Título do Contrato"
              required
              className="w-full text-zinc-700 p-2 border rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Descrição"
              className="w-full p-2 text-zinc-700 border rounded-lg h-24"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Valor Total (R$)"
              required
              className="w-full text-zinc-700 p-2 border rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, totalValue: Number(e.target.value) })
              }
            />

            <div className="flex gap-2">
              <input
                type="date"
                className="w-full text-zinc-700 p-2 border rounded-lg text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full p-2 text-zinc-700 border rounded-lg text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Lado Direito: Cliente */}
          <div className="space-y-4 text-zinc-700 bg-slate-50 p-4 rounded-xl">
            <ClientSelector
              onSelect={(user, cpfTyped) => {
                setSelectedClient(user);
                if (!user) {
                  // Se não encontrou, já joga o CPF para o objeto do novo usuário
                  handleUserChange("cpf", cpfTyped);
                }
              }}
            />

            {/* Dentro do Modal, se o CPF não existir */}
            {!selectedClient && (
              <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl space-y-3">
                <h4 className="text-sm font-bold text-blue-800">
                  Novo Cliente: Informações Obrigatórias
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Nome"
                    className="p-2 text-zinc-700 text-sm border rounded"
                    value={newUser.name}
                    onChange={(e) => handleUserChange("name", e.target.value)}
                  />
                  <input
                    placeholder="E-mail"
                    className="p-2 text-sm border rounded"
                    value={newUser.email}
                    onChange={(e) => handleUserChange("email", e.target.value)}
                  />
                  <input
                    placeholder="Senha Provisória"
                    type="password"
                    className="p-2 text-sm border rounded"
                    value={newUser.password}
                    onChange={(e) =>
                      handleUserChange("password", e.target.value)
                    }
                  />
                  <input
                    placeholder="Data de Aniversário"
                    type="date"
                    className="p-2 text-sm border rounded"
                    value={newUser.birthdate}
                    onChange={(e) =>
                      handleUserChange("birthdate", e.target.value)
                    }
                  />
                  <input
                    placeholder="Telefone"
                    className="p-2 text-sm border rounded"
                    value={newUser.phone}
                    onChange={(e) => handleUserChange("phone", e.target.value)}
                  />
                </div>

                <h5 className="text-[10px] font-bold text-slate-500 uppercase mt-2">
                  Endereço:
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    placeholder="CEP"
                    className="p-2 text-xs border rounded text-zinc-700"
                    value={newUser.address.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                  />
                  <input
                    placeholder="Rua"
                    className="col-span-2 p-2 text-xs border rounded"
                    value={newUser.address.street}
                    onChange={(e) =>
                      handleAddressChange("street", e.target.value)
                    }
                  />
                  <input
                    placeholder="Número"
                    className="col-span-2 p-2 text-xs border rounded"
                    value={newUser.address.number}
                    onChange={(e) =>
                      handleAddressChange("number", e.target.value)
                    }
                  />
                  <input
                    placeholder="Complemento"
                    className="col-span-2 p-2 text-xs border rounded"
                    value={newUser.address.complement}
                    onChange={(e) =>
                      handleAddressChange("complement", e.target.value)
                    }
                  />
                  <input
                    placeholder="Bairro"
                    className="col-span-2 p-2 text-xs border rounded"
                    value={newUser.address.neighborhood}
                    onChange={(e) =>
                      handleAddressChange("neighborhood", e.target.value)
                    }
                  />
                  <input
                    placeholder="Cidade"
                    className="col-span-2 p-2 text-xs border rounded"
                    value={newUser.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                  />
                  <input
                    placeholder="Estado"
                    className="col-span-2 p-2 text-xs border rounded"
                    value={newUser.address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 text-slate-500 font-bold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Criar Contrato
          </button>
        </div>
      </form>
    </div>
  );
}
