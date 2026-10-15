import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Icon from 'flarum/common/components/Icon';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
import { bySort, present } from '../../common/utils/fields';

export interface IFieldEditDropdownAttrs extends ComponentAttrs {
  field: Field;
  /** This field's current answers. */
  answers: Answer[];
  onchange: (answers: Answer[]) => void;
  inputId: string;
}

export default class FieldEditDropdown extends Component<IFieldEditDropdownAttrs> {
  view() {
    const { field, answers, onchange, inputId } = this.attrs;
    const suggested = bySort(present(field.suggestedAnswers()));
    const selectedIds = answers.map((answer) => answer.id());

    return (
      <span className="Select">
        <select
          id={inputId}
          className="Select-input FormControl"
          multiple={field.multiple()}
          onchange={(event: Event) => {
            const select = event.target as HTMLSelectElement;
            const ids = field.multiple()
              ? Array.from(select.options)
                  .filter((option) => option.selected)
                  .map((option) => option.value)
              : [select.value];

            onchange(suggested.filter((answer) => ids.includes(answer.id()!)));
          }}
        >
          {!field.multiple() && (
            <option value="" selected={!selectedIds.length} disabled={field.required()} hidden={this.placeholderHidden()}>
              {this.placeholder()}
            </option>
          )}
          {suggested.map((answer) => (
            <option value={answer.id()} selected={selectedIds.includes(answer.id())}>
              {answer.content()}
            </option>
          ))}
        </select>
        <Icon name="fas fa-caret-down" className="Select-caret" />
      </span>
    );
  }

  /**
   * With labels hidden, the placeholder is the only place the field name shows, so it must stay visible.
   */
  placeholderHidden(): boolean {
    return !app.forum.attribute('fof-mason.labels-as-placeholders') && this.attrs.field.required();
  }

  placeholder(): string {
    const { field } = this.attrs;
    const prompt = app.translator.trans(
      field.required() ? 'fof-mason.forum.answers.choose-option' : 'fof-mason.forum.answers.no-option-selected',
      {},
      true
    );

    if (app.forum.attribute('fof-mason.labels-as-placeholders')) {
      return `${field.name()}${field.required() ? ' *' : ''} - ${prompt}`;
    }

    return prompt;
  }
}
