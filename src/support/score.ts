
import { BASE_API_URL } from "../config";

import { Card } from "../data/Card";

export async function calculateScore(hand: Card[], cutCard: Card, isCrib: boolean = false): Promise<number> {
    const urlParameters = [`hand=${encodeURIComponent(hand.map(card => card.key).join(" "))}`, cutCard ? `cut=${cutCard.key}`: '', isCrib ? "crib=true" : ""];
    const url = `${BASE_API_URL}/score?${urlParameters.join("&")}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error getting score");
    }
    const score = Number.parseInt(await response.text());
    return score;
}