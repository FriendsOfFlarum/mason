/// <reference types="mithril" />
import Component from 'flarum/common/Component';
import type Field from '../../common/models/Field';
export declare function editField(field?: Field): Promise<void>;
export default class FieldList extends Component {
    loading: boolean;
    /** Re-keys the list after a drag, see makeSortable(). */
    listKey: number;
    oninit(vnode: Parameters<Component['oninit']>[0]): void;
    view(): JSX.Element;
    item(field: Field): JSX.Element;
    reorder(ids: string[]): void;
}
