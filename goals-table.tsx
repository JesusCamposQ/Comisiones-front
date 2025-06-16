"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Edit, Trash2, MoreHorizontal, Building2, Eye, Phone, TrendingUp, Search } from "lucide-react"

interface GoalData {
  id: string
  sucursal: string
  montura: number
  lente: number
  targetMontura: number
  targetLente: number
}

export default function Component() {
  const [goals, setGoals] = useState<GoalData[]>([
    {
      id: "1",
      sucursal: "Sucursal Central",
      montura: 20,
      lente: 30,
      targetMontura: 25,
      targetLente: 35,
    },
    {
      id: "2",
      sucursal: "Sucursal Norte",
      montura: 15,
      lente: 22,
      targetMontura: 20,
      targetLente: 25,
    },
    {
      id: "3",
      sucursal: "Sucursal Sur",
      montura: 18,
      lente: 28,
      targetMontura: 22,
      targetLente: 30,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    sucursal: "",
    montura: 0,
    lente: 0,
    targetMontura: 0,
    targetLente: 0,
  })

  const filteredGoals = goals.filter((goal) => goal.sucursal.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalMontura = goals.reduce((sum, goal) => sum + goal.montura, 0)
  const totalLente = goals.reduce((sum, goal) => sum + goal.lente, 0)
  const totalTargetMontura = goals.reduce((sum, goal) => sum + goal.targetMontura, 0)
  const totalTargetLente = goals.reduce((sum, goal) => sum + goal.targetLente, 0)

  const getProgressPercentage = (current: number, target: number) => {
    return target > 0 ? Math.min((current / target) * 100, 100) : 0
  }

  const getStatusBadge = (current: number, target: number) => {
    const percentage = getProgressPercentage(current, target)
    if (percentage >= 100) return <Badge className="bg-green-500">Completado</Badge>
    if (percentage >= 75) return <Badge className="bg-blue-500">En progreso</Badge>
    if (percentage >= 50) return <Badge className="bg-yellow-500">Moderado</Badge>
    return <Badge variant="destructive">Bajo</Badge>
  }

  const handleAddGoal = () => {
    const goal: GoalData = {
      id: Date.now().toString(),
      ...newGoal,
    }
    setGoals([...goals, goal])
    setNewGoal({ sucursal: "", montura: 0, lente: 0, targetMontura: 0, targetLente: 0 })
    setIsAddDialogOpen(false)
  }

  const handleEditGoal = (goal: GoalData) => {
    setGoals(goals.map((g) => (g.id === goal.id ? goal : g)))
    setEditingGoal(null)
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Lista de Metas</h1>
          </div>
          <p className="text-gray-600 text-lg">Monitorea el rendimiento de ventas por sucursal en tiempo real</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sucursales</p>
                  <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monturas Vendidas</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMontura}</p>
                  <p className="text-xs text-gray-500">Meta: {totalTargetMontura}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
              <Progress value={getProgressPercentage(totalMontura, totalTargetMontura)} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lentes Vendidos</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLente}</p>
                  <p className="text-xs text-gray-500">Meta: {totalTargetLente}</p>
                </div>
                <Phone className="h-8 w-8 text-purple-500" />
              </div>
              <Progress value={getProgressPercentage(totalLente, totalTargetLente)} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rendimiento</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (getProgressPercentage(totalMontura, totalTargetMontura) +
                        getProgressPercentage(totalLente, totalTargetLente)) /
                        2,
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Metas por Sucursal</span>
                </CardTitle>
                <CardDescription>Gestiona las metas de ventas de cada sucursal</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar sucursal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Nueva Meta</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Meta</DialogTitle>
                      <DialogDescription>Define las metas de ventas para una nueva sucursal</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sucursal" className="text-right">
                          Sucursal
                        </Label>
                        <Input
                          id="sucursal"
                          value={newGoal.sucursal}
                          onChange={(e) => setNewGoal({ ...newGoal, sucursal: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="montura" className="text-right">
                          Monturas
                        </Label>
                        <Input
                          id="montura"
                          type="number"
                          value={newGoal.montura}
                          onChange={(e) => setNewGoal({ ...newGoal, montura: Number.parseInt(e.target.value) || 0 })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="targetMontura" className="text-right">
                          Meta Monturas
                        </Label>
                        <Input
                          id="targetMontura"
                          type="number"
                          value={newGoal.targetMontura}
                          onChange={(e) =>
                            setNewGoal({ ...newGoal, targetMontura: Number.parseInt(e.target.value) || 0 })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lente" className="text-right">
                          Lentes
                        </Label>
                        <Input
                          id="lente"
                          type="number"
                          value={newGoal.lente}
                          onChange={(e) => setNewGoal({ ...newGoal, lente: Number.parseInt(e.target.value) || 0 })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="targetLente" className="text-right">
                          Meta Lentes
                        </Label>
                        <Input
                          id="targetLente"
                          type="number"
                          value={newGoal.targetLente}
                          onChange={(e) =>
                            setNewGoal({ ...newGoal, targetLente: Number.parseInt(e.target.value) || 0 })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddGoal}>Agregar Meta</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold">Sucursal</TableHead>
                    <TableHead className="font-semibold text-center">Montura + Gafa</TableHead>
                    <TableHead className="font-semibold text-center">Lente de Contacto</TableHead>
                    <TableHead className="font-semibold text-center">Estado</TableHead>
                    <TableHead className="font-semibold text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGoals.map((goal) => (
                    <TableRow key={goal.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-blue-500" />
                          <span>{goal.sucursal}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="font-semibold text-lg">{goal.montura}</span>
                            <span className="text-gray-500">/ {goal.targetMontura}</span>
                          </div>
                          <Progress
                            value={getProgressPercentage(goal.montura, goal.targetMontura)}
                            className="w-20 mx-auto"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="font-semibold text-lg">{goal.lente}</span>
                            <span className="text-gray-500">/ {goal.targetLente}</span>
                          </div>
                          <Progress
                            value={getProgressPercentage(goal.lente, goal.targetLente)}
                            className="w-20 mx-auto"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          {getStatusBadge(goal.montura, goal.targetMontura)}
                          {getStatusBadge(goal.lente, goal.targetLente)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingGoal(goal)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará permanentemente la meta de {goal.sucursal}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteGoal(goal.id)}>
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        {editingGoal && (
          <Dialog open={!!editingGoal} onOpenChange={() => setEditingGoal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Meta</DialogTitle>
                <DialogDescription>Modifica las metas de ventas para {editingGoal.sucursal}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-montura" className="text-right">
                    Monturas
                  </Label>
                  <Input
                    id="edit-montura"
                    type="number"
                    value={editingGoal.montura}
                    onChange={(e) => setEditingGoal({ ...editingGoal, montura: Number.parseInt(e.target.value) || 0 })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-target-montura" className="text-right">
                    Meta Monturas
                  </Label>
                  <Input
                    id="edit-target-montura"
                    type="number"
                    value={editingGoal.targetMontura}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, targetMontura: Number.parseInt(e.target.value) || 0 })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-lente" className="text-right">
                    Lentes
                  </Label>
                  <Input
                    id="edit-lente"
                    type="number"
                    value={editingGoal.lente}
                    onChange={(e) => setEditingGoal({ ...editingGoal, lente: Number.parseInt(e.target.value) || 0 })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-target-lente" className="text-right">
                    Meta Lentes
                  </Label>
                  <Input
                    id="edit-target-lente"
                    type="number"
                    value={editingGoal.targetLente}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, targetLente: Number.parseInt(e.target.value) || 0 })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleEditGoal(editingGoal)}>Guardar Cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
