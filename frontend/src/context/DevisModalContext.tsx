import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { DevisModal } from "../components/devis/DevisModal"

type DevisModalContextValue = {
  openDevis: () => void
  closeDevis: () => void
}

const DevisModalContext = createContext<DevisModalContextValue | null>(null)

export function DevisModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openDevis = useCallback(() => setOpen(true), [])
  const closeDevis = useCallback(() => setOpen(false), [])
  const value = useMemo(
    () => ({ openDevis, closeDevis }),
    [openDevis, closeDevis],
  )

  return (
    <DevisModalContext.Provider value={value}>
      {children}
      <DevisModal open={open} onClose={closeDevis} />
    </DevisModalContext.Provider>
  )
}

/** Hook exporté à côté du provider — motif courant React Context. */
// eslint-disable-next-line react-refresh/only-export-components
export function useDevisModal() {
  const ctx = useContext(DevisModalContext)
  if (!ctx) {
    throw new Error("useDevisModal doit être utilisé dans DevisModalProvider")
  }
  return ctx
}
