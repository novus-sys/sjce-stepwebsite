import { HeroV2 } from '@/components/sections/HeroV2';
import { ImpactMetrics } from '@/components/sections/ImpactMetrics';
import { WhyChooseUsV2 } from '@/components/sections/WhyChooseUsV2';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { StartupsShowcase } from '@/components/sections/StartupsShowcase';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { PartnersNetwork } from '@/components/sections/PartnersNetwork';
import { PremiumCTA } from '@/components/sections/PremiumCTA';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroV2 />
      <ImpactMetrics />
      <WhyChooseUsV2 />
      <SuccessStories />
      <ProcessTimeline />
      <StartupsShowcase />
      <TestimonialsCarousel />
      <PartnersNetwork />
      <PremiumCTA />
    </div>
  );
}

