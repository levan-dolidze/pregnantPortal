export interface authActionModes {
    text: string;
    type: IActionType;
    icon: string;
    permission: string;
}


export type IActionType = 'logIn' | 'logOut' | 'signUp'|'admin'