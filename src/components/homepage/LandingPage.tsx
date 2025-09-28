import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import MarketplaceSection from './MarketplaceSection';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MarketplaceSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
