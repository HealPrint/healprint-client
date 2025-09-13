import Header from './Header';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
