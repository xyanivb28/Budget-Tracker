import { Command } from "lucide-react";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <header className="my-12">
        <div className="flex flex-row gap-4 text-4xl items-center">
          <div className="h-12 w-12 rounded-md bg-gray-400/30 flex items-center justify-center">
            <Command height={42} width={42} />
          </div>
          Budget Tracker
        </div>
      </header>
      {children}
    </div>
  );
}
