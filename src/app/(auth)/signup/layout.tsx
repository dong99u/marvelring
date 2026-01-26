export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {children}
    </div>
  )
}
