import { useForm } from "react-hook-form";
import { AutenticacionI } from '@/features/Autenticacion/interface/autenticacionI';
import { autenticacion } from "@/features/Autenticacion/service/autenticaiconService";
import { TokenContext } from "../context/TokenProvider";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

export const Autenticacion = () => {
  let navigate = useNavigate();
  const { asignarToken } = useContext(TokenContext);
  const [mensaje, setMensaje] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<AutenticacionI>();

  const onSubmit = async (data: AutenticacionI) => {
    try {
      const response = await autenticacion(data);
      localStorage.setItem('username', data.username);
      
      if (response.status === 200) {
        asignarToken(response.token);
        toast.success('Inicio de sesión exitoso');
        navigate("/ventas");
      }
    } catch (error) {
      const e = error as AxiosError;
      if (e.status === 403) {
        toast.error('Credenciales invalidas');
        setMensaje('Credenciales invalidas');
      }
      console.log("Error al iniciar sesión", e.status);
    }
    console.log("Error al iniciar sesión");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <Toaster position="top-center"/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sistema de Comisiones</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Usuario</label>
            <input
              {...register('username', { required: 'Ingrese su usuario' })}
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            {errors.username && <p className="text-red-500 text-sm text-center">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              {...register('password', { required: 'Ingrese su contraseña' })}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            {mensaje && <p className="text-red-500 text-sm text-center">{mensaje}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
