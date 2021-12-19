export interface EditUsuarioDTO {
  id: number;
  username: string;
  password: string;
  email: string;
  nombre: string;
  apellido: string;
  id_rol: number;
}

export const emptyEditUsuario: EditUsuarioDTO = {
  id: -1,
  username: '',
  password: '',
  email: '',
  nombre: '',
  apellido: '',
  id_rol: -1,
};
