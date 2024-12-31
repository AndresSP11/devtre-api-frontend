import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { LoginForm } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";



export default function LoginView() {
  const navigate=useNavigate();
  const initialValues:LoginForm={
    email:'',
    password:''
  }

  const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:initialValues});

  const handleLogin=async (formData:LoginForm)=>{
 
            
    try {

      const {data}=await api.post('/auth/login',formData)
        localStorage.setItem('AUTH_TOKEN',data);
        navigate('/admin');   
        
    } catch (error) {
        /* Configuracion de la parte de error de la data */
        if(isAxiosError(error) && error.response){
          toast.error(error.response.data.error)
      }
      /* Existe la partre qeu el error en genral te va mandar todo en general
      pero el error que se esta mandano por parte de la backend se leera con el isAxios Error */
      console.log(error);
      
    }
    
  }


  return (
    <>
        <h1 className=" text-4xl text-white font-bold">Iniciar Sesion</h1>

      <form 
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
          noValidate
          >
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
              <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("email", {
                      required: "El Email es obligatorio",
                      pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "E-mail no válido",
                      },
                  })}
              />
              {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password", {
                      required: "El Password es obligatorio",
                  })}
              />
              {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
          </div>

          <input
              type="submit"
              className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
              value='Iniciar Sesión'
          />
      </form>

        <nav className=" mt-10">
            <Link to="/auth/register" className=" text-white text-lg block">
                ¿No tienes Cuenta? Crea una cuenta
            </Link>
        </nav>
    </>
  )
}
