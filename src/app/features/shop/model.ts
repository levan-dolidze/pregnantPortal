export interface Cart {

    title: string,
    description: string,
    img: string,
    key: string,
    prise: number,
    inCart: number



}


export interface IOrder {
    name: string,
    lastName: string,
    IDNumber: string,
    phone: string,
    address: string,
    stuff: Cart
    uid: string
}


export type BuyNowActions = 'isLoggedIn' | 'isLoggedOut';