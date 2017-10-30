
import { Card } from "../../src/data/Card";

export function createCard(key: string): Card {
    const card: Card = {
        key,
        name: getName(key[0]),
        suit: getSuit(key[1]),
        fullName: key
    };
    return card;
}

export function createCards(card_keys: string): Card[] {
    const cards = card_keys.split(" ").map(key => createCard(key));
    return cards;
}

function getSuit(suit_part: string): string {
    switch (suit_part) {
        case "C":
        case "c":
            return "clubs";
        case "D":
        case "d":
            return "diamonds";
        case "H":
        case "h":
            return "hearts";
        case "S":
        case "s":
        default:
            return "spades";
    }
}

function getName(name_part: string): string {
    switch (name_part) {
        case "A":
        case "a":
            return "ace";
        case "2":
            return "two";
        case "3":
            return "three";
        case "4":
            return "four";
        case "5":
            return "five";
        case "6":
            return "six";
        case "7":
            return "seven";
        case "8":
            return "eight";
        case "9":
            return "nine";
        case "T":
        case "t":
            return "ten";
        case "Q":
        case "q":
            return "queen";
        case "K":
        case "k":
        default:
            return "king";
    }
}