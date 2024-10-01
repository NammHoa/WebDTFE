import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultConponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { convertLegacyProps } from 'antd/es/button'
function App() {

  // useEffect(() => {
  //   fetchApi()
  // },[])
  const fetchApi = async()=> {
    const res = axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    return (await res).data 
   }
   const query = useQuery({queryKey: ['todos'], queryFn: fetchApi})
   console.log('query', query)
   
  return (
    <div>
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          const Layout = route.isShowHeader ? DefaultConponent : Fragment
          return (
            <Route key={route.path} path={route.path} element = {
            <Layout>
            <Page />
            </Layout>
          }/>
          )
        })}
=      </Routes>
    </Router>
    </div>
  )
}
export default App