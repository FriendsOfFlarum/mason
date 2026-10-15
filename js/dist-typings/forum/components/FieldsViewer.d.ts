import Component, { type ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import type Discussion from 'flarum/common/models/Discussion';
import type Mithril from 'mithril';
export interface IFieldsViewerAttrs extends ComponentAttrs {
    discussion: Discussion;
    /** `post`: under the first post's body; `hero`: inside the discussion hero. */
    placement: 'post' | 'hero';
}
export default class FieldsViewer extends Component<IFieldsViewerAttrs> {
    view(): JSX.Element | null;
    title(): string;
    headerItems(): ItemList<Mithril.Children>;
    fieldItems(): ItemList<Mithril.Children>;
}
