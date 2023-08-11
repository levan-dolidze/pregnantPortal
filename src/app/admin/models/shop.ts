export interface AddStuff {

    title: string,
    description: string,
    prise: string,
    img: string,
    productType?: 'stuffs' | 'courses',
    parentKey?: string

}

export interface Stuffs extends AddStuff {
    key: string,
    uid: string
}

export interface FullCourse extends AddStuff {
    key: string

}

export interface OrderedFullCourse {
    IDNumber: string,
    address: string,
    key: string,
    name: string,
    lastName: string,
    phone: string,
    stuff: Stuffs
    uid:string
}