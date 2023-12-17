export interface userResponse {
    accessToken: string
    user: UserRes
  }
  
  export interface UserRes {
    email: string
    username: string
    isAdmin: boolean
    id: number
  }
  
  export interface RegistrationForm {
    username: string;
    email: string;
    password: string;
    isAdmin:boolean;
  }

  export interface UserReq {
    email: string
    password: string
  }