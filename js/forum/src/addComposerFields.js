import {extend} from 'flarum/extend';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import FieldsEditor from 'flagrow/mason/components/FieldsEditor';

export default function () {
    DiscussionComposer.prototype.flagrowMasonAnswers = [];

    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-mason-fields', FieldsEditor.component({
            answers: this.flagrowMasonAnswers,
            onchange: answers => {
                this.flagrowMasonAnswers = answers;
            },
            ontagchange: tags => {
                this.tags = tags;
            },
        }));
    });

    extend(DiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers;
    });
}
