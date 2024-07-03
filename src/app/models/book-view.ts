import { Category } from "./category";

export class BookView{
    isxn:number=0;
    title:String='';
    publicationDate:number=0;
    units:number=0;
    editorial:String='';
    cost:any='';
	author:String='';
	image:String='';
    category!:Category;



}