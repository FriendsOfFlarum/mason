import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import type Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
export interface IFieldsEditorModalAttrs extends IFormModalAttrs {
    answers: Answer[];
    /** Set when editing an existing discussion; also scopes the "tags as a field" option. */
    discussion?: Discussion;
    /** Persists the answers before the modal closes, so request errors are shown in it. */
    save?: (answers: Answer[], tags: Tag[] | null) => Promise<unknown>;
    /** Receives the answers once the modal has fully closed, so it may open another modal. */
    onsubmit?: (answers: Answer[], tags: Tag[] | null) => void;
}
export default class FieldsEditorModal extends FormModal<IFieldsEditorModalAttrs> {
    answers: Answer[];
    /** Stays null unless the "tags as a field" option changed them. */
    tags: Tag[] | null;
    invalid: Field[];
    oninit(vnode: Parameters<FormModal<IFieldsEditorModalAttrs>['oninit']>[0]): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element[];
    onsubmit(e: SubmitEvent): void;
    protected close(): void;
}
