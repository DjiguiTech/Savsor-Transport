import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { HomePage } from "./pages/HomePage"
import { DemenagementPage } from "./pages/DemenagementPage"
import { TransportPage } from "./pages/TransportPage"
import { LocationPage } from "./pages/LocationPage"
import { NosFormulesPage } from "./pages/NosFormulesPage"
import { ContactPage } from "./pages/ContactPage"
import { QuiSommesNousPage } from "./pages/QuiSommesNousPage"
import { MentionsLegalesPage } from "./pages/MentionsLegalesPage"
import { PolitiqueConfidentialitePage } from "./pages/PolitiqueConfidentialitePage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/demenagement" element={<DemenagementPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/nos-formules" element={<NosFormulesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNousPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialitePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
