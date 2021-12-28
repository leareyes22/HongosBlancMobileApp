export default interface RolDTO {
  id: number;
  nombre: string;
  descripcion: string;
}

export const rolesOffline: Array<RolDTO> = [
  { id: 1, nombre: 'admin', descripcion: 'Usuario con acceso total' },
  {
    id: 2,
    nombre: 'jefe',
    descripcion:
      'Usuario con acceso a asignación y creación de tareas, generación de reportes',
  },
  {
    id: 3,
    nombre: 'empleado',
    descripcion: 'Usuario con acceso carga de datos de las tareas realizadas',
  },
];
