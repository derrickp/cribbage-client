
import * as React from "react";

export interface ScoreProps {
    score: number;
}

export function Score(props: ScoreProps) {
    return <div className={Classes.SCORE}>{`Your current score is ${props.score}`}</div>;
}

export enum Classes {
    SCORE = "score"
}