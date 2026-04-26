import { Link } from "react-router-dom"
import type { ReactNode } from "react"

type LegalPageShellProps = {
  title: string
  children: ReactNode
}

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link
        to="/"
        className="font-body text-sm font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
      >
        ← Retour à l&apos;accueil
      </Link>
      <h1 className="mt-8 font-display text-3xl font-extrabold text-savsor-blue sm:text-4xl">
        {title}
      </h1>
      <div className="mt-8 space-y-6 font-body text-sm leading-relaxed text-gray-700 sm:text-[15px]">
        {children}
      </div>
    </article>
  )
}
