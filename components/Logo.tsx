import { Command } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-row gap-4 text-4xl items-center">
      <div className="h-12 w-12 rounded-md bg-gray-400/30 flex items-center justify-center">
        <Command height={42} width={42} />
      </div>
      Budget Tracker
    </div>
  );
}
