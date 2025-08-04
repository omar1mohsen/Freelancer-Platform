


interface General {
    title: string,
    id: string | number;
}

interface Position {
    lng: number;
    lat: number;
}
  
interface SliderContent extends General {
    image: string,
}

interface ProductType extends General {
    name: string,
    image: string,
    price:string,
    currency:string,
    price_after:string
}

type HomeContentTypes = {
    text: string
    type: string
    content: SliderContent[] | ProductType[] 
}

declare type HomeType = {
    [key: string]: HomeContentTypes;
}
interface CategoryType extends ProductType {

}

