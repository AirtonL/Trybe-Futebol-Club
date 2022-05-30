declare namespace Express {
  export interface Request {
    tokenData: {
      email: string;
      id: number;
      role: string;
    };
  }
}

// declare namespace Express {
//   export interface Request {
//     userId: number;
//   }
// }
