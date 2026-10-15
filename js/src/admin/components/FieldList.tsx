import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import type Field from '../../common/models/Field';
import { bySort, present } from '../../common/utils/fields';
import { makeSortable, saveOrder } from '../utils/sortable';

export function editField(field?: Field) {
  return app.modal.show(() => import('./EditFieldModal'), { field });
}

export default class FieldList extends Component {
  loading = true;
  /** Re-keys the list after a drag, see makeSortable(). */
  listKey = 0;

  oninit(vnode: Parameters<Component['oninit']>[0]) {
    super.oninit(vnode);

    app.store.find<Field[]>('mason-fields').then(() => {
      this.loading = false;
      m.redraw();
    });
  }

  view() {
    if (this.loading) return <LoadingIndicator />;

    const fields = bySort(app.store.all<Field>('mason-fields'));

    return (
      <div className="MasonFieldList">
        {fields.length ? (
          // Mithril forbids keyed and unkeyed siblings, so the re-keyed list gets its own parent.
          <div>
            <ol
              key={this.listKey}
              className="MasonFieldList-list"
              oncreate={(vnode) => makeSortable(vnode.dom as HTMLElement, '.MasonFieldList-handle', (ids) => this.reorder(ids))}
            >
              {fields.map((field) => this.item(field))}
            </ol>
          </div>
        ) : (
          <p className="helpText">{app.translator.trans('fof-mason.admin.field-list.empty')}</p>
        )}
        <Button className="Button" icon="fas fa-plus" onclick={() => editField()}>
          {app.translator.trans('fof-mason.admin.buttons.new-field')}
        </Button>
      </div>
    );
  }

  item(field: Field) {
    const suggested = present(field.allAnswers()).filter((answer) => answer.is_suggested()).length;

    return (
      <li key={field.id()} data-id={field.id()} className="MasonFieldList-item">
        <span className="MasonFieldList-handle" aria-hidden="true">
          <Icon name="fas fa-grip-vertical" />
        </span>
        <span className="MasonFieldList-name">
          {field.icon() && <Icon name={field.icon()!} />}
          {field.name()}
        </span>
        <span className="MasonFieldList-meta">
          {field.required() && <span className="MasonFieldList-badge">{app.translator.trans('fof-mason.admin.fields.required')}</span>}
          <span className="MasonFieldList-badge">
            {field.user_values_allowed()
              ? app.translator.trans('fof-mason.admin.field-list.free-text')
              : app.translator.trans('fof-mason.admin.field-list.dropdown', { count: suggested })}
          </span>
        </span>
        <Button className="Button Button--link" icon="fas fa-pencil-alt" onclick={() => editField(field)}>
          {app.translator.trans('fof-mason.admin.buttons.edit-field')}
        </Button>
      </li>
    );
  }

  reorder(ids: string[]) {
    ids.forEach((id, sort) => app.store.getById<Field>('mason-fields', id)?.pushAttributes({ sort }));
    this.listKey++;
    m.redraw();

    saveOrder('/mason-fields/order', ids);
  }
}
