import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './Components/DefaultComponent/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from './Router'

import React, { Fragment} from 'react'

function App() {
  return (
    <div style={{ width: '100%'}}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>

  </div>
  );
}

export default App;
