import { descargaGafa, descargaLc, descargaMontura } from "@/features/Producto/services/productoService";
import { v4 } from "uuid";


export async function  exportarProducto (producto:string){
 try {
        let blob:any;
        if(producto ==='montura'){
             blob = await  descargaMontura()
        }
        if(producto ==='gafa'){
             blob = await  descargaGafa()
        }
         if(producto ==='lc'){
             blob = await  descargaLc()
        }
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