import { atom } from "recoil";


export const User = atom({
    key:"User",
    default:null
})

export const eventListAtom = atom({
    key:"eventListAtom",
    default:[]
})

export const currentMonthAtom = atom({
    key:"currentMonthAtom",
    default:""
})

export const currentYearAtom = atom({
    key:"currentYearAtom",
    default:""
})