export enum TipoNotificacao {
  SUCESSO = "sucesso",
  FALHA = "falha",
  ATENCAO = "atencao",
}

export interface INotificacao {
    titulo: string;
    texto: string;
    tipo: TipoNotificacao;
    id: number;
}