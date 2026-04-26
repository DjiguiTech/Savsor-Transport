import { Outlet } from "react-router-dom"
import { DevisModalProvider } from "../context/DevisModalContext"
import { TopBar } from "../components/layout/TopBar"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { FloatingCallButton } from "../components/layout/FloatingCallButton"

export function MainLayout() {
  return (
    <DevisModalProvider>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCallButton />
    </DevisModalProvider>
  )
}
