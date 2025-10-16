import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getItemById, type Item } from '@/lib/marketplace';
import { useMarketplace } from '@/hooks/useMarketplace';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaArrowLeft, FaShoppingCart, FaCheck } from 'react-icons/fa';

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const { userProfile, purchaseItem, hasItem, connectWallet, isLoggedIn } = useMarketplace();

  useEffect(() => {
    if (id) {
      const foundItem = getItemById(id);
      setItem(foundItem);
      
      if (!foundItem) {
        toast.error('Item não encontrado');
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handlePurchase = () => {
    if (!item) return;

    if (!isLoggedIn) {
      toast.error('Conecte sua carteira primeiro');
      connectWallet();
      return;
    }

    if (hasItem(item.id)) {
      toast.info('Você já possui este item');
      return;
    }

    const confirmed = window.confirm(
      `Deseja comprar ${item.name} por ${item.price} ETH?`
    );

    if (confirmed) {
      const success = purchaseItem(item.id);
      if (success) {
        toast.success('Item adquirido! Ele está no seu inventário.');
        setTimeout(() => {
          navigate('/perfil');
        }, 1500);
      }
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-accent text-4xl mb-4">Carregando...</div>
        </div>
      </div>
    );
  }

  const isOwned = hasItem(item.id);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 font-heading"
          >
            <FaArrowLeft />
            Voltar para explorar
          </button>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-glow-cyan">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {item.badge && (
                <div className="absolute top-6 right-6 bg-accent text-accent-foreground px-4 py-2 rounded-full font-heading font-semibold">
                  {item.badge}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-display font-bold mb-4">{item.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground font-body text-lg">
                  <span>Criado por</span>
                  <span className="text-accent font-heading font-semibold">{item.creator}</span>
                </div>
              </div>

              <div className="border-t border-b border-border py-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-display text-accent">{item.price}</span>
                  <span className="text-2xl text-muted-foreground">ETH</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-3">Descrição</h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 space-y-3">
                {isOwned ? (
                  <Button 
                    size="lg" 
                    className="w-full gap-2" 
                    disabled
                  >
                    <FaCheck />
                    Você já possui este item
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full gap-2"
                    onClick={handlePurchase}
                  >
                    <FaShoppingCart />
                    Comprar Item
                  </Button>
                )}
                
                {!isLoggedIn && !isOwned && (
                  <p className="text-sm text-center text-muted-foreground font-body">
                    Conecte sua carteira para realizar a compra
                  </p>
                )}
              </div>

              {/* Additional Info */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <h3 className="font-heading font-semibold text-lg">Informações do Item</h3>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span>Moda Digital NFT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain:</span>
                    <span>Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-accent">Disponível</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemDetails;
