import HeroBanner from '@/components/HeroBanner';
import ProjectsSection from '@/components/ProjectsSection';
import PropertiesSection from '@/components/PropertiesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import NewsSection from '@/components/NewsSection';
import ConsultForm from '@/components/ConsultForm';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      <ProjectsSection />
      <PropertiesSection />
      <WhyChooseUs />
      <NewsSection />
      <ConsultForm />
    </div>
  );
}
