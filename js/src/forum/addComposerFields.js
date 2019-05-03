import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import FieldsEditor from './components/FieldsEditor';

export default function () {
    DiscussionComposer.prototype.flagrowMasonAnswers = [];

    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        if (!app.forum.canFillFlagrowMasonFields()) {
            return;
        }

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
        if (!app.forum.canFillFlagrowMasonFields()) {
            return;
        }

        data.relationships = data.relationships || {};
        data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers;
    });
}
