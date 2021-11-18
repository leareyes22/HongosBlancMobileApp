export interface Usuario {
  id: number;
  username: string;
  password: string;
}

export const emptyUsuario: Usuario = {
  id: -1,
  username: '',
  password: '',
};
