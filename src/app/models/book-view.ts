import { Category } from "./category";

export interface Book{
    isxn:number;
    title:String;
    publicationDate:number;
    units:number;
    editorial:String;
    cost:any;
	author:String;
	image:String;
    category:Category;



}