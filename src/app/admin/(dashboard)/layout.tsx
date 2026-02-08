import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function checkAdminAuth() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/admin/login');
  }

  // Check if user is admin in member table
  const { data: member, error: memberError } = await supabase
    .from('member')
    .select('role')
    .eq('email', user.email)
    .single();

  if (memberError || !member || member.role !== 'ROLE_ADMIN') {
    redirect('/admin/login?error=unauthorized');
  }

  return user;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkAdminAuth();

  return (
    <div className="min-h-screen bg-soft-grey">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-boutique-silver z-40 pt-safe">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            type="button"
            className="peer p-2 -ml-2 min-h-0"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <h1 className="text-base font-bold tracking-tight">MARVELRING ADMIN</h1>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="p-2 -mr-2 min-h-0 text-charcoal-light/60 hover:text-charcoal-light"
              aria-label="Logout"
            >
              <span className="material-symbols-outlined text-2xl">logout</span>
            </button>
          </form>
        </div>

        {/* Mobile Nav Drawer */}
        <nav className="absolute top-full left-0 w-64 bg-white border-r border-boutique-silver shadow-xl h-screen opacity-0 -translate-x-full peer-focus:opacity-100 peer-focus:translate-x-0 transition-all duration-300 pointer-events-none peer-focus:pointer-events-auto">
          <div className="p-6 space-y-1">
            <NavLink href="/admin" icon="dashboard">대시보드</NavLink>
            <NavLink href="/admin/users" icon="group">회원 관리</NavLink>
            <NavLink href="/admin/products" icon="inventory_2">상품 관리</NavLink>
            <NavLink href="/admin/categories" icon="category">카테고리 관리</NavLink>
            <NavLink href="/admin/collections" icon="collections">컬렉션 관리</NavLink>
            <NavLink href="/admin/notices" icon="campaign">공지사항 관리</NavLink>
          </div>
        </nav>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 w-64 h-screen bg-white border-r border-boutique-silver">
        <div className="p-8 border-b border-boutique-silver">
          <h1 className="text-sm font-bold tracking-[0.2em] text-charcoal-deep">
            MARVELRING
            <span className="block text-xs text-gold-muted mt-1 font-normal">ADMIN CONSOLE</span>
          </h1>
        </div>

        <nav className="p-6 space-y-1">
          <NavLink href="/admin" icon="dashboard">대시보드</NavLink>
          <NavLink href="/admin/users" icon="group">회원 관리</NavLink>
          <NavLink href="/admin/products" icon="inventory_2">상품 관리</NavLink>
          <NavLink href="/admin/categories" icon="category">카테고리 관리</NavLink>
          <NavLink href="/admin/collections" icon="collections">컬렉션 관리</NavLink>
          <NavLink href="/admin/notices" icon="campaign">공지사항 관리</NavLink>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-boutique-silver">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-muted/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-gold-muted">person</span>
              </div>
              <div className="text-xs">
                <div className="font-medium text-charcoal-deep">{user.email?.split('@')[0]}</div>
                <div className="text-charcoal-light/50">Admin</div>
              </div>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full min-h-0 h-9 px-4 text-xs font-medium border border-boutique-silver hover:bg-soft-grey transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 pb-safe">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal-light/70 hover:text-charcoal-deep hover:bg-soft-grey rounded-sm transition-all min-h-0 justify-start"
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      {children}
    </Link>
  );
}
