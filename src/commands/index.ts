
import { buy, store } from "./economy/store"
import { beg, work } from "./economy/work"
import  { nerdping, ping } from "./ping"
import { prefix } from "./server/guild"
import  { createuser, rename } from "./util/create"
import  { userstats } from "./util/stat"

export default [
    createuser,
    ping,
    nerdping,
    userstats,
    prefix,
    work,
    beg,
    rename, 
    store,
    buy
]