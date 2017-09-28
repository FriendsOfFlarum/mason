import app from 'flarum/app';
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
        return m('form', [
            m('span.fa.fa-arrows.Answer--Handle'),
            m('span', {
                onclick: () => {
                    const newContent = prompt('Edit content', this.answer.content());

                    if (newContent) {
                        this.updateAttribute('content', newContent);
                    }
                },
            }, ' ' + this.answer.content() + ' '),
            Switch.component({
                state: this.answer.is_suggested(),
                onchange: this.updateAttribute.bind(this, 'is_suggested'),
                children: app.translator.trans('flagrow-mason.admin.fields.is_suggested'),
            }),
            Button.component({
                type: 'submit',
                className: 'Button Button--primary',
                children: app.translator.trans('flagrow-mason.admin.buttons.edit-answer'),
                loading: this.processing,
                disabled: !this.readyToSave(),
                onclick: this.saveField.bind(this),
            }),
            Button.component({
                type: 'submit',
                className: 'Button Button--danger',
                children: app.translator.trans('flagrow-mason.admin.buttons.delete-answer'),
                loading: this.processing,
                onclick: this.deleteField.bind(this),
            }),
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

    saveField() {
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

    deleteField() {
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
