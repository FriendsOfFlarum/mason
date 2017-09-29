import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';

export default class DiscussionFields extends Component {
    init() {
        this.fields = app.store.all('flagrow-mason-field');

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
        return m('ul', [
            this.fields.map(
                field => m('li', m('.FormGroup', [
                    m('label', [
                        (field.icon() ? [icon(field.icon()), ' '] : null),
                        field.name(),
                        (field.min_answers_count() > 0 ? ' *' : null),
                    ]),
                    m('select', {
                        multiple: field.min_answers_count() > 1,
                        onchange: m.withAttr('value', value => {
                            this.updateSelection(field, value);
                        }),
                    }, [
                        m('option', {
                            selected: true,
                            disabled: true,
                            hidden: true,
                        }, 'Choose'),
                        field.suggested_answers().map(
                            answer => m('option', {
                                value: answer.id(),
                            }, answer.content())
                        ),
                    ]),
                    (field.description() ? m('span.helpText', field.description()) : null),
                ]))
            ),
        ]);
    }

    updateSelection(field, value) {
        // Keep only answers to other fields
        let answers = this.props.answers.filter(
            answer => this.answerToFieldIndex[answer.id()] !== field.id()
        );

        console.log('filter', this.props.answers, answers);

        const answerIds = Array.isArray(value) ? value : [value];

        answerIds.forEach(id => {
            answers.push(app.store.getById('flagrow-mason-answer', id));
        });

        console.log('ids', answerIds, answers);

        this.props.onchange(answers);
    }
}
