
import { useState } from "react"
import { Ban, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Usuario } from "../interfaces/usuario.interface";
import { crearUsuario } from "../services/serviciosUsuario";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from "react-router";

export const UsuarioRegistroPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Usuario>();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: Usuario) => {
    try {
      const response = await crearUsuario(data);
      console.log(response);
      if(response?.status === 201){
        toast.success("Usuario creado exitosamente");
        setTimeout(() => {
            navigate("/usuarios");
        }, 1000);
      }
      else{
        toast.error("Error: " + response?.status);
      }
    } catch (error) {
      toast.error("Error al crear el usuario");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8 flex items-center justify-center">
    <Toaster />
    <Card className="w-full max-w-md shadow-xl border-blue-100 overflow-hidden p-0">
    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white space-y-1 pb-6 rounded-t-lg">
      <CardTitle className="text-2xl font-bold text-center">Registro de usuario</CardTitle>
      <CardDescription className="text-blue-100 text-center">
      Registra un nuevo usuario en el sistema
      </CardDescription>
    </CardHeader>
    <CardContent className="p-6 pt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-sm font-medium text-blue-800">Nombre</Label>
          <Input
            id="nombre"
            placeholder="Ingresa tu nombre"
            {...register("nombre", { required: true })}
            className="border-blue-200 focus-visible:ring-blue-500"
          />
          {errors.nombre && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El nombre es requerido</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="apellidos" className="text-sm font-medium text-blue-800">Apellidos</Label>
          <Input
            id="apellidos"
            placeholder="Ingresa tus apellidos"
            {...register("apellidos", { required: true })}
            className="border-blue-200 focus-visible:ring-blue-500"
          />
          {errors.apellidos && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El apellido es requerido</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-blue-800">Nombre de usuario</Label>
          <Input
            id="username"
            placeholder="Ingresa tu nombre de usuario"
            {...register("username", { required: true })}
            className="border-blue-200 focus-visible:ring-blue-500"
          />
          {errors.username && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El nombre de usuario es requerido</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-blue-800">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              className="border-blue-200 focus-visible:ring-blue-500 pr-10"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una minuscula, un numero y un caracter especial"
                }
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-blue-400 hover:text-blue-600 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
            </Button>
          </div>
          {errors.password && <p className="text-yellow-600 text-sm flex items-center gap-2">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rol" className="text-sm font-medium text-blue-800">Rol</Label>
          <select
            id="rol"
            {...register("rol", { required: true })}
            className="border-blue-200 focus:ring-blue-500"
          >
            <option value="" className="text-gray-400">Selecciona un rol</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.rol && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El rol es requerido</p>}   
        </div>

        <Button 
        type="submit" 
        className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 flex items-center justify-center gap-2"
        style={{ backgroundColor: "#3498DB" }}
        >
          Agregar usuario
        </Button>
        
      </form>
    </CardContent>
  </Card>
  </div>
  )
}
