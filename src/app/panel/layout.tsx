export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Panel</h1>

      <div>{children}</div>
    </div>
  );
}
