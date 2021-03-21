import React from "react"
import Frontend from "Frontend"
import { AuthProvider } from "Frontend/utils/hook/useAuth"

function App() {
  return (
    <AuthProvider>
      <Frontend />
    </AuthProvider>
  )
}
export default App;