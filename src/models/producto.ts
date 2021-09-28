export default interface ProductoDTO {
  id: number;
  nombre: string;
  descripcion: string;
}

export const emptyProductoDTO: ProductoDTO = {
  id: 0,
  nombre: '',
  descripcion: '',
};
