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

export const productosOffline: Array<ProductoDTO> = [
  {
    id: 1,
    nombre: 'Champi',
    descripcion:
      'Hongo común nativo de Europa y América del norte, de uso gastronómico.',
  },
  {
    id: 2,
    nombre: 'Porto',
    descripcion:
      'Hongo blanco de uso gastronómico, originario de la zona del mar Mediterráneo.',
  },
];
