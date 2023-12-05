export interface BlogReq {

    htmlContent: string,
    img: string
}

export interface BlogResponse extends BlogReq {
    key: string
}