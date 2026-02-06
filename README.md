# 🏗️ Platform Arq - Frontend

Este é o repositório do frontend da **Platform Arq**, uma solução SaaS *multi-tenancy* moderna, desenvolvida com [Next.js](https://nextjs.org).

---

## 🚀 Getting Started

Primeiro, instale as dependências:

```bash
npm install
# ou
yarn install
```

Em seguida, configure suas variáveis de ambiente (veja a seção abaixo) e inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 🌍 Matriz de Ambientes e APIs

Para garantir a escalabilidade e o suporte a múltiplos clientes (*multi-tenancy*), utilizamos endpoints distintos para cada estágio do ciclo de vida:

| Ambiente       | Ramo (Branch) | Endpoint da API                                   | Objetivo |
|---------------|---------------|--------------------------------------------------|----------|
| Local         | feature/*     | http://localhost:8080                            | Desenvolvimento ativo e testes unitários |
| Dev (Cloud)   | develop       | https://dev-api-platform-arq.onrender.com        | Integração contínua (CI) e testes de ambiente |
| HML           | main          | https://hml-api-tratti-arq.onrender.com          | Homologação, validação de UI/UX e aceite final |

---

## ⚙️ Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para definir o backend de consumo.

Crie um arquivo `.env.local` na raiz do projeto para desenvolvimento local:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Atenção:**  
Em produção e homologação, essas variáveis são injetadas diretamente pelo provedor de host (Vercel / Render).

---

## 🚦 Fluxo de Contribuição (CI/CD)

Adotamos uma estratégia **Backend-First** para garantir a disponibilidade dos serviços e a vitalidade da plataforma:

- **Desenvolvimento Isolado**  
  Não deve haver desenvolvimento direto voltado para os ambientes `develop` ou `UAT` (HML).  
  Alterações são feitas apenas via **Pull Request (PR)**.

- **Sincronia de Deploy**  
  Caso uma nova funcionalidade dependa de alterações no banco de dados ou novos endpoints:
  - O PR do **Backend** deve ser aprovado e deployado primeiro.
  - O PR do **Frontend** só deve ser aberto após a confirmação de que os testes da API estão passando no ambiente alvo.

- **Segurança**  
  A comunicação com a API utiliza tokens **JWT**, armazenados via `js-cookie` sob o nome:

  ```text
  user_token
  ```

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14+** (App Router)
- **Axios** (Integração com API)
- **Tailwind CSS** (Estilização)
- **Lucide React** (Ícones)
- **Zustand / React Query** (Gerenciamento de Estado — se aplicável)

---

## 📖 Saiba Mais

Para entender melhor a arquitetura da **Platform Arq**, consulte a documentação do Swagger no backend de desenvolvimento:

👉 https://dev-api-platform-arq.onrender.com/swagger-ui.html
