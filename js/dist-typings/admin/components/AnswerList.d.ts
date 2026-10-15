/// <reference types="mithril" />
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
export interface IAnswerListAttrs extends ComponentAttrs {
    field: Field;
}
/**
 * Answers save immediately; they are independent of the surrounding field form.
 */
export default class AnswerList extends Component<IAnswerListAttrs> {
    newContent: any;
    adding: boolean;
    /** Re-keys the list after a drag, see makeSortable(). */
    listKey: number;
    view(): JSX.Element;
    suggestedItem(answer: Answer): JSX.Element;
    freeTextItem(answer: Answer): JSX.Element;
    deleteButton(answer: Answer): JSX.Element;
    add(): void;
    rename(answer: Answer, content: string): void;
    delete(answer: Answer): void;
    reorder(ids: string[]): void;
}
