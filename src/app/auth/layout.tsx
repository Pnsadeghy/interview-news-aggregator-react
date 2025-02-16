export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="container mx-auto px-4">
          <div className="min-h-screen py-8 flex items-center justify-center" >
              <div className="w-96" >
                  {children}
              </div>
          </div>
      </div>
  );
}
