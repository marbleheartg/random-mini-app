import clientErrorHandling from "@/lib/clientErrorsReporting"
import Providers from "@/lib/providers"
import { store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import axios from "axios"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"

export default function App() {
  useEffect(() => {
    clientErrorHandling()
    ;(async function () {
      try {
        const { user, client } = await sdk.context

        const capabilities = await sdk.getCapabilities()

        updateStore({ user, client, capabilities })
      } catch (error) {}

      try {
        if (store.getState().capabilities?.includes("back")) await sdk.back.enableWebNavigation()
      } catch (error) {}

      try {
        await sdk.actions.ready({ disableNativeGestures: true })
      } catch (error) {}

      try {
        const { token: session } = await sdk.quickAuth.getToken()
        updateStore({ session })
        axios.post("/api/login", {}, { headers: { Authorization: `Bearer ${session}` } })
      } catch (error) {}
    })()
  }, [])

  return (
    <div onDragStart={e => e.preventDefault()}>
      <Providers>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Providers>
    </div>
  )
}
