/** Contenu aligné sur l’annexe cahier des charges + slider accueil */

export type CellKind = "yes" | "no" | "option" | "text"

export type ComparisonCell = {
  kind: CellKind
  /** Surtout pour kind === "text" */
  label?: string
}

export type ComparisonRow = {
  id: string
  label: string
  /** Économique (Éco) */
  eco: ComparisonCell
  standard: ComparisonCell
  luxe: ComparisonCell
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "cartons",
    label: "Livraison préalable de cartons & adhésifs",
    eco: { kind: "yes" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "protection",
    label: "Protection mobilier, sols & parties communes",
    eco: { kind: "yes" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "tableaux",
    label: "Protection tableaux, miroirs & literie",
    eco: { kind: "yes" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "penderie",
    label: "Mise en penderies (cintres)",
    eco: { kind: "yes" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "electro",
    label: "Déconnexion / reconnexion appareils électriques (offert)",
    eco: { kind: "yes" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "fragiles",
    label: "Emballage & déballage des objets fragiles",
    eco: { kind: "no" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "montage",
    label: "Démontage & remontage du mobilier",
    eco: { kind: "option" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "stationnement",
    label: "Formalités de stationnement",
    eco: {
      kind: "text",
      label: "Si nécessaire (réservation)",
    },
    standard: {
      kind: "text",
      label: "Si nécessaire (réservation)",
    },
    luxe: {
      kind: "text",
      label: "Chargement & livraison",
    },
  },
  {
    id: "retrait",
    label: "Retrait des protections & emballages en fin",
    eco: { kind: "no" },
    standard: { kind: "yes" },
    luxe: { kind: "yes" },
  },
  {
    id: "tous_cartons",
    label: "Emballage de tous les effets en cartons",
    eco: { kind: "no" },
    standard: { kind: "no" },
    luxe: { kind: "yes" },
  },
  {
    id: "deballage",
    label: "Déballage complet à l’arrivée",
    eco: { kind: "no" },
    standard: { kind: "no" },
    luxe: { kind: "yes" },
  },
]

export const FORMULE_SLIDER = [
  {
    key: "eco" as const,
    name: "Éco",
    hint: "Budget maîtrisé",
    vous: 50,
    nous: 50,
    desc: "Vous emballagez une partie des cartons ; nous sécurisons le chargement, le transport et la manutention lourde.",
  },
  {
    key: "standard" as const,
    name: "Standard",
    hint: "Le meilleur équilibre",
    vous: 30,
    nous: 70,
    desc: "Prise en charge large : protection des meubles, démontage/remontage courant, coordination complète du jour J.",
  },
  {
    key: "luxe" as const,
    name: "Luxe",
    hint: "Confort maximal",
    vous: 10,
    nous: 90,
    desc: "Formule premium : emballage, étiquetage, remise en place, objets fragiles — vous vous concentrez sur l’essentiel.",
  },
] as const
