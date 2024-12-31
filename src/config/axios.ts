import axios from 'axios';

/* Permite tenerle el api, para darle aquello */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

/* Esta parte para no tener que configurar acada rato o colocar codigo reciclado de nuevo */
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('AUTH_TOKEN')
    /* En este caso si tienes un token vas a realizar la configuracion correspontendiente
    para que cambie y se genere el JWT de la firma  */
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})



export default api;