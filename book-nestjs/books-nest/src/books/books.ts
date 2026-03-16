export interface Reviews{
  title: String,
  reviewer: String,
  review: String,
  rating: Number

}

export interface Books{
  _id:string,
  title:string,
  author:string,
  photo:string,
  price:number,
  rating:number,
  description:string,
  tags:string[],
  reviews?:Reviews
}
