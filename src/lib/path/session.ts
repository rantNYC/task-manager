import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function getSessionOrRedirect(): Promise<{ email: string; name: string }> {
  const session = await getServerSession();
  if (!session?.user?.email || !session?.user?.name) redirect('/');

  return {
    email: session.user.email, // now guaranteed to be string
    name: session.user.name,
  };
}