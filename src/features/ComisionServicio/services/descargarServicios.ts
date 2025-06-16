import api from "@/app/service/api";

export const descargarServicios = async () => {
    try {
      const response = await api.get("/api/provider/excel/servicio/comisiones", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "servicios.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };