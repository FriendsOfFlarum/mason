import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import sortByAttribute from 'flagrow/mason/helpers/sortByAttribute';

export default class FieldEditDropdown extends Component {
    init() {
        this.field = this.props.field;
        this.answers = this.props.answers;
        this.onchange = this.props.onchange;
    }

    view() {
        let selectedAnswerIdsForThisField = [];

        this.field.suggested_answers().forEach(answer => {
            const answerIndex = this.answers.findIndex(a => {
                // Temporary store entries seem to turn into undefined after saving
                if (typeof a === 'undefined') {
                    return false;
                }

                return a.id() === answer.id();
            });

            if (answerIndex !== -1) {
                selectedAnswerIdsForThisField.push(answer.id());
            }
        });

        return m('span.Select', [
            m('select.Select-input.FormControl', {
                multiple: this.field.multiple(),
                onchange: event => {
                    let answers = [];

                    for (let option of event.target.options) {
                        if (option.selected && option.value !== 'none') {
                            const answerId = option.value;

                            // This will only work with suggested answers for now
                            // As they are the only ones registered in the store
                            answers.push(app.store.getById('flagrow-mason-answer', answerId));
                        }
                    }

                    this.onchange(answers);
                },
            }, [
                (this.field.multiple() ? null : m('option', {
                    value: 'none',
                    selected: selectedAnswerIdsForThisField.length === 0,
                    disabled: this.field.required(),
                    hidden: this.field.required(),
                }, app.translator.trans('flagrow-mason.forum.answers.' + (this.field.required() ? 'choose-option' : 'no-option-selected')))),
                sortByAttribute(this.field.suggested_answers()).map(
                    answer => m('option', {
                        value: answer.id(),
                        selected: selectedAnswerIdsForThisField.indexOf(answer.id()) !== -1,
                    }, answer.content())
                ),
            ]),
            icon('sort', {className: 'Select-caret'}),
        ]);
    }
}
