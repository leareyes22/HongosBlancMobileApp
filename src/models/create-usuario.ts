export interface CreateUsuarioDTO {
  username: string;
  password: string;
  id_rol: number;
}

export const emptyCreateUsuario: CreateUsuarioDTO = {
  username: '',
  password: '',
  id_rol: -1,
};
