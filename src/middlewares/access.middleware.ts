import { NextFunction , Request , Response } from "express";

export function requireRole(role:string){
  return function (req:Request , res:Response , next:NextFunction){
    
  }
}

export function requireApikey(req:Request , res:Response , next:NextFunction){

}
