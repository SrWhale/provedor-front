export function Container({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto md:px-48 2xl:px-10 px-2">{children}</div>;
}
