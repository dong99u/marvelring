import { Header, Navigation, Footer } from '@/components/layout';
import { createClient } from '@/lib/supabase/server';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const [{ data: collections }, { data: categories }] = await Promise.all([
    supabase.from('collection').select('brand_name, slug').order('display_order'),
    supabase.from('category').select('category_name, slug').order('display_order'),
  ]);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <Navigation collections={collections ?? []} categories={categories ?? []} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
