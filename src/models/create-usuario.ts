export interface CreateUsuarioDTO {
  username: string;
  password: string;
  email: string;
  nombre: string;
  apellido: string;
  id_rol: number;
}

export const emptyCreateUsuario: CreateUsuarioDTO = {
  username: '',
  password: '',
  email: '',
  nombre: '',
  apellido: '',
  id_rol: -1,
};
