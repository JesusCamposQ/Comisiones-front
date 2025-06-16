import { v4 } from "uuid"
import obtenerCombinacionRecetaParaDescargar from "./obternerCombinacionesRecetaParaDescargar";
const descargarCombinacionReceta = async () => {

    try {
        const blob = await obtenerCombinacionRecetaParaDescargar();
        if(blob instanceof Blob){
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${ v4() }.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else{
            console.log("No se pudo descargar la combinación de receta, la respuesta no es un blob");
        }
    } catch (error) {
        console.log("Error al descargar la combinación de receta: ",error);
    }

}

export default descargarCombinacionReceta;
