import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInventory, type Item } from '@/lib/marketplace';
import { useMarketplace } from '@/hooks/useMarketplace';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FaStore, FaWallet } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, isLoggedIn } = useMarketplace();
  const [inventory, setInventory] = useState<Item[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      const items = getUserInventory();
      setInventory(items);
    }
  }, [isLoggedIn, userProfile]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-display font-bold">Acesso Restrito</h1>
              <p className="text-xl text-muted-foreground font-body">
                Conecte sua carteira para acessar seu perfil e inventário
              </p>
              <div className="pt-6">
                <Button size="lg" onClick={() => navigate('/')}>
                  <FaStore className="mr-2" />
                  Voltar para a loja
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Profile Header */}
          <div className="mb-16 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-cyan rounded-full border-4 border-accent mb-4">
              <FaWallet size={40} className="text-accent-foreground" />
            </div>
            <h1 className="text-5xl font-display font-bold">Meu Perfil</h1>
            <p className="text-xl text-accent font-heading">{userProfile?.username}</p>
            <div className="flex items-center justify-center gap-4 text-muted-foreground font-body">
              <span>{inventory.length} item{inventory.length !== 1 ? 's' : ''} no inventário</span>
            </div>
          </div>

          {/* Inventory Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-display font-bold">
                Meu Guarda-Roupa <span className="text-accent">Digital</span>
              </h2>
            </div>

            {inventory.length === 0 ? (
              <div className="text-center py-24 space-y-6">
                <div className="text-6xl mb-4">👔</div>
                <h3 className="text-2xl font-heading font-semibold">
                  Seu guarda-roupa digital está vazio
                </h3>
                <p className="text-lg text-muted-foreground font-body max-w-md mx-auto">
                  Explore a loja para adquirir novos itens e começar sua coleção exclusiva!
                </p>
                <div className="pt-4">
                  <Button size="lg" onClick={() => navigate('/')}>
                    <FaStore className="mr-2" />
                    Explorar Coleções
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inventory.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-glow-cyan cursor-pointer"
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    {item.badge && (
                      <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
                        {item.badge}
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4 z-10 bg-accent/10 backdrop-blur-sm text-accent px-3 py-1 rounded-full text-xs font-heading font-semibold border border-accent">
                      Possui
                    </div>
                    
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-body">
                          por {item.creator}
                        </span>
                        <span className="text-lg font-display text-accent">{item.price} ETH</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
