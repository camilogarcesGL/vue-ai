export interface Skills {
    skill: string[];
}

export type TabName = 'skills' | 'suggestions';
export interface DataItem {
    name: string;
    description: string;
  }

 export interface Result {
    index: number;
    name: string;
  }