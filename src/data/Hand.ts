
import { Card } from "./Card";

export interface Hand {
    cards: Card[];
    cutCard?: Card;
    isCrib?: boolean;
}