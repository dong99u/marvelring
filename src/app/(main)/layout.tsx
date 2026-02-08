import { Header, Navigation, Footer } from '@/components/layout';
import { createClient } from '@/lib/supabase/server';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: collections } = await supabase
    .from('collection')
    .select('brand_name, slug')
    .order('display_order');

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <Navigation collections={collections ?? []} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
