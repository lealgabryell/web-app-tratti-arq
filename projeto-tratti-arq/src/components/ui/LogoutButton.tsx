'use client';

import Cookie from 'js-cookie';

export default function LogoutButton() {

  const handleLogout = () => {
    // 1. Remove os cookies de autenticação
    Cookie.remove('user_token');
    Cookie.remove('user_role');

    // 2. Força o redirecionamento e limpa o estado do Next.js
    // Usar window.location.href é útil para garantir que o Middleware 
    // intercepte a nova requisição sem cache do lado do cliente.
    window.location.href = '/login';
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-sm font-medium text-red-600 hover:text-red-700 transition"
    >
      Sair do Sistema
    </button>
  );
}