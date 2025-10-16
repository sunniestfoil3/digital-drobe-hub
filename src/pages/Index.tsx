import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LogoCarousel from '@/components/LogoCarousel';
import FeaturedItems from '@/components/FeaturedItems';
import TopCreators from '@/components/TopCreators';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LogoCarousel />
      <FeaturedItems />
      <TopCreators />
      <Footer />
    </div>
  );
};

export default Index;
