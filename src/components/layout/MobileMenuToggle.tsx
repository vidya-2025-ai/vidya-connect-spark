
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuToggleProps {
  onClick: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick }) => {
  return (
    <div className="fixed top-4 left-4 z-30 md:hidden">
      <Button variant="outline" size="icon" onClick={onClick}>
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileMenuToggle;
