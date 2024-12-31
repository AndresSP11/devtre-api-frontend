import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom'
import { getUserByHandle } from '../api/DevTreeAPI';
import HandleData from './HandleData';


export default function HandleView() {

  const params=useParams();
  const handle=params.handle!;
  
  const {data,error,isLoading}=useQuery({
    queryFn:()=>getUserByHandle(handle),
    queryKey:['handle',handle],
    retry:1
  })

  console.log('Cargando is Loading',isLoading);
  console.log('Cargando el Error',error);
  console.log('Cargando la Data',data);
  
  if(isLoading) return <p className=' text-center text-white text-2xl'>Cargando...</p>

  if(error) return <Navigate to={'/404'}></Navigate>
  
  if (data) return <HandleData data={data}></HandleData>
}
