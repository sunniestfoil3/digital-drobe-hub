import creator1 from '@/assets/creator-1.jpg';
import creator2 from '@/assets/creator-2.jpg';
import creator3 from '@/assets/creator-3.jpg';

interface CreatorCardProps {
  image: string;
  name: string;
  description: string;
  className?: string;
}

const CreatorCard = ({ image, name, description, className = '' }: CreatorCardProps) => {
  return (
    <div
      className={`group relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:shadow-glow-cyan overflow-hidden ${className}`}
    >
      {/* Spotlight effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-background" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-heading font-semibold mb-2">{name}</h3>
          <p className="text-muted-foreground font-body">{description}</p>
        </div>
      </div>
    </div>
  );
};

const TopCreators = () => {
  const creators = [
    {
      image: creator1,
      name: 'Luna Cyber',
      description: 'Especialista em moda holográfica e designs futuristas',
    },
    {
      image: creator2,
      name: 'Neon Blade',
      description: 'Criador de streetwear cyberpunk e acessórios tech',
    },
    {
      image: creator3,
      name: 'Aurora Matrix',
      description: 'Designer de peças exclusivas com tecnologia AR',
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-card/20 to-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Criadores em <span className="text-accent">Ascensão</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Conheça os artistas que estão revolucionando a moda digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {creators.map((creator, index) => (
            <CreatorCard
              key={index}
              {...creator}
              className={index === 1 ? 'md:col-span-2 lg:col-span-1' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreators;
