import { Document } from "mongoose";


export interface Product extends Document {
    name: string;
    descripcion: string;
    imageURT: string;
    price: number;
    createdAt: Date;
}