import { ObjectId } from "mongoose";

export interface jwtInterface {
    _id:ObjectId,
    role:string
}