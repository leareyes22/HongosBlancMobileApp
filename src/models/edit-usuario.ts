export interface EditUsuarioDTO {
  id: number;
  username: string;
  password: string;
  id_rol: number;
}

export const emptyEditUsuario: EditUsuarioDTO = {
  id: -1,
  username: '',
  password: '',
  id_rol: -1,
};
