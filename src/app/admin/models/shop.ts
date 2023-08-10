export interface AddStuff {

    title: string,
    description: string,
    prise: string,
    img: string,
    productType?: 'stuffs' | 'courses'

}

export interface Stuffs extends AddStuff {
    key: string
}

export interface FullCourse extends AddStuff {
    key: string

}