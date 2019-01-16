import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import FieldsEditor from './FieldsEditor';

export default class FieldsEditorModal extends Modal {
    init() {
        super.init();

        this.answers = this.props.discussion.flagrowMasonAnswers();
        this.dirty = false;
        this.processing = false;

        // Stays null if the feature is not used
        this.tags = null;
    }

    title() {
        return app.translator.trans('flagrow-mason.forum.answers-modal.edit-title', {
            title: m('em', this.props.discussion.title()),
        });
    }

    content() {
        return [
            m('.Modal-body', FieldsEditor.component({
                discussion: this.props.discussion, // Only for the tags feature
                answers: this.answers,
                onchange: this.answersChanged.bind(this),
                ontagchange: tags => {
                    this.tags = tags;
                    this.dirty = true;
                },
            })),
            m('.Modal-footer', [
                Button.component({
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-mason.forum.answers-modal.save'),
                    loading: this.processing,
                    disabled: !this.dirty,
                    onclick: this.saveAnswers.bind(this),
                }),
            ]),
        ];
    }

    answersChanged(answers) {
        this.answers = answers;
        this.dirty = true;
    }

    saveAnswers() {
        this.processing = true;

        let relationships = {
            flagrowMasonAnswers: this.answers,
        };

        // If tag edit is enabled, take care of them here as well
        if (this.tags !== null) {
            relationships.tags = this.tags;
        }

        this.props.discussion.save({
            relationships,
        }).then(() => {
            this.processing = false;
            app.modal.close();
            m.redraw();
        }).catch(err => {
            this.processing = false;
            throw err;
        });
    }
}
