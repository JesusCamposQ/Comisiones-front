import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Plus, Target, TrendingUp, Users, Eye, Phone } from "lucide-react"

export default function Component() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const getProgress = (tasks: any[]) => {
    const completed = tasks.filter((task) => completedTasks[task.id]).length
    return (completed / tasks.length) * 100
  }

  const sucursalTasks = [
    { id: "sucursal-1", title: "Aumentar ventas mensuales", target: "15%", status: "En progreso" },
    { id: "sucursal-2", title: "Mejorar satisfacción del cliente", target: "4.5/5", status: "Pendiente" },
    { id: "sucursal-3", title: "Capacitar nuevo personal", target: "3 empleados", status: "Completado" },
  ]

  const monturaGafaTasks = [
    { id: "montura-1", title: "Lanzar nueva colección", target: "20 modelos", status: "En progreso" },
    { id: "montura-2", title: "Optimizar inventario", target: "95% disponibilidad", status: "Pendiente" },
    { id: "montura-3", title: "Promoción de temporada", target: "30% descuento", status: "Activo" },
  ]

  const lenteTasks = [
    { id: "lente-1", title: "Ampliar catálogo de lentes", target: "5 marcas nuevas", status: "En progreso" },
    { id: "lente-2", title: "Programa de cuidado", target: "100 clientes", status: "Pendiente" },
    { id: "lente-3", title: "Capacitación especializada", target: "2 certificaciones", status: "Completado" },
  ]

  const TaskCard = ({ task, icon: Icon }: { task: any; icon: any }) => (
    <Card className="transition-all duration-200 hover:shadow-md border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button onClick={() => toggleTask(task.id)} className="mt-1 transition-colors duration-200">
              {completedTasks[task.id] ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 hover:text-blue-500" />
              )}
            </button>
            <div className="flex-1">
              <h4 className={`font-medium ${completedTasks[task.id] ? "line-through text-gray-500" : "text-gray-900"}`}>
                {task.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">Meta: {task.target}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-blue-500" />
            <Badge
              variant={
                task.status === "Completado"
                  ? "default"
                  : task.status === "En progreso"
                    ? "secondary"
                    : task.status === "Activo"
                      ? "default"
                      : "outline"
              }
            >
              {task.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Lista de Metas</h1>
          </div>
          <p className="text-gray-600 text-lg">Gestiona y monitorea el progreso de tus objetivos empresariales</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sucursales</p>
                  <p className="text-2xl font-bold text-gray-900">{sucursalTasks.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <Progress value={getProgress(sucursalTasks)} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Productos</p>
                  <p className="text-2xl font-bold text-gray-900">{monturaGafaTasks.length + lenteTasks.length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
              <Progress value={(getProgress(monturaGafaTasks) + getProgress(lenteTasks)) / 2} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progreso Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (getProgress(sucursalTasks) + getProgress(monturaGafaTasks) + getProgress(lenteTasks)) / 3,
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
              <Progress
                value={(getProgress(sucursalTasks) + getProgress(monturaGafaTasks) + getProgress(lenteTasks)) / 3}
                className="mt-3"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Objetivos por Categoría</span>
            </CardTitle>
            <CardDescription>Organiza y monitorea el progreso de tus metas empresariales</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sucursal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="sucursal" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Sucursal</span>
                </TabsTrigger>
                <TabsTrigger value="montura" className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Montura + Gafa</span>
                </TabsTrigger>
                <TabsTrigger value="lente" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Lente de Contacto</span>
                </TabsTrigger>
                <TabsTrigger value="acciones" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Acciones</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sucursal" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Objetivos de Sucursal</h3>
                  <Badge variant="secondary">{sucursalTasks.length} metas</Badge>
                </div>
                {sucursalTasks.map((task) => (
                  <TaskCard key={task.id} task={task} icon={Users} />
                ))}
              </TabsContent>

              <TabsContent value="montura" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Objetivos de Montura y Gafas</h3>
                  <Badge variant="secondary">{monturaGafaTasks.length} metas</Badge>
                </div>
                {monturaGafaTasks.map((task) => (
                  <TaskCard key={task.id} task={task} icon={Eye} />
                ))}
              </TabsContent>

              <TabsContent value="lente" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Objetivos de Lentes de Contacto</h3>
                  <Badge variant="secondary">{lenteTasks.length} metas</Badge>
                </div>
                {lenteTasks.map((task) => (
                  <TaskCard key={task.id} task={task} icon={Phone} />
                ))}
              </TabsContent>

              <TabsContent value="acciones" className="space-y-4">
                <div className="text-center py-8">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Panel de Acciones</h3>
                  <p className="text-gray-600 mb-6">Gestiona acciones rápidas y configuraciones</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Nueva Meta</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Ver Reportes</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
