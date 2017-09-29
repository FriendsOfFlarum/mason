import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import sortByAttribute from 'flagrow/mason/helpers/sortByAttribute';

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
                    let selectedAnswerIdsForThisField = [];

                    field.suggested_answers().forEach(answer => {
                        if (this.props.answers.findIndex(a => a.id() === answer.id()) !== -1) {
                            selectedAnswerIdsForThisField.push(answer.id());
                        }
                    });

                    return m('.Mason-Field.Form-group', [
                        m('label', [
                            (field.icon() ? [icon(field.icon()), ' '] : null),
                            field.name(),
                            (field.required() ? ' *' : null),
                        ]),
                        m('span.Select', [
                            m('select.Select-input.FormControl', {
                                multiple: field.multiple(),
                                onchange: event => {
                                    let ids = [];

                                    for (let option of event.target.options) {
                                        if (option.selected && option.value !== 'none') {
                                            ids.push(option.value);
                                        }
                                    }

                                    console.log(ids);

                                    this.updateSelection(field, ids);
                                },
                            }, [
                                (field.multiple() ? null : m('option', {
                                    value: 'none',
                                    selected: selectedAnswerIdsForThisField.length === 0,
                                    disabled: field.required(),
                                    hidden: field.required(),
                                }, app.translator.trans('flagrow-mason.forum.answers.' + (field.required() ? 'choose-option' : 'no-option-selected')))),
                                sortByAttribute(field.suggested_answers()).map(
                                    answer => m('option', {
                                        value: answer.id(),
                                        selected: selectedAnswerIdsForThisField.indexOf(answer.id()) !== -1,
                                    }, answer.content())
                                ),
                            ]),
                            icon('sort', {className: 'Select-caret'}),
                        ]),
                        (field.description() ? m('.helpText', field.description()) : null),
                    ]);
                }
            ),
        ]);
    }

    updateSelection(field, answerIds) {
        // Keep only answers to other fields
        let answers = this.props.answers.filter(
            answer => this.answerToFieldIndex[answer.id()] !== field.id()
        );

        answerIds.forEach(id => {
            answers.push(app.store.getById('flagrow-mason-answer', id));
        });

        this.props.onchange(answers);
    }
}
