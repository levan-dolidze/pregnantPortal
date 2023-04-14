export interface AddStuff {

    title: string,
    description: string,
    prise: string,
    img: string

}

export interface Stuffs extends AddStuff {
    key: string
}