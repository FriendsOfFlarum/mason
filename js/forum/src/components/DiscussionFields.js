import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import sortByAttribute from 'flagrow/mason/helpers/sortByAttribute';
import FieldEditDropdown from 'flagrow/mason/components/FieldEditDropdown';
import FieldEditText from 'flagrow/mason/components/FieldEditText';

export default class DiscussionFields extends Component {
    init() {
        this.fields = sortByAttribute(app.store.all('flagrow-mason-field'));

        // Index to quickly do a reverse lookup from answer to field
        this.answerToFieldIndex = [];
        this.fields.forEach(
            field => {
                field.suggested_answers().forEach(
                    answer => {
                        this.answerToFieldIndex[answer.id()] = field.id();
                    }
                );
            }
        );
    }

    view() {
        return m('.Mason-Fields', [
            this.fields.map(
                field => {
                    const inputAttrs = {
                        field,
                        answers: this.props.answers,
                        onchange: fieldAnswers => {
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

                    return m('.Mason-Field.Form-group', [
                        m('label', [
                            (field.icon() ? [icon(field.icon()), ' '] : null),
                            field.name(),
                            (field.required() ? ' *' : null),
                        ]),
                        input,
                        (field.description() ? m('.helpText', field.description()) : null),
                    ]);
                }
            ),
        ]);
    }

    updateSelection(field, fieldAnswers) {
        // Keep only answers to other fields
        let answers = this.props.answers.filter(
            answer => {
                const reverseFieldLookup = this.answerToFieldIndex[answer.id()];

                // If the answer is not in the reverse lookup table it's probably a non-suggested (user) answer
                // In that case the field should be linked in the relationship
                if (typeof reverseFieldLookup === 'undefined') {
                    return answer.field().id() !== field.id();
                }

                return reverseFieldLookup !== field.id();
            }
        );

        answers = answers.concat(fieldAnswers);

        this.props.onchange(answers);
    }
}
