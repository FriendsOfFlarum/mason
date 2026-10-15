import app from 'flarum/admin/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import Stream from 'flarum/common/utils/Stream';
import extractText from 'flarum/common/utils/extractText';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
import { byContent, bySort, present } from '../../common/utils/fields';
import { makeSortable, saveOrder } from '../utils/sortable';

export interface IAnswerListAttrs extends ComponentAttrs {
  field: Field;
}

/**
 * Answers save immediately; they are independent of the surrounding field form.
 */
export default class AnswerList extends Component<IAnswerListAttrs> {
  newContent = Stream('');
  adding = false;
  /** Re-keys the list after a drag, see makeSortable(). */
  listKey = 0;

  view() {
    const answers = present(this.attrs.field.allAnswers());
    const suggested = bySort(answers.filter((answer) => answer.is_suggested()));
    const freeText = byContent(answers.filter((answer) => !answer.is_suggested()));

    return (
      <div className="Form-group MasonAnswerList">
        <label>{app.translator.trans('fof-mason.admin.titles.field-answers')}</label>
        <div className="helpText">{app.translator.trans('fof-mason.admin.answers.help')}</div>

        {suggested.length > 0 && (
          // Mithril forbids keyed and unkeyed siblings, so the re-keyed list gets its own parent.
          <div>
            <ol
              key={this.listKey}
              className="MasonAnswerList-list"
              oncreate={(vnode) => makeSortable(vnode.dom as HTMLElement, '.MasonAnswerList-handle', (ids) => this.reorder(ids))}
            >
              {suggested.map((answer) => this.suggestedItem(answer))}
            </ol>
          </div>
        )}

        <div className="MasonAnswerList-add">
          <input
            className="FormControl"
            bidi={this.newContent}
            placeholder={app.translator.trans('fof-mason.admin.fields.new-answer-placeholder', {}, true)}
            aria-label={extractText(app.translator.trans('fof-mason.admin.fields.new-answer'))}
            onkeydown={(e: KeyboardEvent) => {
              // Enter would otherwise submit the field form around this list.
              if (e.key === 'Enter') {
                e.preventDefault();
                this.add();
              }
            }}
          />
          <Button className="Button" icon="fas fa-plus" loading={this.adding} disabled={!this.newContent().trim()} onclick={this.add.bind(this)}>
            {app.translator.trans('fof-mason.admin.buttons.add-answer')}
          </Button>
        </div>

        {freeText.length > 0 && (
          <details className="MasonAnswerList-freeText">
            <summary>{app.translator.trans('fof-mason.admin.buttons.show-user-answers', { count: freeText.length })}</summary>
            <ul>{freeText.map((answer) => this.freeTextItem(answer))}</ul>
          </details>
        )}
      </div>
    );
  }

  suggestedItem(answer: Answer) {
    return (
      <li key={answer.id()} data-id={answer.id()} className="MasonAnswerList-item">
        <span className="MasonAnswerList-handle" aria-hidden="true">
          <Icon name="fas fa-grip-vertical" />
        </span>
        <input
          className="FormControl"
          value={answer.content()}
          aria-label={extractText(app.translator.trans('fof-mason.admin.buttons.edit-answer'))}
          title={extractText(app.translator.trans('fof-mason.admin.buttons.edit-answer-prompt'))}
          onchange={(e: Event) => this.rename(answer, (e.target as HTMLInputElement).value)}
          onkeydown={(e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        <Button
          className="Button Button--icon Button--link"
          icon="fas fa-eye-slash"
          aria-label={app.translator.trans('fof-mason.admin.answers.unsuggest')}
          title={extractText(app.translator.trans('fof-mason.admin.answers.unsuggest'))}
          onclick={() => answer.save({ is_suggested: false }).then(() => m.redraw())}
        />
        {this.deleteButton(answer)}
      </li>
    );
  }

  freeTextItem(answer: Answer) {
    return (
      <li key={answer.id()} className="MasonAnswerList-item">
        <span className="MasonAnswerList-content">{answer.content()}</span>
        <Button className="Button Button--link" icon="fas fa-eye" onclick={() => answer.save({ is_suggested: true }).then(() => m.redraw())}>
          {app.translator.trans('fof-mason.admin.answers.suggest')}
        </Button>
        {this.deleteButton(answer)}
      </li>
    );
  }

  deleteButton(answer: Answer) {
    return (
      <Button
        className="Button Button--icon Button--link MasonAnswerList-delete"
        icon="fas fa-times"
        aria-label={app.translator.trans('fof-mason.admin.buttons.delete-answer')}
        title={extractText(app.translator.trans('fof-mason.admin.buttons.delete-answer'))}
        onclick={() => this.delete(answer)}
      />
    );
  }

  add() {
    const content = this.newContent().trim();

    if (!content || this.adding) return;

    this.adding = true;

    // The response includes `field.allAnswers`, which refreshes this list.
    app.store
      .createRecord<Answer>('mason-answers')
      .save({
        content,
        is_suggested: true,
        relationships: { field: this.attrs.field },
      })
      .then(() => this.newContent(''))
      .finally(() => {
        this.adding = false;
        m.redraw();
      });
  }

  rename(answer: Answer, content: string) {
    content = content.trim();

    if (!content || content === answer.content()) {
      m.redraw();
      return;
    }

    answer.save({ content }).then(() => m.redraw());
  }

  delete(answer: Answer) {
    if (!confirm(extractText(app.translator.trans('fof-mason.admin.messages.delete-answer-confirmation', { content: answer.content() })))) return;

    answer.delete().then(() => m.redraw());
  }

  reorder(ids: string[]) {
    ids.forEach((id, sort) => app.store.getById<Answer>('mason-answers', id)?.pushAttributes({ sort }));
    this.listKey++;
    m.redraw();

    saveOrder(`/mason-fields/${this.attrs.field.id()}/answers/order`, ids);
  }
}
