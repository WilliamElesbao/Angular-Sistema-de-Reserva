export type DataIsland = {
  dados_ilha: {
    id: number;
    nome: string;
    table: {
      id: number;
      nome: string;
      branch: string;
      pcType: string;
      serialNumberPc: string;
    }[]
  }[]
}
