import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultConponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService'
import {useDispatch, useSelector} from 'react-redux'
import Loading from './components/LoadingComponent/Loading'
import { resetUser, updateUser } from './redux/slides/userSlide'
function App() {

  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsPending(true)
    const {storageData, decoded} = handleDecoded()
          if (decoded?.id) {
              handleGetDetailsUser(decoded?.id, storageData)
          }
          setIsPending(false)

  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)){
        storageData = JSON.parse(storageData)
        decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use( async (config) => {
    const currentTime = new Date()
    const { decoded} = handleDecoded()
    let storageRefreshToken =localStorage.getItem('refresh_token')
    const refreshToken =JSON.parse(storageRefreshToken)
    const decodedRefreshToken =jwtDecode(refreshToken)
    if(decoded?.exp < currentTime.getTime() /1000){
      if(decodedRefreshToken?.exp > currentTime.getTime() /1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
      }else{
        dispatch(resetUser())
      }
  }
    return config;
  },  (err) => {
    return Promise.reject(err);
  });
   
  const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storageRefreshToken)
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }))
};

  return (
    <div>
      <Loading isPending={isPending}>
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          const ischeckAuth = !route.isPrivate || user.isAdmin
          const Layout = route.isShowHeader ? DefaultConponent : Fragment
          return (
            <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
            <Layout>
            <Page />
            </Layout>
          }/>
          )
        })}
      </Routes>
    </Router>
    </Loading>
    </div>
  )
}
export default App