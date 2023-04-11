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


export interface IsAdminCheck {
    isAdmin: boolean,
    token: boolean
}