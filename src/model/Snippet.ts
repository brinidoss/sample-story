import { ObjectId } from "mongodb";

export default interface Snippet {
    character?: string;
    expression?: string;
    dialogue?: string;
    page?: number;
    _id?: ObjectId;
    username?: string;
}