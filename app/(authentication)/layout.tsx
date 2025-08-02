import Logo from "@/components/Logo";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <header className="my-12">
        <Logo />
      </header>
      {children}
    </div>
  );
}
