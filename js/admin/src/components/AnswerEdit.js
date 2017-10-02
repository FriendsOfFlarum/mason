import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';

export default class FieldEdit extends Component {
    init() {
        this.answer = this.props.answer;
        this.dirty = false;
        this.processing = false;
    }

    view() {
        return m('form.Mason-Box', [
            // Only suggested answers can be reordered
            (this.answer.is_suggested() ? [
                m('span.fa.fa-arrows.Mason-Box--handle.js-answer-handle'),
                ' ',
            ] : null),
            m('span', {
                onclick: () => {
                    const newContent = prompt('Edit content', this.answer.content());

                    if (newContent) {
                        this.updateAttribute('content', newContent);
                    }
                },
            }, [
                this.answer.content(),
                ' ',
                icon('pencil'),
            ]),
            Switch.component({
                state: this.answer.is_suggested(),
                onchange: this.updateAttribute.bind(this, 'is_suggested'),
                children: app.translator.trans('flagrow-mason.admin.fields.is_suggested'),
            }),
            m('.ButtonGroup', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-mason.admin.buttons.save-answer'),
                    loading: this.processing,
                    disabled: !this.readyToSave(),
                    onclick: this.saveAnswer.bind(this),
                }),
                Button.component({
                    type: 'submit',
                    className: 'Button Button--danger',
                    children: app.translator.trans('flagrow-mason.admin.buttons.delete-answer'),
                    loading: this.processing,
                    onclick: this.deleteAnswer.bind(this),
                }),
            ]),
        ]);
    }

    updateAttribute(attribute, value) {
        this.answer.pushAttributes({
            [attribute]: value,
        });

        this.dirty = true;
    }

    readyToSave() {
        return this.dirty;
    }

    saveAnswer() {
        this.processing = true;

        app.request({
            method: 'PATCH',
            url: this.answer.apiEndpoint(),
            data: this.answer.data,
        }).then(result => {
            app.store.pushPayload(result);

            this.processing = false;
            this.dirty = false;
            m.redraw();
        });
    }

    deleteAnswer() {
        if (!confirm(app.translator.trans('flagrow-mason.admin.messages.delete-answer-confirmation', {
                content: this.answer.content(),
            }))) {
            return;
        }

        this.processing = true;

        app.request({
            method: 'DELETE',
            url: this.answer.apiEndpoint(),
        }).then(() => {
            app.store.remove(this.answer);

            this.processing = false;
            m.redraw();
        });
    }
}
