import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision"
import { useQuery } from "@tanstack/react-query"
import { eliminarUsuario, obtenerUsuario } from "./services/serviciosUsuario"
import { Button } from "@/components/ui/button"
import { Pencil, PlusCircle, Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { ModalUsuarioEditar } from "./components/ModalUsuarioEditar"
import { useEffect, useState } from "react"
import { Usuario } from "./interfaces/usuario.interface"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"

export const UsuarioPage = () => {
  const [open, setOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario>({
    _id: "",
    nombre: "",
    apellidos: "",
    username: "",
    password: "",
    rol: "usuario",
    flag: "activo",
  });
  const [actualizar, setActualizar] = useState(false);
  const { data: usuario, refetch } = useQuery({
    queryKey: ['usuario'],
    queryFn: () => obtenerUsuario(),
    staleTime: 60 * 1000 * 10,
  })
  const usuarioActuales = usuario?.filter((usuario) => usuario.flag != "eliminado")
  const handleUpdate = (id: string) => {
    const usuarioEditar = usuarioActuales?.find((usuario) => usuario._id === id)
    if (usuarioEditar) {
      setUsuarioEditar(usuarioEditar)
    }
    setOpen(true)
    refetch()
  }
  const handleDelete = async (id: string) => {
    const response = await eliminarUsuario(id)
    if (response?.status === 200) {
      toast.success("Usuario eliminado exitosamente");
      refetch()
      return
    }
    toast.error("Error al eliminar el usuario")
  }
  useEffect(() => {
    refetch()
  }, [actualizar])
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-4 md:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="max-w-4xl mx-auto shadow-lg border-teal-100 p-0">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg p-3">
          <CardTitle className="text-2xl font-bold text-center">Registra un nuevo usuario</CardTitle>
          <CardDescription className="text-teal-100 text-center">
            Gestiona los usuarios de tu plataforma de manera sencilla
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-end mb-6">
            <Link to="/usuarios/registro">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium gap-2">
                <PlusCircle className="h-4 w-4" />
                Registrate
              </Button>
            </Link>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-teal-100">
                <TableRow>
                  <TableHead className="text-teal-800 font-semibold">Nombres</TableHead>
                  <TableHead className="text-teal-800 font-semibold">Apellidos</TableHead>
                  <TableHead className="text-teal-800 font-semibold">Rol</TableHead>
                  <TableHead className="text-teal-800 font-semibold text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarioActuales?.map((usuario) => (
                  <TableRow key={usuario._id} className="hover:bg-teal-50 transition-colors">
                    <TableCell className="font-medium">{usuario.nombre}</TableCell>
                    <TableCell>{usuario.apellidos}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          usuario.rol === "admin"
                            ? "bg-teal-500 hover:bg-teal-600"
                            : "bg-amber-500 hover:bg-amber-600"
                        }
                      >
                        {usuario.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-amber-500 border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                          onClick={() => handleUpdate(usuario._id)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => handleDelete(usuario._id || "")}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
                {
                  <ModalUsuarioEditar
                    usuario={usuarioEditar}
                    open={open}
                    setOpen={setOpen}
                    setActualizar={setActualizar}
                  />
                }
          <div className="mt-6 text-center text-sm text-teal-600">Mostrando {usuarioActuales?.length} usuarios de un total de {usuarioActuales?.length}</div>
        </CardContent>
      </Card>
    </div>
  )
}
