import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserProfile } from "@clerk/nextjs";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserProfileDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
