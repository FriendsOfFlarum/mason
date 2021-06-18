import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/common/components/DiscussionComposer';
import FieldsEditor from './components/FieldsEditor';

export default function () {
    DiscussionComposer.prototype.masonAnswers = [];

    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        if (!app.forum.canFillMasonFields()) {
            return;
        }

        items.add(
            'mason-fields',
            <FieldsEditor
                answers={this.masonAnswers}
                onchange={(answers) => {
                    this.masonAnswers = answers;
                }}
                ontagchange={(tags) => {
                    this.composer.fields.tags = tags;
                }}
            />
        );
    });

    extend(DiscussionComposer.prototype, 'data', function (data) {
        if (!app.forum.canFillMasonFields()) {
            return;
        }

        data.relationships = data.relationships || {};
        data.relationships.masonAnswers = this.masonAnswers;
    });
}
