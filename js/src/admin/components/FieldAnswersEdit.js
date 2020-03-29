import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import AnswerEdit from './AnswerEdit';
import sortable from 'html5sortable/dist/html5sortable.es.js';
import sortByAttribute from './../../lib/helpers/sortByAttribute';

export default class FieldAnswersEdit extends Component {
    init() {
        this.field = this.props.field;
        this.processing = false;
        this.new_content = '';
        this.showUserAnswers = false;
    }

    config() {
        sortable('.js-answers-container', {
            handle: '.js-answers-handle',
            items: '.js-answers-data',
        }).forEach(function (el) {
            $(el).off('sortupdate').on('sortupdate', e => {
                const sorting = e.detail.destination.items
                    .map(item => {
                        return $(item).data('id');
                    });

                self.updateSort(sorting);
            });
        });
    }

    view() {
        if (!this.field.exists) {
            return m('div', app.translator.trans('flagrow-mason.admin.fields.save-field-for-answers'));
        }

        let suggestedAnswers = [];
        let userAnswers = [];

        this.field.all_answers()
            .forEach(answer => {
                // When answers are deleted via store.delete() they stay as an "undefined" relationship
                // We ignore these deleted answers
                if (typeof answer === 'undefined') {
                    return;
                }

                if (answer.is_suggested()) {
                    suggestedAnswers.push(answer);
                } else {
                    userAnswers.push(answer);
                }
            });

        return m('div', [
            m('.Mason-Container.js-answers-container', sortByAttribute(suggestedAnswers).map(
                answer => m('.js-answer-data', {
                    key: answer.id(),
                    'data-id': answer.id(),
                }, AnswerEdit.component({
                    answer,
                }))
            )),
            (userAnswers.length ? [
                m('.Button.Button--block.Mason-Box-Header', {
                    onclick: () => {
                        this.showUserAnswers = !this.showUserAnswers;
                    },
                }, [
                    m('.Mason-Box-Header-Title', app.translator.trans('flagrow-mason.admin.buttons.show-user-answers', {
                        count: userAnswers.length,
                    })),
                    m('div', [
                        icon('fas fa-chevron-' + (this.showUserAnswers ? 'up' : 'down')),
                    ]),
                ]),
                // The list of user answers can't be re-ordered
                (this.showUserAnswers ? m('.Mason-Container', sortByAttribute(userAnswers, 'content').map(
                    answer => m('div', {
                        key: answer.id(),
                    }, AnswerEdit.component({
                        answer,
                    }))
                )) : null),
            ] : null),
            m('form', [
                m('.Form-group', [
                    m('label', 'New answer'),
                    m('input.FormControl', {
                        value: this.new_content,
                        oninput: m.withAttr('value', value => {
                            this.new_content = value;
                        }),
                        placeholder: app.translator.trans('flagrow-mason.admin.fields.new-answer-placeholder'),
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
            url: app.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers',
            data: {
                data: {
                    attributes: {
                        content: this.new_content,
                        is_suggested: true,
                    },
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
            url: app.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers/order',
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
