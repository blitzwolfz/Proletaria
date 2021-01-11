
import { modadd, payouAllUsers, payoutUser } from "./economy/owner/mod"
import { buy, store } from "./economy/store"
import { beg, work } from "./economy/work"
import  { botinvite, helpserver, nerdping, ping } from "./misc"
import { prefix } from "./server/guild"
import  { createuser, rename, userdelete } from "./util/create"
import  { earnings, userstats } from "./economy/stat"
import { guide, help } from "./util/help"
import { lb } from "./leaderboards"

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
    helpserver,
    botinvite,
    guide,
    earnings,
    lb,
    payoutUser,
    payouAllUsers
]