import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  // Adicionamos o await aqui para resolver a Promise dos cookies
  const cookieStore = await cookies();
  
  const token = cookieStore.get('user_token')?.value;
  const role = cookieStore.get('user_role')?.value;

  // Se não houver token, manda para o login
  if (!token) {
    redirect('/login');
  }

  // Se houver token, redireciona baseado no cargo
  if (role === 'ADMIN') {
    redirect('/admin');
  }

  // Caso contrário (ex: CLIENT), vai para a home
  redirect('/home');
}