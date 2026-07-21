import { Footer } from "@/components/layouts/footer"
import { Navbar } from "@/components/layouts/navbar"
import { BackToTop } from "@/components/shared/back-to-top"
import { ScaleLeft, ScaleRight } from "@/components/hero/scale"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-[968px]">
      <ScaleRight />
      <ScaleLeft />
      <Navbar />
      {children}
      <Footer />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[calc(--spacing(24)+env(safe-area-inset-bottom,0))] bg-linear-to-b from-transparent from-[calc(env(safe-area-inset-bottom,0%))] to-background mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]"></div>
      <BackToTop />
    </div>
  )
}
