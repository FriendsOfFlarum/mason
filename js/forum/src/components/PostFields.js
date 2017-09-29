import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';

export default class PostFields extends Component {
    init() {
        this.fields = app.store.all('flagrow-mason-field');
        this.discussion = this.props.discussion;
    }

    view() {
        return m('ul', [
            this.fields.map(
                field => {
                    // Discussion answers to this field
                    const answers = this.discussion.flagrowMasonAnswers().filter(answer => {
                        // It's necessary to compare the field() relationship
                        // Because field.suggested_answers() won't contain new and user answers
                        return answer.field().id() === field.id();
                    });

                    // If the field has no answer we don't show it
                    if (answers.length === 0) {
                        return null;
                    }

                    return m('li', m('.FormGroup', [
                        m('strong', [
                            (field.icon() ? [icon(field.icon()), ' '] : null),
                            field.name(),
                        ]),
                        ' ',
                        answers.map(answer => m('span', answer.content())),
                    ]));
                }
            ),
        ]);
    }
}
