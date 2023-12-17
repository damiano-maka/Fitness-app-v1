export type Root = allenameto[]

export interface allenameto {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}

export interface allenamentoUtente {
  allenament : allenameto;
  userId : number;
  id : number;
}