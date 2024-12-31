import { isAxiosError } from "axios";
import api from "../config/axios";

import { ProfileForm, User, UserHandle } from "../types";

/* Funcion para extraer la data */
export async function getUser(){
    /* oObtener usuario */
    try {
        /* En este caso la parte de la API */
        const {data}=await api<User>('/user')
        return data;
      } catch (error) {
          if(isAxiosError(error) && error.response){
            /* toast.error(error.response.data.error) */
            /* Esta parte del error es lo que va mandar  */
            throw new Error(error.response.data.error);
        }
        /* Existe la partre qeu el error en genral te va mandar todo en general
        pero el error que se esta mandano por parte de la backend se leera con el isAxios Error */
      }
}

export async function updateProfile(formData:ProfileForm){
  /* oObtener usuario */
  try {
      /* En este caso la parte de la API */
      const {data}=await api.patch<User>('/user',formData)
      return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
          /* toast.error(error.response.data.error) */
          /* Esta parte del error es lo que va mandar  */
          throw new Error(error.response.data.error);
      }
      /* Existe la partre qeu el error en genral te va mandar todo en general
      pero el error que se esta mandano por parte de la backend se leera con el isAxios Error */
      
    }
}

export async function uploadImage(file:File){
  let formData=new FormData()
  /* Este es el nombre de la data */
  /* Recuerda que esta mandando la data */
  formData.append('file',file)

  try {
      /* En este caso la parte de la API */
      const {data}=await api.post('/user/image',formData);
      console.log('Debajo de aqui es la data');
      return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
          throw new Error(error.response.data.error);
      }
     
    }
}

export async function getUserByHandle(handle :string){
  /* oObtener usuario */
  try {
      /* En este caso la parte de la API */
      const url=`/${handle}`;
      const {data}=await api<UserHandle>(url)
      return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
          /* toast.error(error.response.data.error) */
          /* Esta parte del error es lo que va mandar  */
          throw new Error(error.response.data.error);
      }
      /* Existe la partre qeu el error en genral te va mandar todo en general
      pero el error que se esta mandano por parte de la backend se leera con el isAxios Error */
      
    }
}

export async function searchByHandle(handle :string){
  /* oObtener usuario */
  try {
      /* En este caso la parte de la API */
      const {data}=await api.post<string>('/search',{handle})
      return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
          /* toast.error(error.response.data.error) */
          /* Esta parte del error es lo que va mandar  */
          throw new Error(error.response.data.error);
      }
      /* Existe la partre qeu el error en genral te va mandar todo en general
      pero el error que se esta mandano por parte de la backend se leera con el isAxios Error */
      
    }
}