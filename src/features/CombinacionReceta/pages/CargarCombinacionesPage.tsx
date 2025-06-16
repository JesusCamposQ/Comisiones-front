import { cargarCombinaciones } from '../services/serviciosCombinacionReceta';
import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, File, CheckCircle, X, Cloud } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

export const CargarCombinacionesPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setUploadSuccess(false)
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

    const handleUpload = async () => {
        if (!selectedFile) return   
        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await cargarCombinaciones(formData)  
            if (response.status === 201) {
                toast.success(
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Combinaciones registradas</span>
                  </div>
                )
                setIsUploading(false)
                setUploadSuccess(true)
                return
            }
    
        } catch (error) {
            toast.error(<>
              Ocurrio un error
              <br />
              Por favor, intenta nuevamente mas tarde
            </>, {
              style: {
                background: '#F56565',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
              },
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#F56565',
              },
            });
            setIsUploading(false)
            return
        }
      }
      const removeFile = () => {
        setSelectedFile(null)
        setUploadSuccess(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    
      const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
      }

    return (
       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 flex items-center justify-center">
           <Toaster />
           <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
             <CardContent className="p-8">
               {/* Header */}
               <div className="text-center mb-8">
                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
                   <Cloud className="w-8 h-8 text-white" />
                 </div>
                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Cargar Combinaciones</h1>
                 <p className="text-gray-600 text-sm">Selecciona o arrastra tu archivo aquí</p>
               </div>
     
               {/* Upload Area */}
               <div
                 className={`
                   relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
                   ${
                     isDragOver
                       ? "border-blue-400 bg-blue-50 scale-105"
                       : selectedFile
                         ? "border-green-300 bg-green-50"
                         : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                   }
                 `}
                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
                 onDrop={handleDrop}
                 onClick={() => fileInputRef.current?.click()}
               >
                 <input
                   ref={fileInputRef}
                   type="file"
                   onChange={handleFileInputChange}
                   className="hidden"
                   accept=".txt,.csv,.json,.xlsx,.xls"
                 />
     
                 {!selectedFile ? (
                   <div className="space-y-4">
                     <div
                       className={`inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                         isDragOver ? "bg-blue-100" : "bg-gray-100"
                       }`}
                     >
                       <Upload className={`w-6 h-6 ${isDragOver ? "text-blue-600" : "text-gray-500"}`} />
                     </div>
                     <div>
                       <p className="text-gray-700 font-medium mb-1">
                         {isDragOver ? "¡Suelta el archivo aquí!" : "Haz clic o arrastra un archivo"}
                       </p>
                       <p className="text-gray-500 text-sm">Formatos: Excel</p>
                     </div>
                   </div>
                 ) : (
                   <div className="space-y-3">
                     <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                       <File className="w-6 h-6 text-green-600" />
                     </div>
                     <div>
                       <p className="text-gray-900 font-medium truncate">{selectedFile.name}</p>
                       <p className="text-gray-500 text-sm">{formatFileSize(selectedFile.size)}</p>
                     </div>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={(e) => {
                         e.stopPropagation()
                         removeFile()
                       }}
                       className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                     >
                       <X className="w-4 h-4 mr-1" />
                       Remover
                     </Button>
                   </div>
                 )}
               </div>
     
               {/* Success Message */}
               {uploadSuccess && (
                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                   <CheckCircle className="w-5 h-5 text-green-600" />
                   <div>
                     <p className="text-green-800 font-medium text-sm">¡Archivo subido exitosamente!</p>
                     <p className="text-green-600 text-xs">Tu archivo ha sido procesado correctamente</p>
                   </div>
                 </div>
               )}
     
               {/* Upload Button */}
               <Button
                 onClick={handleUpload}
                 disabled={!selectedFile || isUploading || uploadSuccess}
                 className={`
                   w-full mt-6 h-12 text-base font-medium transition-all duration-300
                   ${
                     selectedFile && !uploadSuccess
                       ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                       : ""
                   }
                 `}
               >
                 {isUploading ? (
                   <div className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                     Subiendo archivo...
                   </div>
                 ) : uploadSuccess ? (
                   <div className="flex items-center gap-2">
                     <CheckCircle className="w-4 h-4" />
                     Completado
                   </div>
                 ) : (
                   <div className="flex items-center gap-2">
                     <Upload className="w-4 h-4" />
                     Subir archivo
                   </div>
                 )}
               </Button>
     
               {/* Help Text */}
               <p className="text-center text-xs text-gray-500 mt-4">Tamaño máximo: 10MB • Archivos seguros y encriptados</p>
             </CardContent>
           </Card>
         </div>
    );
};
