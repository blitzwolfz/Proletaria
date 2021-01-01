import { Client, Message } from "discord.js"

export interface Command {
    name: string
    description: string
    // Making `args` optional
    execute(message: Message, client:Client, args?: string[]): Promise<any>;
}

export interface user {
    _id: string;
    resources:{
        money:number,
        currencyname:string;
        food:number
        people:number;
        peoplename:string;
    };
    army:number;
    armyname:string;
    navy:number;
    navyname:string;
}

export interface server {
    _id: string;
    name: string;
    prefix: string;
}

export interface reminder {
    _id:string;
    type: "food" | "work";
    time:number;
    channel:string;
}