import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Github, ChromeIcon as Google } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Usuario {
  id?: number
  nombre: string
  apellidos: string
  username: string
  password: string
  rol: string
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    apellidos: "",
    username: "",
    password: "",
    rol: "usuario",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const handleRolChange = (value: string) => {
    setUsuario((prev) => ({ ...prev, rol: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">Únete para el éxito ✨</CardTitle>
        <CardDescription>
          ¿Estás listo para dar el siguiente paso hacia un futuro exitoso? ¡No busques más!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apellidos">Apellidos</Label>
            <Input
              id="apellidos"
              name="apellidos"
              placeholder="Ingresa tus apellidos"
              value={usuario.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              name="username"
              placeholder="Ingresa tu nombre de usuario"
              value={usuario.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={usuario.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select value={usuario.rol} onValueChange={handleRolChange}>
              <SelectTrigger id="rol">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usuario">Usuario</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Registrarse
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">O</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" type="button">
            <Google className="mr-2 h-4 w-4" />
            Registrarse con Google
          </Button>

          <Button variant="outline" className="w-full" type="button">
            <Github className="mr-2 h-4 w-4" />
            Registrarse con GitHub
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
