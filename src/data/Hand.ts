
import { Card } from "./Card";

export interface Hand {
    cards: Card[];
    cut: Card;
    isCrib: boolean;
}