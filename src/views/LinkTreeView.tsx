import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"
import {SocialNetwork, User} from "../types"

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient=useQueryClient()
  /* De aqui se opbitene la data del User */
  const user:User=queryClient.getQueryData(['user'])!
  /* Use mutation esta legando de la parte del Layout AppLayout  */
  const {mutate}=useMutation({
    mutationFn:updateProfile,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:()=>{
      toast.success('Perfil Actualizado Correctamente')
    }
  })

  useEffect(()=>{
    const updatedData=devTreeLinks.map(item=>{
      /* Esta es la data de nuestro arreglo vamos a actualizarlo */
      const userlink=JSON.parse(user.links).find((link:SocialNetwork)=>link.name===item.name)
      if(userlink){
        return {...item,url:userlink.url,enabled:userlink.enabled}
      }
      return item
    })
    setDevTreeLinks(updatedData);
  },[])

  const handleUrlChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const updatedLinks=devTreeLinks.map(link=>link.name===e.target.name ? {...link,url:e.target.value} : link)
    setDevTreeLinks(updatedLinks);
    /* Copiar el Cache de la data de IG */
  }




  /* Obtiene  */


  const links : SocialNetwork[]=JSON.parse(user.links);

  
  /* Habiliatacionn de Links */

  const handleEnableLink=(socialNetwork:string)=>{
    /* Filtro de Habilitar o Desahibilitado la data */
    const updatedLinks=devTreeLinks.map(link=>{
      if(link.name===socialNetwork){
        if(isValidUrl(link.url)){
          return {...link,enabled:!link.enabled}
        }else{
          toast.error('Invalid URL');
        }
      }
      return link
    })

    console.log("Arreglo de UpdatedLinks",updatedLinks);
    
  setDevTreeLinks(updatedLinks);
 
  /* Variable que se crea */
    let updatedItems: SocialNetwork[]=[];
    /* ESO DEL SETQUERYDATA ES PARA QUE DIGAMOS CUANDO TENGAMOS EN EL USER LO ALMACENE COMO UN PORMIENTRAS MAS NO LO TENGA FIJADO */
    /* ESTA FUNCION SELECCIONA SOLO TRUES  */
    const selectedSocialNetwork=updatedLinks.find(link=>link.name===socialNetwork)
    
    console.log('Dato seleccionado: ',selectedSocialNetwork);
    
    if(selectedSocialNetwork?.enabled){

      const id=links.filter(link=>link.id).length+1;
      /* Habilitando la parte de aqui */
      /* En este caso es True */
      if(links.some(link=>link.name===socialNetwork)){
        updatedItems=links.map(link=>{
          if(link.name===socialNetwork){
            return{
              ...link,
              enabled:true,
              id
            }
          }else{
            return link
          }
        })
      }else{
          const newItem={
          ...selectedSocialNetwork,
          id
        }
        updatedItems=[...links,newItem]
      }

    }else{
      /* Desabilitar */
      /* En este caso cuando se deshabilita queda todo los links primeramente
      luego los updated tomanm forma */
      const indexToUpdate=links.findIndex(link=>link.name===socialNetwork)
      updatedItems=links.map(link=>{
        if(link.name===socialNetwork){
          return{
            ...link,
            id:0,
            enabled:false
          }
        }else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){
          return{
            ...link,
            id:link.id-1
          }
        }else{
          return link
        }
      })
    }
    console.log('Updated Items',updatedItems);
    
    queryClient.setQueryData(['user'],(prevData:User)=>{
      return{
        ...prevData,
        links:JSON.stringify(updatedItems)
      }
    })
  }





  return (
    <div className=" space-y-5">
      {
        devTreeLinks.map(item=>(
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          ></DevTreeInput>          
        ))
      }
      <button className="bg-cyan-400 p-2 text-slate-600 font-bold py-2 px-4 rounded w-full"
      onClick={()=>mutate(queryClient.getQueryData(['user'])!)}>
        Guardar Cambios
      </button>

      {/* El boton se actualiza la data */}
    </div>
  )
}
