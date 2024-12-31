import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import { Navigate } from "react-router-dom";
import { DevTree } from "../components/DevTree";


export default function AppLayout() {

    /* Esta es la parte de cargando la ventana para mostrar la data... Recordar uqe se va mover frecuentemente */
    /* Data  */
    const {data,isLoading,isError}=useQuery({
        queryFn: getUser,
        queryKey:['user'],
        retry:1,
        refetchOnWindowFocus:false
    })


/*     console.log('Data');
    console.log(data);
    console.log('Loading...'+isLoading); */
    /* La data del Error que se va obtener aqui */
   /*  console.log(isError); */

    /* En este caso va validar la parte isLoading */
    
    if(isLoading) return 'Cargando...'

/* Esta data permitira que determine el rumbo... */
    if(isError){
        return <Navigate to={'/auth/login'}></Navigate> 
    }


    /* En este caso pra que la data exista  */
    if(data) return <DevTree data={data}></DevTree>  
    
}