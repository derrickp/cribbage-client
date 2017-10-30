
import { BASE_API_URL } from "../config";

import { Card } from "../data/Card";

export async function getCards(): Promise<Card[]> {
    const response = await fetch(BASE_API_URL + "/cards");
    const cards = await response.json();
    return cards;
}