import sortable from 'html5sortable/dist/html5sortable.es.js';

import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import AnswerEdit from './AnswerEdit';
import sortByAttribute from './../../lib/helpers/sortByAttribute';

/* global m, $ */

export default class FieldAnswersEdit extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.field = this.attrs.field;
        this.processing = false;
        this.new_content = '';
        this.showUserAnswers = false;
    }

    configSortable() {
        const container = this.element.querySelector('.js-answers-container');

        // If the field doesn't exist, it doesn't have a field edit area
        if (!container) {
            return;
        }

        sortable(container, {
            handle: '.js-answer-handle',
        })[0].addEventListener('sortupdate', () => {
            const sorting = this.$('.js-answer-data')
                .map(function () {
                    return $(this).data('id');
                })
                .get();

            this.updateSort(sorting);
        });
    }

    oncreate(vnode) {
        super.oncreate(vnode);

        this.configSortable();
    }

    onupdate() {
        this.configSortable();
    }

    view() {
        if (!this.field.exists) {
            return m('div', app.translator.trans('fof-mason.admin.fields.save-field-for-answers'));
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
                    m('.Mason-Box-Header-Title', app.translator.trans('fof-mason.admin.buttons.show-user-answers', {
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
            m('.Form-group', [
                m('label', app.translator.trans('fof-mason.admin.fields.new-answer')),
                m('input.FormControl', {
                    value: this.new_content,
                    oninput: event => {
                        this.new_content = event.target.value;
                    },
                    placeholder: app.translator.trans('fof-mason.admin.fields.new-answer-placeholder'),
                }),
            ]),
            m('.Form-group', [
                Button.component({
                    className: 'Button Button--primary',
                    loading: this.processing,
                    disabled: !this.new_content,
                    onclick: this.saveField.bind(this),
                }, app.translator.trans('fof-mason.admin.buttons.add-answer')),
            ]),
        ]);
    }

    saveField() {
        this.processing = true;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers',
            body: {
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
            body: {
                sort: sorting,
            },
        }).then(result => {
            // Update sort attributes
            app.store.pushPayload(result);
            m.redraw();
        });
    }
}
