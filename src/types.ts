import { Client, Message } from "discord.js"

export interface Command {
    name: string
    description: string
    group:string;
    owner:boolean;
    // Making `args` optional
    execute(message: Message, client:Client, args?: string[], ownerID?:string): Promise<any>;
}

export interface user {
    _id: string;
    resources: {
        money: number; 
        currencyname: string;
        food: number;
        people: {
            clone: number;
            human: number;
        },
        peoplename: string;
        metal: number;
        energy: number;
    },
    generators: {
        mines: number;
        energy: {
            renewable: number,
            hotfusion: number,
            coldfusion: number,
        },
        farms:{
            citizen:number,
            corpo:number,
        },
    },
    army: {
        corpo: number;
        citizen: number;
    },
    armyname: string,
    navy: {
        corpo: number,
        citizen: number;
    },
    navyname: string,
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

export interface config{
    _id:1;
    removecommands:Array<string>;
    lockedcommands:Array<string>;
    lastpayout:number;
    mods:Array<string>;
    colour:string
}

export interface soldier{
    type:"private" | "citizen",
    costs:{
        money:number,
        food:number,
        metal:number,
        energy:number,
    }
    power:number
}

export interface ship{
    type:"private" | "citizen",
    costs:{
        money:number,
        food:number,
        metal:number,
        energy:number,
    }
    power:number
}

export interface energy{
    type:"private" | "citizen",
    costs:{
        money:number,
        food:number,
        metal:number,
        energy:number,
    }
    power:number
}