export interface User {
    id: number;
    username: string;
    password: string;
  }
  
  export interface Note {
    id: number;
    title: string;
    content: string;
    category: string;
    userId: number;
  }
  