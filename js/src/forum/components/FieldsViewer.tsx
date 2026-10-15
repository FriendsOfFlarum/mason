import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import type Discussion from 'flarum/common/models/Discussion';
import type Mithril from 'mithril';
import { answersFor, bySort, present, sortedFields } from '../../common/utils/fields';
import { editDiscussionFields } from '../utils/fieldsEditor';

export interface IFieldsViewerAttrs extends ComponentAttrs {
  discussion: Discussion;
  /** `post`: under the first post's body; `hero`: inside the discussion hero. */
  placement: 'post' | 'hero';
}

export default class FieldsViewer extends Component<IFieldsViewerAttrs> {
  view() {
    const { discussion, placement } = this.attrs;
    const fields = this.fieldItems().toArray();
    const header = this.headerItems().toArray();

    if (!fields.length && (!header.length || app.forum.attribute('fof-mason.hide-empty-fields-section'))) {
      return null;
    }

    return (
      <section className={classList('Mason-Details', `Mason-Details--${placement}`)} aria-label={this.title() || undefined}>
        {header.length > 0 && <header className="Mason-Details-header">{header}</header>}
        {fields.length > 0 && (
          <dl className="Mason-Details-list" data-columns={app.forum.attribute<number>('fof-mason.column-count') || 1}>
            {fields}
          </dl>
        )}
      </section>
    );
  }

  title(): string {
    return app.forum.attribute<string>('fof-mason.fields-section-title') || '';
  }

  headerItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const { discussion } = this.attrs;

    if (this.title()) {
      items.add('title', <h3 className="Mason-Details-title">{this.title()}</h3>, 10);
    }

    if (discussion.canUpdateMasonAnswers()) {
      items.add(
        'edit',
        <Button className="Button Button--link Mason-Details-edit" icon="fas fa-pen" onclick={() => editDiscussionFields(discussion)}>
          {app.translator.trans('fof-mason.forum.discussion-controls.edit-answers')}
        </Button>,
        -10
      );
    }

    return items;
  }

  fieldItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const fields = sortedFields();
    const answers = present(this.attrs.discussion.masonAnswers());

    fields.forEach((field, index) => {
      const fieldAnswers = bySort(answersFor(field, answers, fields));

      if (!fieldAnswers.length && !field.show_when_empty()) return;

      items.add(
        `field-${field.id()}`,
        <div className="Mason-Details-item">
          <dt>
            {field.icon() && <Icon name={field.icon()!} />}
            {field.name()}
          </dt>
          <dd>
            {fieldAnswers.length ? (
              fieldAnswers.map((answer) => <span className="Mason-Details-value">{answer.content()}</span>)
            ) : (
              <em className="Mason-Details-empty">{app.translator.trans('fof-mason.forum.post-answers.no-answer')}</em>
            )}
          </dd>
        </div>,
        -index
      );
    });

    return items;
  }
}
