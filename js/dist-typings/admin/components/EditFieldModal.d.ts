import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import type Mithril from 'mithril';
import type Field from '../../common/models/Field';
export interface IEditFieldModalAttrs extends IFormModalAttrs {
    /** Omit to create a field. */
    field?: Field;
}
export default class EditFieldModal extends FormModal<IEditFieldModalAttrs> {
    field: Field;
    name: Stream<string>;
    description: Stream<string>;
    required: Stream<boolean>;
    userValuesAllowed: Stream<boolean>;
    validation: Stream<string>;
    showWhenEmpty: Stream<boolean>;
    icon: Stream<string>;
    oninit(vnode: Parameters<FormModal<IEditFieldModalAttrs>['oninit']>[0]): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element[];
    fields(): ItemList<Mithril.Children>;
    submitData(): {
        name: any;
        description: any;
        min_answers_count: number;
        max_answers_count: number;
        user_values_allowed: any;
        validation: any;
        show_when_empty: any;
        icon: any;
    };
    onsubmit(e: SubmitEvent): void;
    delete(): void;
}
