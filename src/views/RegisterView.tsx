import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import type { RegisterForm } from "../types";
import  { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";

export default function RegisterView() {

   const location=useLocation();
   const {handle}=location.state ?? {handle:''};
   console.log(handle);

    const initialValues:RegisterForm={
        name:'',
        email:'',
        handle:handle,
        password:'',
        password_confirmation:''
    }

    const {register,watch,handleSubmit,reset,formState:{errors}}=useForm({defaultValues:initialValues})

    const password=watch('password');/* Para hacer la validacion correspondiente  */

    /* Solicitud de API */
    
    const handleRegister=async (formData:RegisterForm)=>{
        /* Aqui se va capturadr la data de Form data  */
        try {
            /* Movimiento de Api hacia  */
           const {data}=await api.post(`/auth/register`,formData);
           toast.success(data);
           /* En este caso la parte del toast es cuadno emanda el hecho recien mandado */
           reset()
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
        }

    }

  return (
    <>
        <h1 className=" text-4xl text-white font-bold">Crear Cuenta</h1>

        <form 
            onSubmit={handleSubmit(handleRegister)}
            className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        >
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Tu Nombre"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('name',{
                        required:"El nombre es Obligatorio"
                    })}

                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('email',{
                        required:"El Email es Obligatorio",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "E-mail no válido",
                        },
                    })}
               />
               {errors.email && 
               <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                <input
                    id="handle"
                    type="text"
                    placeholder="Nombre de usuario: sin espacios"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('handle',{
                        required:"El handle es obligatorio"
                    })}
                />
                {errors.handle && 
                <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('password',{
                        required:"El password es obligatorio",
                        minLength:{
                            value:8,
                            message:'El password debe ser minimo de 8 caracteres'
                        }
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Repetir Password"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('password_confirmation',{
                        required:"El password confirmation es obligatorio",
                        validate:(value)=>value===password || 'Los passwords no son iguales'
                    })}
                />
                {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Crear Cuenta'
            />  
        </form>

        <nav className=" mt-10">
            <Link to="/auth/login" className=" text-white text-lg block">
                Tienes una cuenta? Logeate con el siguiente Link
            </Link>
        </nav>
    </>
  )
}
