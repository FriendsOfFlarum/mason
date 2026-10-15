import ExtensionPage, { type ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import type Mithril from 'mithril';
/**
 * Core's extension page (registered settings + permissions) with the field manager on top.
 */
export default class MasonPage extends ExtensionPage {
    sections(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): import("flarum/common/utils/ItemList").default<unknown>;
}
