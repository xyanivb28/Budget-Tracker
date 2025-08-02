import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { UserProfile } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  trigger: ReactNode;
}

export default function UserProfileDialog({ trigger }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="p-0 inline-block"
        style={{ width: "auto", maxWidth: "none" }}
      >
        <DialogTitle asChild>
          <VisuallyHidden>User Profile</VisuallyHidden>
        </DialogTitle>

        <UserProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
}
