type PagePlaceholderProps = {
  title: string
  intro: string
}

export function PagePlaceholder({ title, intro }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-3xl font-extrabold text-savsor-blue sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl font-body text-gray-600">{intro}</p>
    </section>
  )
}
