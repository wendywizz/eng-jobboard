import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Frontend from "Frontend"

function App() {
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  return (
    <Router>
      <Suspense fallback={loading()}>
        <Switch>
          <Frontend />
        </Switch>
      </Suspense>
    </Router>
  )
}
export default App;
