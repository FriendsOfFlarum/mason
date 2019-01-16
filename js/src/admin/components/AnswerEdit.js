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
                onchange: value => {
                    this.updateAttribute('is_suggested', value);

                    // Save right away, because updating the model with immediately trigger a redraw of the UI
                    // And the unsaved state won't be preserved because the AnswerEdit component changes its place
                    this.saveAnswer();
                },
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

        this.answer.save(this.answer.data.attributes).then(() => {
            this.processing = false;
            this.dirty = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }

    deleteAnswer() {
        if (!confirm(app.translator.trans('flagrow-mason.admin.messages.delete-answer-confirmation', {
                content: this.answer.content(),
            }))) {
            return;
        }

        this.processing = true;

        this.answer.delete().then(() => {
            this.processing = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }
}
