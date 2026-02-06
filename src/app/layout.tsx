import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  title: "Gerenciamento de Projetos",
  description: "Developed by Gabryell Leal Rocha",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        {/* O Toaster gerencia todos os alertas flutuantes */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
