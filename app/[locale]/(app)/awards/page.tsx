import { AwardsSection } from "@/components/awards/awards-section"
import { Container } from "@/components/ui/container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Awards | Achievements",
  description:
    "A collection of poems exploring memory, identity, love, nature, and the quiet moments that shape human experience.",
}

export default function page() {
  return (
    <Container>
      <AwardsSection />
    </Container>
  )
}
