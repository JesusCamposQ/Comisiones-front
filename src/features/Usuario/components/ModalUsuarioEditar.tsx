import { Ban, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Usuario } from "../interfaces/usuario.interface";
import { editarUsuario } from "../services/serviciosUsuario";
import { Toaster, toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface Props {
  usuario: Usuario;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setActualizar: Dispatch<SetStateAction<boolean>>;
}

export const ModalUsuarioEditar = ({
  usuario,
  open,
  setOpen,
  setActualizar,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Usuario>();
  const onSubmit = async (data: Usuario) => {
    try {
      data._id = usuario._id;
      const response = await editarUsuario(data);
      console.log(response);
      if (response?.status === 200) {
        toast.success("Usuario editado exitosamente");
        setOpen(false);
        setActualizar((prev) => !prev);
      } else {
        toast.error("Error: " + response?.status);
      }
    } catch (error) {
      toast.error("Error al editar el usuario");
    }
  };
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      limpiarComisiones();
    }
  };
  const limpiarComisiones = () => {
    reset();
  };
  return (
    <>
      <Toaster />
        <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="w-1/2 max-w-md mx-auto shadow-xl border-green-500 overflow-hidden p-0">
          <DialogHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white space-y-1 pb-6 rounded-t-lg">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 m-4">
              <Pencil className="h-6 w-6" /> Edicion de usuario
            </DialogTitle>
            <DialogDescription className="text-green-100 text-center">
              Edita los datos del usuario.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 pt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="nombre"
                  className="text-sm font-medium text-green-800"
                >
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ingresa tu nombre"
                  {...register("nombre", { required: true })}
                  className="border-green-200 focus-visible:ring-green-500"
                  defaultValue={usuario.nombre}
                  onChange={(e) => {
                    usuario.nombre = e.target.value;
                  }}
                />
                {errors.nombre && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <Ban className="h-3 w-3" /> El nombre es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="apellidos"
                  className="text-sm font-medium text-green-800"
                >
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  placeholder="Ingresa tus apellidos"
                  {...register("apellidos", { required: true })}
                  className="border-green-200 focus-visible:ring-green-500"
                  defaultValue={usuario.apellidos}
                  onChange={(e) => {
                    usuario.apellidos = e.target.value;
                  }}
                />
                {errors.apellidos && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <Ban className="h-3 w-3" /> El apellido es requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-green-800"
                >
                  Nombre de usuario
                </Label>
                <Input
                  id="username"
                  placeholder="Ingresa tu nombre de usuario"
                  {...register("username", { required: true })}
                  className="border-green-200 focus-visible:ring-green-500"
                  defaultValue={usuario.username}
                  onChange={(e) => {
                    usuario.username = e.target.value;
                  }}
                />
                {errors.username && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <Ban className="h-3 w-3" /> El nombre de usuario es
                    requerido
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="rol"
                  className="text-sm font-medium text-green-800"
                >
                  Rol
                </Label>
                <select
                  defaultValue={usuario.rol}
                  id="rol"
                  {...register("rol", { required: true })}
                  className="border-green-200 focus-visible:ring-green-500"
                  onChange={(e) => {
                    usuario.rol = e.target.value;
                  }}
                >
                  <option value="" className="text-gray-400">
                    Selecciona un rol
                  </option>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.rol && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <Ban className="h-3 w-3" /> El rol es requerido
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#2ECC71" }}
              >
                Editar usuario
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
