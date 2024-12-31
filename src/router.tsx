
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'
import HandleView from './views/HandleView'
import NotFoundView from './views/NotFoundView'
import HomeView from './views/HomeView'


export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path='/auth/login' element={<LoginView></LoginView>}/>
                <Route path='/auth/register' element={<RegisterView/>}></Route>
            </Route>

            <Route path='/admin' element={<AppLayout/>}>
                <Route index={true} element={<LinkTreeView/>}></Route>
                <Route index={true} path='profile' element={<ProfileView/>}></Route>
                
            </Route>

          {/* Crearemos otra seccion para la parte de los Links */}
            <Route path='/:handle' element={<AuthLayout/>}>
                <Route element={<HandleView/>} index={true}/>
            </Route>

            <Route path='/' element={<HomeView/>}></Route>

            <Route path='/404' element={<AuthLayout/>}>
                <Route element={<NotFoundView/>} index={true}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
