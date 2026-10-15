import app from 'flarum/admin/app';
import ExtensionPage, { type ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import type Mithril from 'mithril';
import FieldList from './FieldList';

/**
 * Core's extension page (registered settings + permissions) with the field manager on top.
 */
export default class MasonPage extends ExtensionPage {
  sections(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>) {
    const items = super.sections(vnode);

    items.add(
      'fields',
      <div className="ExtensionPage-settings MasonPage-fields">
        <div className="container">
          <h3 className="ExtensionPage-subHeader">{app.translator.trans('fof-mason.admin.titles.fields')}</h3>
          <FieldList />
        </div>
      </div>,
      10
    );

    return items;
  }
}
