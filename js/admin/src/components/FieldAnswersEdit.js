import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import AnswerEdit from 'flagrow/mason/components/AnswerEdit';
import sortByAttribute from 'flagrow/mason/helpers/sortByAttribute';

export default class FieldAnswersEdit extends Component {
    init() {
        this.field = this.props.field;
        this.processing = false;
        this.new_content = '';
    }

    config() {
        this.$('.js-answers-container')
            .sortable({
                handle: '.js-answer-handle',
            })
            .on('sortupdate', () => {
                const sorting = this.$('.js-answer-data')
                    .map(function () {
                        return $(this).data('id');
                    })
                    .get();

                this.updateSort(sorting);
            });
    }

    view() {
        if (!this.field.exists) {
            return m('div', app.translator.trans('flagrow-mason.admin.fields.save-field-for-answers'));
        }

        let answersList = [];

        sortByAttribute(this.field.all_answers())
            .forEach(answer => {
                // When answers are deleted via store.delete() they stay as an "undefined" relationship
                // We ignore these deleted answers
                if (typeof answer === 'undefined') {
                    return;
                }

                // Build array of fields to show.
                answersList.push(m('.js-answer-data', {
                    key: answer.id(),
                    'data-id': answer.id(),
                }, AnswerEdit.component({
                    answer,
                })));
            });

        return m('div', [
            m('.Mason-Container.js-answers-container', answersList),
            m('form', [
                m('.Form-group', [
                    m('label', 'New answer'),
                    m('input.FormControl', {
                        value: this.new_content,
                        oninput: m.withAttr('value', value => {
                            this.new_content = value;
                        }),
                        placeholder: 'Some text',
                    }),
                ]),
                m('.Form-group', [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--primary',
                        children: app.translator.trans('flagrow-mason.admin.buttons.add-answer'),
                        loading: this.processing,
                        disabled: !this.new_content,
                        onclick: this.saveField.bind(this),
                    }),
                ]),
            ]),
        ]);
    }

    saveField() {
        this.processing = true;

        app.request({
            method: 'POST',
            url: this.field.apiEndpoint() + '/answers',
            data: {
                attributes: {
                    content: this.new_content,
                    is_suggested: true,
                },
            },
        }).then(result => {
            app.store.pushPayload(result);

            this.new_content = '';
            this.processing = false;
            m.redraw();
        });
    }

    updateSort(sorting) {
        app.request({
            method: 'POST',
            url: this.field.apiEndpoint() + '/answers/order',
            data: {
                sort: sorting,
            },
        }).then(result => {
            // Update sort attributes
            app.store.pushPayload(result);
            m.redraw();
        });
    }
}
