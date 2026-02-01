export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-soft-grey">
      {children}
      <footer className="mt-12 text-center pb-8">
        <p className="text-[11px] text-charcoal-deep/30 tracking-[0.5em] uppercase font-light">
          © 2024 MARVELRING ADMIN. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}
