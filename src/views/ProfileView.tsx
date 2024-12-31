import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileForm, User } from "../types";
import { toast} from "sonner";



export default function ProfileView() {

    /* Vamos a usar la data del Cache debido a que esta area ya ha sido declarado en la parte inicial del Porfile */
    /* Esta funcion se declara para la parte del reload del queryClient, para que haga reload a los cambios sin necesidad de cambiar los datos */
    const queryClient=useQueryClient()
    /* Esto significa que estoy garantizando qeu User si o si sera e dtipo USrer con el signo de exclamacion */
    const data:User=queryClient.getQueryData(['user'])!

    /* De esta forma digamos que se obtiene el cache y hacc e la consulta cada vez que se actujaliza */
    /* console.log(data); */
    
    const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:{
        handle:data.handle,
        description:data.description
    }});

    const updateProfileMutation=useMutation({
        mutationFn:updateProfile,
        onError:(error)=>{
            toast.error(error.message,{
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: 'red',
                  }
            });
        },
        onSuccess:(data:any)=>{
            if(data){
                toast.success(data);
            }
            
            /* En este caso la parte del invalidateQuery va hacer un reload al a pagina sin necesidad que se note, en base a
            que tomara una consulkta de nuevo a la parte de la data de la funcio User, osea con esto hace el reload de la data*/
            queryClient.invalidateQueries({queryKey:['user']})
        }
    })

    /* Funcion de useMutation de la parte de Subir Imagen */
    const uploadImageMutation=useMutation({
        mutationFn:uploadImage,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            if(data){
                console.log(data);
                
                toast.success('Cargado Correctamente');
                /* PARA OPTIMIZAR LA PARTE DE LA DATA */
                queryClient.setQueryData(['user'],(prevData:User)=>{
                    return{
                        ...prevData,
                        image:data.image
                    }
                    
                }) // Optimistic Updates
            }
        }
    })

    const handleChange=( e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            /* En este caso vamos a pasar la imagen de la parte de la data */
            console.log('Data'+e.target.files[0]);
            
            uploadImageMutation.mutate(e.target.files[0]);
        }
    }

    const handleUserProfileForm=(formData:ProfileForm)=>{
        const user:User=queryClient.getQueryData(['user'])!;
        user.description=formData.description;
        user.handle=formData.handle;
        updateProfileMutation.mutate(user)



        
      }
    
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                   
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle',{
                        required:"El nombre de Usuario es Obligatorio"
                    })}

                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description',{
                        required:"Es necesario colocar una descripcion"
                    })}
                />
                {errors.description && <ErrorMessage>{errors?.handle?.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ handleChange }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}