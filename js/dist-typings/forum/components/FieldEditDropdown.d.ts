import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
export interface IFieldEditDropdownAttrs extends ComponentAttrs {
    field: Field;
    /** This field's current answers. */
    answers: Answer[];
    onchange: (answers: Answer[]) => void;
    inputId: string;
}
export default class FieldEditDropdown extends Component<IFieldEditDropdownAttrs> {
    view(): JSX.Element;
    /**
     * With labels hidden, the placeholder is the only place the field name shows, so it must stay visible.
     */
    placeholderHidden(): boolean;
    placeholder(): string;
}
