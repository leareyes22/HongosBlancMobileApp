export interface UsuarioDTO {
  id?: number;
  username: string;
  rol: string;
  id_rol: number;
}

export const emptyUsuario: UsuarioDTO = {
  id: undefined,
  username: '',
  rol: '',
  id_rol: -1,
};
