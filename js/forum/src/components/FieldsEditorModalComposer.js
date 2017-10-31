import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import FieldsEditor from 'flagrow/mason/components/FieldsEditor';

export default class FieldsEditorModalComposer extends Modal {
    title() {
        return app.translator.trans('flagrow-mason.forum.answers-modal.create-title');
    }

    content() {
        return [
            m('.Modal-body', FieldsEditor.component({
                answers: this.props.answers,
                onchange: this.props.onchange,
                ontagchange: this.props.ontagchange,
            })),
            m('.Modal-footer', [
                Button.component({
                    className: 'Button Button--primary',
                    type: 'submit',
                    children: app.translator.trans('flagrow-mason.forum.answers-modal.save'),
                }),
            ]),
        ];
    }

    onsubmit(e) {
        e.preventDefault();

        app.modal.close();
    }
}
