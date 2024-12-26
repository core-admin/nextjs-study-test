interface LayoutProps {
  children: React.ReactNode;
  child1: React.ReactNode;
  child2: React.ReactNode;
}

export default function Layout({ children, child1, child2 }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
      <div className="grid grid-cols-2 gap-5 p-5">
        {child1}
        {child2}
      </div>
    </div>
  );
}
