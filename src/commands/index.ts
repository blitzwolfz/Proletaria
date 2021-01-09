
import { modadd } from "./economy/owner/mod"
import { buy, store } from "./economy/store"
import { beg, work } from "./economy/work"
import  { nerdping, ping } from "./ping"
import { prefix } from "./server/guild"
import  { createuser, rename, userdelete } from "./util/create"
import  { earnings, userstats } from "./economy/stat"
import { guide, help } from "./util/help"

export default [
    createuser,
    userdelete,
    ping,
    nerdping,
    userstats,
    prefix,
    work,
    beg,
    rename, 
    store,
    buy,
    modadd,
    help,
    guide,
    earnings,
]