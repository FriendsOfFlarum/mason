import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import DiscussionFields from 'flagrow/mason/components/DiscussionFields';

export default class DiscussionFieldsModal extends Modal {
    init() {
        super.init();

        this.answers = this.props.discussion.flagrowMasonAnswers();
        this.dirty = false;
        this.processing = false;
    }

    title() {
        return app.translator.trans('flagrow-mason.forum.answers-modal.edit-title', {
            title: m('em', this.props.discussion.title()),
        });
    }

    content() {
        return [
            m('.Modal-body', DiscussionFields.component({
                answers: this.answers,
                onchange: this.answersChanged.bind(this),
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

        this.props.discussion.save({
            relationships: {
                flagrowMasonAnswers: this.answers,
            },
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
