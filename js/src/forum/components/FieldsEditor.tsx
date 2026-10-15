import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Icon from 'flarum/common/components/Icon';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import type Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import type Mithril from 'mithril';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
import { answersFor, sortedFields } from '../../common/utils/fields';
import FieldEditDropdown from './FieldEditDropdown';
import FieldEditTags from './FieldEditTags';
import FieldEditText from './FieldEditText';

export interface IFieldsEditorAttrs extends ComponentAttrs {
  answers: Answer[];
  /** Merge against your current state rather than `answers`: two inputs can change before a redraw. */
  onchange: (field: Field, fieldAnswers: Answer[]) => void;
  /** Only used by the "tags as a field" option. */
  discussion?: Discussion;
  tags?: Tag[];
  ontagchange?: (tags: Tag[]) => void;
  /** Fields to flag as missing an answer. */
  invalid?: Field[];
}

export default class FieldsEditor extends Component<IFieldsEditorAttrs> {
  view() {
    return (
      <div className="Mason-Editor" data-columns={app.forum.attribute<number>('fof-mason.column-count') || 1}>
        {this.fieldItems().toArray()}
      </div>
    );
  }

  fieldItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const { answers, invalid = [] } = this.attrs;
    const fields = sortedFields();

    if (app.forum.attribute('fof-mason.tags-as-fields') && 'flarum-tags' in flarum.extensions) {
      items.add(
        'tags',
        this.group(
          'tags',
          FieldEditTags.label(),
          <FieldEditTags
            inputId="mason-field-tags"
            discussion={this.attrs.discussion}
            selected={this.attrs.tags ?? (this.attrs.discussion?.tags() || []).filter((tag): tag is Tag => !!tag)}
            onchange={(tags: Tag[]) => this.attrs.ontagchange?.(tags)}
          />
        ),
        100
      );
    }

    fields.forEach((field, index) => {
      const inputId = `mason-field-${field.id()}`;
      const inputAttrs = {
        field,
        inputId,
        answers: answersFor(field, answers, fields),
        onchange: (fieldAnswers: Answer[]) => this.attrs.onchange(field, fieldAnswers),
      };

      items.add(
        `field-${field.id()}`,
        this.group(
          inputId,
          [field.icon() && <Icon name={field.icon()!} />, field.name(), field.required() && <span className="Mason-required"> *</span>],
          field.user_values_allowed() ? <FieldEditText {...inputAttrs} /> : <FieldEditDropdown {...inputAttrs} />,
          field.description(),
          invalid.includes(field)
        ),
        -index
      );
    });

    return items;
  }

  group(inputId: string, label: Mithril.Children, input: Mithril.Children, help?: string | null, invalid = false): Mithril.Children {
    return (
      <div
        className={classList('Form-group Mason-Field', {
          'Mason-Field--invalid': invalid,
        })}
      >
        <label
          for={inputId}
          className={classList({
            'visually-hidden': app.forum.attribute('fof-mason.labels-as-placeholders'),
          })}
        >
          {label}
        </label>
        {input}
        {invalid ? (
          <div className="helpText Mason-Field-error">{app.translator.trans('fof-mason.forum.answers.required')}</div>
        ) : (
          help && <div className="helpText">{help}</div>
        )}
      </div>
    );
  }
}
