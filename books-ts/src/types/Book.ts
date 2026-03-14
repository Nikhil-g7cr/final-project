
interface Oid{
    $oid:string
}
export interface Reviews{
    title:string,
    comment:string,
    rating:number,
    reviewer:string,
    bookId:string,

}
export interface Book{
    title:string,
    _id:string,
    author:string,
    price:number,
    isbn:string| string[],
    rating:number|string,
    cover:string,
    description:string,

    //optional elements
    pages?:number|string,
    votes?:number|string,
    tags?: string[],
    series?:string,
    seriesIndex?:string,
    reviews?: Reviews[]    
}