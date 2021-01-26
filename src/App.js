import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import routes from "configs/routes"

function App() {
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  return (
    <Router>
      <Suspense fallback={loading()}>
        <Switch>
          {
            routes.map((value, index) => {              
              return (
                <Route key={index} path={value.path} component={value.component} {...value} />
              )
            })
          }
        </Switch>
      </Suspense>
    </Router>
  )
}
export default App;
