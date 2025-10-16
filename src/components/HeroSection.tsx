import { Button } from '@/components/ui/button';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary leading-tight">
            Sua Identidade Digital,{' '}
            <span className="text-glow text-accent">Com Estilo</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-body">
            O marketplace definitivo para moda virtual. Compre, venda e colecione peças exclusivas para o seu avatar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg">
              Explorar Coleções
            </Button>
            <Button variant="outline" size="lg">
              Seja um Criador
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
