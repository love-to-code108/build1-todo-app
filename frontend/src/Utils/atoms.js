import { atom } from "recoil";


export const User = atom({
    key: "User",
    default: null
})

export const eventListAtom = atom({
    key: "eventListAtom",
    default: []
})

export const currentMonthAtom = atom({
    key: "currentMonthAtom",
    default: ""
})

export const currentYearAtom = atom({
    key: "currentYearAtom",
    default: ""
})

export const unApprovedEventListAtom = atom({
    key: "unApprovedEventListAtom",
    default: ""
})

export const monthNameArrayAtom = atom({
    key: "monthNameArrayAtom",
    default: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
})