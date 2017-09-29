import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import DiscussionFieldsModal from 'flagrow/mason/components/DiscussionFieldsModal';

export default class PostFields extends Component {
    init() {
        this.fields = app.store.all('flagrow-mason-field');
        this.discussion = this.props.discussion;
    }

    view() {
        return m('.Mason-Fields', [
            (this.discussion.canUpdateFlagrowMasonAnswers() ? Button.component({
                className: 'Button Mason-Fields--edit',
                children: app.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
                icon: 'pencil',
                onclick: () => app.modal.show(new DiscussionFieldsModal({
                    discussion: this.discussion,
                })),
            }) : null),
            m('h5.Mason-Field--title', app.translator.trans('flagrow-mason.forum.post-answers.title')),
            this.fields.map(
                field => {
                    // Discussion answers to this field
                    const answers = this.discussion.flagrowMasonAnswers().filter(answer => {
                        // It's necessary to compare the field() relationship
                        // Because field.suggested_answers() won't contain new and user answers
                        return answer.field().id() === field.id();
                    });

                    let answer_list = answers.map(answer => m('span.Mason-Inline-Answer', answer.content()));

                    if (answers.length === 0) {
                        if (field.show_when_empty()) {
                            answer_list.push(m('em.Mason-Inline-Answer', app.translator.trans('flagrow-mason.forum.post-answers.no-answer')));
                        } else {
                            // If the field has no answer and the setting is off we don't show it
                            return null;
                        }
                    }

                    return m('.Mason-Field.Form-group', [
                        m('label', [
                            (field.icon() ? [icon(field.icon()), ' '] : null),
                            field.name(),
                        ]),
                        m('.FormControl.Mason-Inline-Answers', answer_list),
                    ]);
                }
            ),
        ]);
    }
}
