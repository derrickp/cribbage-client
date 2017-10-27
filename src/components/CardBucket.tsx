
import * as React from "react";
import * as classNames from "classnames";

import { Droppable } from 'react-beautiful-dnd';
import Select from "react-select";

import { Card } from "../data/Card";
import { Card as CardComponent } from "./Card";
import { Option } from "../data/Option";

export interface CardBucketProps {
    id: string;
    name: string;
    cards: Card[];
    sortCards?: (sortOption: Option, id: string) => void;
    sortOptions?: Option[];
    sortValue?: Option;
    sortEnabled?: boolean;
    additionalClass?: string;
}

export interface CardBucketState {
    filter: string;
}

export class CardBucket extends React.Component<CardBucketProps, CardBucketState> {

    constructor(props: CardBucketProps) {
        super(props);
        this.state = {
            filter: ""
        }
        this.getBucketClass = this.getBucketClass.bind(this);
        this.sortChanged = this.sortChanged.bind(this);
    }

    getBucketClass(dragging: boolean): string {
        const classMap = ({
            [BucketClasses.DRAGGING]: dragging
        } as any);
        return classNames(BucketClasses.BUCKET, classMap, this.props.additionalClass);
    }

    sortChanged(option: Option) {
        this.props.sortCards(option, this.props.id);
    }

    render() {
        const cards = this.props.cards.map(card => <CardComponent key={card.key} card={card} />);
        const sortValue = this.props.sortValue ? this.props.sortValue.value : undefined;

        return (
            <Droppable droppableId={this.props.id}>
                {(provided, snapshot) => (
                    <div className={BucketClasses.BUCKET_CONTAINER}>
                        <div className="header">
                            <h4>
                                {this.props.name}
                            </h4>
                            {this.props.sortEnabled && <Select options={this.props.sortOptions} value={sortValue} placeholder="Sort by" clearable={false} onChange={this.sortChanged}></Select>}
                        </div>
                        <div
                            ref={provided.innerRef}
                            className={this.getBucketClass(snapshot.isDraggingOver)}>
                            {cards}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        );
    }
}

export enum BucketClasses {
    BUCKET = "card-bucket",
    BUCKET_CONTAINER = "bucket-container",
    DRAGGING = "drag-over"
};