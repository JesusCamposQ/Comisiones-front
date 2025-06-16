
export default function Londing({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
    )
}
