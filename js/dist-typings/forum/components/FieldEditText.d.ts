/// <reference types="mithril" />
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
export interface IFieldEditTextAttrs extends ComponentAttrs {
    field: Field;
    /** This field's current answers; free-text fields hold at most one. */
    answers: Answer[];
    onchange: (answers: Answer[]) => void;
    inputId: string;
}
export default class FieldEditText extends Component<IFieldEditTextAttrs> {
    view(): JSX.Element;
}
