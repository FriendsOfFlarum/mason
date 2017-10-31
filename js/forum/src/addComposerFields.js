import app from 'flarum/app';
import {extend} from 'flarum/extend';
import Composer from 'flarum/components/Composer';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import ComposerFields from 'flagrow/mason/components/ComposerFields';

function expectedFieldLinesCount() {
    let fieldsCount = app.store.all('flagrow-mason-field').length;

    if (app.forum.attribute('flagrow.mason.tags-as-fields')) {
        fieldsCount++;
    }

    return Math.ceil(fieldsCount / app.forum.attribute('flagrow.mason.column-count'));
}

// The width at which the CSS triggers the change of layout
const WINDOW_MOBILE_MAX_WIDTH = 767;

// The height to keep for the default Composer content + the fields section paddings
const COMPOSER_REQUIRED_HEIGHT = 300;

// The expected height of a line of custom fields
// This breaks when lines are broken by the CSS media queries !
const FIELDS_LINE_HEIGHT = 80;

export default function () {
    // A Mithril prop is required because otherwise the variable reference isn't properly synced between all sub-components
    DiscussionComposer.prototype.flagrowMasonAnswers = m.prop([]);

    let composerFieldsViewMode = m.prop(ComposerFields.ViewModeEnum.MODAL);

    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        items.add('flagrow-mason-fields', ComposerFields.component({
            viewMode: composerFieldsViewMode,
            answers: this.flagrowMasonAnswers,
            onchange: answers => {
                this.flagrowMasonAnswers(answers);
            },
            ontagchange: tags => {
                this.tags = tags;
            },
        }));
    });

    extend(Composer.prototype, 'updateHeight', function () {
        const height = this.computedHeight();

        let newViewMode = ComposerFields.ViewModeEnum.MODAL;

        const heightWithFields = COMPOSER_REQUIRED_HEIGHT + expectedFieldLinesCount() * FIELDS_LINE_HEIGHT;

        if ($(window).width() > WINDOW_MOBILE_MAX_WIDTH && height > heightWithFields) {
            newViewMode = ComposerFields.ViewModeEnum.FORM;
        }

        if (newViewMode !== composerFieldsViewMode()) {
            composerFieldsViewMode(newViewMode);

            m.redraw();
        }
    });

    extend(DiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers();
    });
}
