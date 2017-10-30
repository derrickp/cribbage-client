
import { Option } from "./Option";

export interface Card {
    name: string;
    suit: string;
    fullName: string;
    key: string;
    image?: string;
}

export const sortOptions: Option[] = [
    {
        value: "name",
        label: "Name"
    },
    {
        value: "suit",
        label: "Suit"
    }
];

export function sortByName(a: Card, b: Card): number {
    if (nameSortValues.get(a.name) < nameSortValues.get(b.name)) return -1;
    if (nameSortValues.get(a.name) > nameSortValues.get(b.name)) return 1;
    return sortBySuit(a, b);
}

export function sortBySuit(a: Card, b: Card): number {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    return sortByName(a, b);
}

const nameSortValues: Map<string, number> = new Map([
    ["ace", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["ten", 10],
    ["jack", 11],
    ["queen", 12],
    ["king", 13]
]);