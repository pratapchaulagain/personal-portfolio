import { AboutSection } from "@/components/about/about-section"
import { Container } from "@/components/ui/container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Life and Literary Journey",
  description:
    "Pratap Chaulagain was born on Bhadra 3, 2064 BS, in the sacred soil of Kavrepalanchok district, the confluence of beauty and consciousness.",
}

export default function page() {
  return (
    <Container>
      <AboutSection />
    </Container>
  )
}
