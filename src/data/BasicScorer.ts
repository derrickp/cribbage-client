
import { Card } from "./Card";
import { Hand } from "./Hand";
import { Scorer } from "./Scorer";

export class BasicScorer implements Scorer {
    private _total: number;
    private _hand: Hand;

    calculateScore: (cards: Card[], cutCard: Card, isCrib?: boolean) => Promise<number>;

    get hand() {
        return this._hand;
    }

    set hand(value: Hand) {
        this._hand = value;
        delete this._total;
    }

    get total():number  {
        return this._total;
    }

    set total(value) {
        throw new Error("readonly");
    }

    async calculate(): Promise<void> {
        if (!this.hand || !this.hand.cards) {
            return;
        }

        if (!this.calculateScore) {
            return;
        }

        const total = await this.calculateScore(this.hand.cards, this.hand.cut, this.hand.isCrib);
        this._total = total;
    }
}