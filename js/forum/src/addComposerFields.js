import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import DiscussionFields from 'flagrow/mason/components/DiscussionFields';

export default function () {
    DiscussionComposer.prototype.flagrowMasonAnswers = [];

    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-mason-fields', DiscussionFields.component({
            answers: this.flagrowMasonAnswers,
            onchange: answers => {
                this.flagrowMasonAnswers = answers;
            },
        }));
    });

    extend(DiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers;
    });
}
