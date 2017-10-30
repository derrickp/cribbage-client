
import { Hand } from "./Hand";

export interface Scorer {
    hand: Hand;
    readonly total: number;
    calculate(): Promise<void>;
}