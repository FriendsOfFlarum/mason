import app from 'flarum/forum/app';
import Model from 'flarum/common/Model';
import Component from 'flarum/common/Component';

/* global m */

export default class FieldEditText extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.field = this.attrs.field;
        this.answers = this.attrs.answers;
        this.onchange = this.attrs.onchange;

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
            oninput: event => {
                this.content = event.target.value;

                if (this.content === '') {
                    this.onchange([]);
                } else {
                    const answer = app.store.createRecord('mason-answers', {
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
            },
            placeholder: this.fieldPlaceholder(),
        });
    }

    fieldPlaceholder() {
        if (app.forum.attribute('fof-mason.labels-as-placeholders')) {
            return this.field.name() + (this.field.required() ? ' *' : '');
        }

        return '';
    }
}
