export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      (groups) layout.tsx
      {children}
    </div>
  );
}
