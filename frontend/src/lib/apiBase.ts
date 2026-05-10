/**
 * En production (LWS, etc.), l’API n’est pas sur le même hôte que les fichiers statiques.
 * Définir VITE_API_URL (ex. https://api.savsor-transport.com) avant `npm run build`.
 * En local, laisser vide : le proxy Vite (vite.config) redirige /api vers le backend.
 */
const raw = import.meta.env.VITE_API_URL as string | undefined
const base = (raw ?? "").replace(/\/$/, "")

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  if (!base) return p
  return `${base}${p}`
}
