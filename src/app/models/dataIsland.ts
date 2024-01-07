// Definição do tipo DataIsland
export type DataIsland = {
  // Um array contendo dados de múltiplas ilhas
  dados_ilha: {
    id: number; // Identificador da ilha
    nome: string; // Nome da ilha
    table: {
      id: number; // Identificador da mesa
      nome: string; // Nome da mesa
      branch: string; // Detalhes sobre a origem (RS | SC | PR | etc..)
      pcType: string; // Tipo do computador
      serialNumberPc: string; // Número de série do computador
    }[]; // Array de mesas dentro de cada ilha
  }[]; // Array de ilhas
};
