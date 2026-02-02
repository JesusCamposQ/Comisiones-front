export function paginador<T>(array: T[], limite: number, pagina: number) {
    const empiezaEn = (pagina - 1) * limite;
    const finEn = empiezaEn + limite;
    return array.slice(empiezaEn, finEn);
}