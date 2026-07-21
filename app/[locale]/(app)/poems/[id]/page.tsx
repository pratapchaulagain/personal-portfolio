import { notFound } from "next/navigation"
import { getPoem, type LocaleType } from "@/data/poems"
import { Container } from "@/components/ui/container"
import { SinglePoemView } from "@/components/poems/single-poem-view"
import type { Metadata } from "next"

type PageProps = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params
  const poem = getPoem(locale as LocaleType, Number(id))

  if (!poem) {
    return {
      title: "Poem not found",
    }
  }

  return {
    title: poem.title,
    description: poem.content.slice(0, 160),
  }
}

export default async function PoemPage({ params }: PageProps) {
  const { locale, id } = await params
  const poem = getPoem(locale as LocaleType, Number(id))

  if (!poem) {
    notFound()
  }

  return (
    <Container className="py-8 sm:py-10">
      <SinglePoemView poem={poem} />
    </Container>
  )
}
