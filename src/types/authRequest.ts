import  type { Request } from "express";
import type { IUser } from "./type.js";

export interface AuthRequest extends Request {
	user?: IUser;
}
