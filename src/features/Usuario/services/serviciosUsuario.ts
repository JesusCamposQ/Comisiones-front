import { Usuario } from "../interfaces/usuario.interface";
import api from "@/app/service/api";

export const obtenerUsuario = async () : Promise<Usuario[]> => {
    try {
        const resultado = await api.get("api/usuario");
        return resultado.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const crearUsuario = async (usuario: Usuario) => {
    try {
        const resultado = await api.post("api/usuario", usuario);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export const eliminarUsuario = async (id: string) => {
    try {
        const resultado = await api.delete("api/usuario/" + id);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export const editarUsuario = async (usuario: Usuario) => {
    try {
        const resultado = await api.patch("api/usuario/" + usuario._id, usuario);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

    