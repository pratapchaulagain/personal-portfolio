import { AboutSection } from "@/components/about/about-section"
import { AwardsSection } from "@/components/awards/awards-section"
import { HeroSection } from "@/components/hero/hero-section"
import { PoemsSection } from "@/components/poems/poems-section"
import { Container } from "@/components/ui/container"

export default function page() {
  return (
    <Container className="z-10 overflow-hidden px-8 sm:px-4">
      <HeroSection />
      <PoemsSection />
      <AboutSection />
      <AwardsSection />
    </Container>
  )
}
