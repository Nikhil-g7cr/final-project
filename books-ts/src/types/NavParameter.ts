

export interface NavParameter{
    text:string,
    //you may pass a link for <Link/> or
    //a function to handle click
    onClick: string|Function,

    linkVisibility?: "authenticated"|"unauthenticated"|"always", 

}

