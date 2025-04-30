
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface MobileMenuToggleProps {
  onClick: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-40"
      onClick={onClick}
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
};

export default MobileMenuToggle;
