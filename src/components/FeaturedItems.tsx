import { useState } from 'react';
import jacketImage from '@/assets/jacket-cyber.jpg';
import sneakersImage from '@/assets/sneakers-cyber.jpg';
import dressImage from '@/assets/dress-holo.jpg';

interface ItemCardProps {
  image: string;
  name: string;
  price: string;
  creator: string;
  badge?: string;
  className?: string;
}

const ItemCard = ({ image, name, price, creator, badge, className = '' }: ItemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-glow-cyan ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
          {badge}
        </div>
      )}
      
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
            <div className="text-sm text-muted-foreground font-body">Criado por</div>
            <div className="text-lg font-heading text-accent">{creator}</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-display text-accent">{price}</span>
          <span className="text-sm text-muted-foreground">ETH</span>
        </div>
      </div>
    </div>
  );
};

const FeaturedItems = () => {
  const items = [
    {
      image: jacketImage,
      name: 'Cyber Bomber Jacket',
      price: '0.8',
      creator: 'NeoDesigner',
      badge: 'Exclusivo',
    },
    {
      image: sneakersImage,
      name: 'Anti-Gravity Sneakers',
      price: '1.2',
      creator: 'FutureKicks',
      badge: 'Novo',
    },
    {
      image: dressImage,
      name: 'Holographic Dress',
      price: '2.5',
      creator: 'DigitalCouture',
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Tendências do <span className="text-accent">Metaverso</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Descubra as peças mais exclusivas e desejadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              {...item}
              className={index === 1 ? 'md:translate-y-8' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
