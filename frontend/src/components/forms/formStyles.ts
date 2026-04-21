/** Classes communes aux formulaires contact & devis (Tailwind) */
export const formStyles = {
  label: "block font-body text-sm font-semibold text-gray-800",
  input:
    "mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2.5 font-body text-sm outline-none ring-savsor-green/30 transition focus:border-savsor-green focus:ring-2",
  textarea:
    "mt-1.5 w-full resize-y rounded-md border border-gray-200 px-3 py-2.5 font-body text-sm outline-none ring-savsor-green/30 transition focus:border-savsor-green focus:ring-2",
  select:
    "mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 font-body text-sm outline-none ring-savsor-green/30 transition focus:border-savsor-green focus:ring-2",
  error: "mt-1 font-body text-xs text-red-600",
} as const
