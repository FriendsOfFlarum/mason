import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import ItemList from 'flarum/utils/ItemList';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import DiscussionFieldsModal from 'flagrow/mason/components/DiscussionFieldsModal';
import FieldGrid from 'flagrow/mason/components/FieldGrid';
import sortByAttribute from 'flagrow/mason/helpers/sortByAttribute';

export default class PostFields extends Component {
    init() {
        this.fields = sortByAttribute(app.store.all('flagrow-mason-field'));
        this.discussion = this.props.discussion;
    }

    view() {
        return m('.Mason-Fields.Mason-Fields--viewer', [
            this.headItems().toArray(),
            FieldGrid.component({
                items: this.fields.map(
                    field => {
                        // Discussion answers to this field
                        const answers = sortByAttribute(this.discussion.flagrowMasonAnswers().filter(answer => {
                            // It's necessary to compare the field() relationship
                            // Because field.suggested_answers() won't contain new and user answers
                            return answer.field().id() === field.id();
                        }));

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
            }),
        ]);
    }

    headItems() {
        const items = new ItemList();

        if (this.discussion.canUpdateFlagrowMasonAnswers()) {
            items.add('edit', Button.component({
                className: 'Button Mason-Fields--edit',
                children: app.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
                icon: 'pencil',
                onclick: () => app.modal.show(new DiscussionFieldsModal({
                    discussion: this.discussion,
                })),
            }));
        }

        if (app.forum.attribute('flagrow.mason.fields-section-title')) {
            items.add('title', m('h5.Mason-Field--title', app.forum.attribute('flagrow.mason.fields-section-title')));
        }

        return items;
    }
}
