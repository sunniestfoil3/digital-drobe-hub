import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaWallet, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { useMarketplace } from '@/hooks/useMarketplace';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userProfile, connectWallet, disconnectWallet, isLoggedIn } = useMarketplace();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Explorar', href: '/' },
    { label: 'Criadores', href: '/#creators' },
    { label: 'Comunidade', href: '/#community' },
  ];

  const handleConnectWallet = () => {
    connectWallet();
    toast.success('Carteira conectada com sucesso!');
  };

  const handleDisconnectWallet = () => {
    if (window.confirm('Deseja realmente desconectar sua carteira?')) {
      disconnectWallet();
      toast.info('Carteira desconectada');
      navigate('/');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="font-display text-2xl font-bold text-primary hover:text-accent transition-colors">
            MetaDrobe
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-accent transition-colors font-heading text-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  className="gap-2"
                  onClick={() => navigate('/perfil')}
                >
                  <FaUser />
                  {userProfile?.username}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleDisconnectWallet}
                  title="Desconectar"
                >
                  <FaSignOutAlt />
                </Button>
              </>
            ) : (
              <Button className="gap-2" onClick={handleConnectWallet}>
                <FaWallet />
                Conectar Carteira
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-foreground hover:text-accent transition-colors font-heading text-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn ? (
              <>
                <Button className="w-full gap-2" onClick={() => { navigate('/perfil'); setIsMobileMenuOpen(false); }}>
                  <FaUser />
                  {userProfile?.username}
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={handleDisconnectWallet}>
                  <FaSignOutAlt />
                  Desconectar
                </Button>
              </>
            ) : (
              <Button className="w-full gap-2" onClick={handleConnectWallet}>
                <FaWallet />
                Conectar Carteira
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
