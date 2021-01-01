import { Command } from "./types";
import * as Discord from "discord.js";
export declare const client: Discord.Client;
export declare let prefix: string;
export declare function commandloader(commands: Command[], local: string): Promise<void>;
