export interface UsuarioDTO {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  id_rol: number;
}

export const emptyUsuario: UsuarioDTO = {
  id: -1,
  username: '',
  email: '',
  nombre: '',
  apellido: '',
  rol: '',
  id_rol: -1,
};
