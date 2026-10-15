/// <reference types="mithril" />
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
export interface IFieldEditTagsAttrs extends ComponentAttrs {
    discussion?: Discussion;
    selected: Tag[];
    onchange: (tags: Tag[]) => void;
    inputId: string;
}
/**
 * The "tags as a field" option: a single tag (plus its parent) picked from a dropdown.
 */
export default class FieldEditTags extends Component<IFieldEditTagsAttrs> {
    view(): JSX.Element;
    static label(): string;
    required(): boolean;
    maxPrimary(): number;
    maxSecondary(): number;
    selectableTags(): Tag[];
}
