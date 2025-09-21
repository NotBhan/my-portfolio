
'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type PasswordDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isVerifying: boolean;
};

export default function PasswordDialog({ isOpen, onClose, onConfirm, isVerifying }: PasswordDialogProps) {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogDescription>
            Please enter your password to save the changes.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isVerifying}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
