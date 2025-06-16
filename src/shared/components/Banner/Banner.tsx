import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { FileDown } from "lucide-react"


interface BannerProps {
  handleDownload: () => void;
  isDownload: boolean;
  title: string;
  subtitle: string;
}

export const Banner = ({ handleDownload, isDownload, title, subtitle }: BannerProps) => {
  return (
    <div className="flex justify-between items-center gap-4 p-4">
    <div className="text-center sm:text-left">
      <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
          {title}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        {subtitle}
      </h1>
    </div>
    <Button
      className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 px-8 py-4 min-w-[200px]"
      type="button"
      onClick={handleDownload}
      disabled={isDownload}
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

      <div className="relative flex items-center justify-center gap-3">
        {isDownload ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Descargando...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 group-hover:animate-bounce" />
            <span className="font-semibold text-base">Descargar</span>
          </div>
        )}
      </div>
    </Button>
  </div>
  )
}
