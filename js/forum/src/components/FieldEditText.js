import app from 'flarum/app';
import Model from 'flarum/Model';
import Component from 'flarum/Component';

export default class FieldEditText extends Component {
    init() {
        this.field = this.props.field;
        this.answers = this.props.answers;
        this.onchange = this.props.onchange;

        this.content = '';

        const answersForThisField = this.answers.filter(answer => {
            // Temporary store entries seem to turn into undefined after saving
            if (typeof answer === 'undefined') {
                return false;
            }

            return answer.field().id() === this.field.id();
        });

        if (answersForThisField.length) {
            // For now we only support a single custom answer
            this.content = answersForThisField[0].content();
        }
    }

    view() {
        return m('input.FormControl', {
            required: this.field.required(),
            value: this.content,
            oninput: m.withAttr('value', value => {
                this.content = value;

                if (this.content === '') {
                    this.onchange([]);
                } else {
                    const answer = app.store.createRecord('flagrow-mason-answer', {
                        attributes: {
                            content: this.content,
                        },
                        relationships: {
                            field: {
                                data: Model.getIdentifier(this.field),
                            },
                        },
                    });

                    this.onchange([answer]);
                }
            }),
            placeholder: this.fieldPlaceholder(),
        });
    }

    fieldPlaceholder() {
        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
            return this.field.name() + (this.field.required() ? ' *' : '');
        }

        return '';
    }
}
