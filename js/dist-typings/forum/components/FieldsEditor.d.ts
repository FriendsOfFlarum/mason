import Component, { type ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import type Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import type Mithril from 'mithril';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
export interface IFieldsEditorAttrs extends ComponentAttrs {
    answers: Answer[];
    /** Merge against your current state rather than `answers`: two inputs can change before a redraw. */
    onchange: (field: Field, fieldAnswers: Answer[]) => void;
    /** Only used by the "tags as a field" option. */
    discussion?: Discussion;
    tags?: Tag[];
    ontagchange?: (tags: Tag[]) => void;
    /** Fields to flag as missing an answer. */
    invalid?: Field[];
}
export default class FieldsEditor extends Component<IFieldsEditorAttrs> {
    view(): JSX.Element;
    fieldItems(): ItemList<Mithril.Children>;
    group(inputId: string, label: Mithril.Children, input: Mithril.Children, help?: string | null, invalid?: boolean): Mithril.Children;
}
