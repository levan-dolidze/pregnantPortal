export interface SignUp {
    email: string,
    password: string
}

export enum Admin {
    admin = '1'
}


export interface IsAdminCheck {
    isAdmin: boolean,
    token: boolean
}