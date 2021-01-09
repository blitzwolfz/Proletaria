import { Client } from "discord.js";
import { Command, user } from "../types";
export declare const lb: Command;
export declare function lbBuilder(page: number | undefined, client: Client, data: user[], id: string, symbol: string, secondary?: string): Promise<{
    title: string;
    description: string;
    fields: {
        name: string;
        value: string;
    }[];
    color: string;
    timestamp: Date;
}>;
