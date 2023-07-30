export interface authActionModes {
    text: string;
    type: IActionType;
    icon: string;
    isIcon: boolean;
    permission: string;
}


export type IActionType = 'logIn' | 'logOut' | 'signUp'|'admin'|'userWorld';