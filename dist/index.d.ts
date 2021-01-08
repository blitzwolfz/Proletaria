import { Command } from "./types";
import * as Discord from "discord.js";
export declare const client: Discord.Client;
export declare let prefix: string;
export declare function reloadcommands(localcommands: Command[]): Promise<string>;
export declare function removecommands(localcommands: Command[], args: string[]): Promise<string>;
export declare function updatecommands(localcommands: Command[]): Promise<void>;
