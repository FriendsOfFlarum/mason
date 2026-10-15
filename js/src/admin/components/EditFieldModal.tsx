import app from 'flarum/admin/app';
import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Form from 'flarum/common/components/Form';
import FormGroup from 'flarum/common/components/FormGroup';
import Icon from 'flarum/common/components/Icon';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import extractText from 'flarum/common/utils/extractText';
import type RequestError from 'flarum/common/utils/RequestError';
import type Mithril from 'mithril';
import type Field from '../../common/models/Field';
import AnswerList from './AnswerList';

export interface IEditFieldModalAttrs extends IFormModalAttrs {
  /** Omit to create a field. */
  field?: Field;
}

export default class EditFieldModal extends FormModal<IEditFieldModalAttrs> {
  field!: Field;
  name!: Stream<string>;
  description!: Stream<string>;
  required!: Stream<boolean>;
  userValuesAllowed!: Stream<boolean>;
  validation!: Stream<string>;
  showWhenEmpty!: Stream<boolean>;
  icon!: Stream<string>;

  oninit(vnode: Parameters<FormModal<IEditFieldModalAttrs>['oninit']>[0]) {
    super.oninit(vnode);

    this.field = this.attrs.field || app.store.createRecord<Field>('mason-fields');
    this.name = Stream(this.field.name() || '');
    this.description = Stream(this.field.description() || '');
    this.required = Stream(!!this.field.exists && this.field.required());
    this.userValuesAllowed = Stream(!!this.field.user_values_allowed());
    this.validation = Stream(this.field.validation() || '');
    this.showWhenEmpty = Stream(!!this.field.show_when_empty());
    this.icon = Stream(this.field.icon() || '');
  }

  className() {
    return 'EditFieldModal Modal--large';
  }

  title() {
    return this.field.exists
      ? app.translator.trans('fof-mason.admin.fields.edit', {
          field: this.field.name(),
        })
      : app.translator.trans('fof-mason.admin.buttons.new-field');
  }

  content() {
    return [
      <div className="Modal-body">
        <Form>{this.fields().toArray()}</Form>
        {this.field.exists ? (
          <AnswerList field={this.field} />
        ) : (
          <p className="helpText">{app.translator.trans('fof-mason.admin.fields.save-field-for-answers')}</p>
        )}
      </div>,
      <div className="Modal-footer">
        <Button type="submit" className="Button Button--primary" loading={this.loading}>
          {app.translator.trans(this.field.exists ? 'fof-mason.admin.buttons.save-field' : 'fof-mason.admin.buttons.add-field')}
        </Button>
        {this.field.exists && (
          <Button className="Button Button--danger" onclick={this.delete.bind(this)}>
            {app.translator.trans('fof-mason.admin.buttons.delete-field')}
          </Button>
        )}
      </div>,
    ];
  }

  fields(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'name',
      <FormGroup
        type="text"
        name="name"
        label={app.translator.trans('fof-mason.admin.fields.name')}
        help={app.translator.trans('fof-mason.admin.fields.name-help')}
        stream={this.name}
      />,
      100
    );
    items.add(
      'description',
      <FormGroup
        type="text"
        name="description"
        label={app.translator.trans('fof-mason.admin.fields.description')}
        help={app.translator.trans('fof-mason.admin.fields.description-help')}
        stream={this.description}
      />,
      90
    );
    // Multiple answers were never implemented: "required" means exactly one answer.
    items.add('required', <FormGroup type="switch" label={app.translator.trans('fof-mason.admin.fields.required')} stream={this.required} />, 80);
    items.add(
      'userValuesAllowed',
      <FormGroup
        type="switch"
        label={app.translator.trans('fof-mason.admin.fields.user_values_allowed')}
        help={app.translator.trans('fof-mason.admin.fields.user_values_allowed-help')}
        stream={this.userValuesAllowed}
      />,
      70
    );

    if (this.userValuesAllowed()) {
      items.add(
        'validation',
        <FormGroup
          type="text"
          name="validation"
          label={app.translator.trans('fof-mason.admin.fields.validation')}
          help={app.translator.trans('fof-mason.admin.fields.validation-help', {
            a: <a href="https://laravel.com/docs/validation#available-validation-rules" target="_blank" rel="noopener" />,
          })}
          placeholder="string|max:50"
          stream={this.validation}
        />,
        60
      );
    }

    items.add(
      'showWhenEmpty',
      <FormGroup
        type="switch"
        label={app.translator.trans('fof-mason.admin.fields.show_when_empty')}
        help={app.translator.trans('fof-mason.admin.fields.show_when_empty-help')}
        stream={this.showWhenEmpty}
      />,
      50
    );
    items.add(
      'icon',
      <FormGroup
        type="text"
        name="icon"
        label={[app.translator.trans('fof-mason.admin.fields.icon'), this.icon() && [' ', <Icon name={this.icon()} />]]}
        help={app.translator.trans('fof-mason.admin.fields.icon-help', {
          a: <a href="https://fontawesome.com/search?ic=free" target="_blank" rel="noopener" />,
        })}
        placeholder="fas fa-bolt"
        stream={this.icon}
      />,
      40
    );

    return items;
  }

  submitData() {
    return {
      name: this.name(),
      description: this.description() || null,
      min_answers_count: this.required() ? 1 : 0,
      max_answers_count: 1,
      user_values_allowed: this.userValuesAllowed(),
      validation: this.validation() || null,
      show_when_empty: this.showWhenEmpty(),
      icon: this.icon() || null,
    };
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    const created = !this.field.exists;
    this.loading = true;

    this.field.save(this.submitData()).then(
      (field) => {
        // A new record's save resolves to a different, stored instance.
        this.field = field;

        // A new field stays open so its answers can be added straight away.
        if (created) this.loaded();
        else this.hide();
      },
      (error: RequestError) => {
        this.loading = false;
        this.onerror(error);
      }
    );
  }

  delete() {
    if (!confirm(extractText(app.translator.trans('fof-mason.admin.messages.delete-field-confirmation', { name: this.field.name() })))) return;

    this.field.delete().then(() => m.redraw());
    this.hide();
  }
}
