import { Client } from "discord.js";
import { user } from "../../types";
export declare function megaloop(client: Client): Promise<void>;
export declare function workreminderloop(client: Client): Promise<void>;
export declare function foodreminderloop(client: Client): Promise<void>;
export declare function payouts(): Promise<void>;
export declare function payout(u: user): Promise<void>;
