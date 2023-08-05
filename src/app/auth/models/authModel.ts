export interface SignUp {
    email: string,
    password: string
}

export interface LogIn {
    userName: string,
    password: string
}

export enum Admin {
    admin = 'l.dolidze11@gmail.com'
}

export const adminValidation = (user: string) => user === Admin.admin;



export interface IsAdminCheck {
    admin: boolean,
    token: boolean
}

