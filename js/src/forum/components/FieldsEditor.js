import app from 'flarum/forum/app';
import icon from 'flarum/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';
import Component from 'flarum/common/Component';
import classList from 'flarum/common/utils/classList';

import sortByAttribute from '@lib/helpers/sortByAttribute';
import FieldEditDropdown from './FieldEditDropdown';
import FieldEditText from './FieldEditText';
import FieldEditTags from './FieldEditTags';
import FieldGrid from './FieldGrid';

export default class FieldsEditor extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.fields = sortByAttribute(app.store.all('mason-fields'));

        // Index to quickly do a reverse lookup from answer to field
        this.answerToFieldIndex = [];
        this.fields.forEach((field) => {
            field.suggested_answers().forEach((answer) => {
                this.answerToFieldIndex[answer.id()] = field.id();
            });
        });
    }

    view() {
        return m('.Mason-Fields.Mason-Fields--editor', [this.headItems().toArray(), <FieldGrid items={this.fieldItems().toArray()} />]);
    }

    updateSelection(field, fieldAnswers) {
        // Keep only answers to other fields
        let answers = this.attrs.answers.filter((answer) => {
            const reverseFieldLookup = this.answerToFieldIndex[answer.id()];

            // If the answer is not in the reverse lookup table it's probably a non-suggested (user) answer
            // In that case the field should be linked in the relationship
            if (typeof reverseFieldLookup === 'undefined') {
                return answer.field().id() !== field.id();
            }

            return reverseFieldLookup !== field.id();
        });

        answers = answers.concat(fieldAnswers);

        this.attrs.onchange(answers);
    }

    headItems() {
        const items = new ItemList();

        if (app.forum.attribute('fof-mason.fields-section-title')) {
            items.add('title', <h5 class=".Mason-Field--title">{app.forum.attribute('fof-mason.fields-section-title')}</h5>);
        }

        return items;
    }

    fieldItems() {
        const items = new ItemList();

        if (app.forum.attribute('fof-mason.tags-as-fields')) {
            items.add(
                'tags',
                <FieldEditTags
                    discussion={this.attrs.discussion}
                    onchange={(tags) => {
                        this.attrs.ontagchange && this.attrs.ontagchange(tags);
                    }}
                />
            );
        }

        this.fields.forEach((field) => {
            const inputAttrs = {
                field,
                answers: this.attrs.answers,
                onchange: (fieldAnswers) => {
                    // Every input component calls "onchange" with a list of answers from the store
                    this.updateSelection(field, fieldAnswers);
                },
            };
            let input = null;

            if (field.user_values_allowed()) {
                input = FieldEditText.component(inputAttrs);
            } else {
                input = FieldEditDropdown.component(inputAttrs);
            }

            items.add(
                'field-' + field.id(),
                <div
                    class={classList(
                        '.Mason-Field.Form-group',
                        app.forum.attribute('fof-mason.labels-as-placeholders') && 'Mason-Field--label-as-placeholder'
                    )}
                >
                    {m('label', [field.icon() ? [icon(field.icon()), ' '] : null, field.name(), field.required() ? ' *' : null])}
                    {input}
                    {field.description() ? m('.helpText', field.description()) : null})
                </div>
            );
        });

        return items;
    }
}
