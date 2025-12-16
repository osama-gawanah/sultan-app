import { HeroSection } from "@/components/hero-section"
import { SocialProof } from "@/components/social-proof"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { LeadershipSection } from "@/components/leadership"
import { ModulesSection } from "@/components/modules-section"
import { HowItWorks } from "@/components/how-it-works"
import { WhySultanAverroes } from "@/components/why-sultan-averroes"

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-background relative overflow-hidden pb-0">
        <div className="relative z-10">
          <main id="home" className="mx-auto relative">
            <HeroSection />
            {/* <div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div> */}
          </main>

     

          <AnimatedSection id="features" className="relative z-10 max-w-[1320px] mx-auto mt-8 " delay={0.2}>
            <ModulesSection />
          </AnimatedSection>

          <AnimatedSection id="why-sultan" className="relative z-10 max-w-[1320px] mx-auto mt-8 " delay={0.2}>
            <WhySultanAverroes />
          </AnimatedSection>

          {/* <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto " delay={0.2}>
            <HowItWorks />
          </AnimatedSection> */}


          <AnimatedSection className="relative z-10" delay={0.1}>
            <SocialProof />
          </AnimatedSection>

          <AnimatedSection id="team" className="relative z-10 max-w-[1320px] mx-auto mt-8 " delay={0.2}>
            <LeadershipSection />
          </AnimatedSection>
          <AnimatedSection id="contact" className="relative z-10 max-w-[1320px] mx-auto mt-8 " delay={0.2}>
            <CTASection />
          </AnimatedSection>
          <AnimatedSection  className="relative z-10 max-w-[1320px] mx-auto mt-8 " delay={0.2}>
            <FooterSection />
          </AnimatedSection>
        </div>
      </div>
  )
}
