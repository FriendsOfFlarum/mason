import type Discussion from 'flarum/common/models/Discussion';
import type { IInternalModalAttrs } from 'flarum/common/components/Modal';
import type { IFieldsEditorModalAttrs } from '../components/FieldsEditorModal';
/**
 * The editor (modal + inputs) is its own chunk: only composing or editing answers needs it.
 */
export declare const loadFieldsEditor: () => Promise<typeof import("../components/FieldsEditorModal")>;
export declare function openFieldsEditor(attrs: Omit<IFieldsEditorModalAttrs, keyof IInternalModalAttrs>): Promise<void>;
export declare function editDiscussionFields(discussion: Discussion): Promise<void>;
