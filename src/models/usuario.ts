export interface Usuario {
  id?: number;
  Username: string;
  Password: string;
}

export const emptyUsuario: Usuario = {
  id: undefined,
  Username: '',
  Password: '',
};
