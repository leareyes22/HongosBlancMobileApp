export interface Usuario {
  id?: number;
  username: string;
  password: string;
}

export const emptyUsuario: Usuario = {
  id: undefined,
  username: '',
  password: '',
};
