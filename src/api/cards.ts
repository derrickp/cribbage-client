
import { BASE_CRIB_URL } from "../config";
import { Card } from "../data/Card";

export async function getCards(): Promise<Card[]> {
    const response = await fetch(BASE_CRIB_URL + "/cards");
    const cards = await response.json();
    return cards;
}