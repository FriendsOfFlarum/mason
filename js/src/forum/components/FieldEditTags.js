import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import sortTags from 'flarum/tags/utils/sortTags';

export default class DiscussionFields extends Component {
    init() {
        this.tags = app.store.all('tags');
        this.selectedTags = [];

        if (this.props.discussion) {
            this.tags = this.tags.filter(tag => tag.canAddToDiscussion() || this.props.discussion.tags().indexOf(tag) !== -1);

            this.selectedTags = this.props.discussion.tags();
        } else {
            this.tags = this.tags.filter(tag => tag.canStartDiscussion());
        }

        this.minPrimary = app.forum.attribute('minPrimaryTags');
        this.maxPrimary = app.forum.attribute('maxPrimaryTags');
        this.minSecondary = app.forum.attribute('minSecondaryTags');
        this.maxSecondary = app.forum.attribute('maxSecondaryTags');

        // If primary tags are disabled, don't offer them
        if (this.maxPrimary <= 0) {
            this.tags = this.tags.filter(tag => !tag.isPrimary());
        }

        // If secondary tags are disabled, don't offer them
        if (this.maxSecondary <= 0) {
            this.tags = this.tags.filter(tag => tag.isPrimary());
        }

        this.tags = sortTags(this.tags);
    }

    view() {
        if (this.maxPrimary > 1 || this.maxSecondary > 1) {
            return m('.Alert', app.translator.trans('flagrow-mason.forum.tags.inadequate-settings'));
        }

        // We take the first child selected or if none, the first parent selected
        // Of course this only works if a single tag or tag+parent is selected
        // Multiple tags are not supported on this selector
        const currentSelectedChild = this.selectedTags.length ? this.selectedTags.sort(tag => tag.parent() ? -1 : 1)[0].id() : null;

        const required = this.fieldRequired();

        return m('.Mason-Field.Form-group', {
            className: app.forum.attribute('flagrow.mason.labels-as-placeholders') ? 'Mason-Field--label-as-placeholder' : '',
        }, [
            m('label', this.fieldLabel()),
            m('span.Select', [
                m('select.Select-input.FormControl', {
                    onchange: m.withAttr('value', id => {
                        this.selectedTags = [];

                        if (id !== 'none') {
                            this.selectedTags.push(this.tags.find(tag => tag.id() === id));

                            const parent = this.selectedTags[0].parent();
                            if (parent) {
                                this.selectedTags.push(parent);
                            }
                        }

                        this.props.onchange(this.selectedTags);
                    }),
                }, [
                    m('option', {
                        value: 'none',
                        selected: this.selectedTags.length === 0,
                        disabled: required,
                        hidden: this.placeholderHidden(),
                    }, this.selectPlaceholder()),
                    this.tags.map(
                        tag => {
                            const parent = tag.parent();

                            return m('option', {
                                value: tag.id(),
                                selected: tag.id() === currentSelectedChild,
                            }, (parent ? parent.name() + ' | ' : '') + tag.name());
                        }
                    ),
                ]),
                icon('fas fa-caret-down', {className: 'Select-caret'}),
            ]),
        ]);
    }

    fieldRequired() {
        return this.minPrimary > 0 || this.minSecondary > 0;
    }

    fieldLabel() {
        let text = app.forum.attribute('flagrow.mason.tags-field-name') || app.translator.trans('flagrow-mason.forum.tags.tags-label');

        if (this.fieldRequired()) {
            text += ' *';
        }

        return text;
    }

    placeholderHidden() {
        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
            return false;
        }

        return this.fieldRequired();
    }

    selectPlaceholder() {
        let text = '';

        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
            text += this.fieldLabel() + ' - ';
        }

        if (this.fieldRequired()) {
            text += app.translator.trans('flagrow-mason.forum.answers.choose-option');
        } else {
            text += app.translator.trans('flagrow-mason.forum.answers.no-option-selected');
        }

        return text;
    }
}
