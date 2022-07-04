import sortable from 'html5sortable/dist/html5sortable.es.js';

import app from 'flarum/admin/app';
import icon from 'flarum/common/helpers/icon';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import { debounce } from 'flarum/common/utils/throttleDebounce';

import AnswerEdit from './AnswerEdit';
import sortByAttribute from '@common/helpers/sortByAttribute';

export default class FieldAnswersEdit extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.field = this.attrs.field;
        this.processing = false;
        this.new_content = '';
        this.showUserAnswers = false;
    }

    configSortable() {
        const container = this.element.querySelector('.js-answers-container');

        // If the field doesn't exist, it doesn't have a field edit area
        if (!container) {
            return;
        }

        const el = sortable(container, {
            handle: '.js-answer-handle',
        })[0];

        // Prevents issue with more and more event listeners
        // being added, resulting in 100s of XHR requests.
        el.removeEventListener('sortupdate', this.sortingChanged);
        el.addEventListener('sortupdate', this.sortingChanged);
    }

    oncreate(vnode) {
        super.oncreate(vnode);

        this.configSortable();
    }

    onupdate() {
        this.configSortable();
    }

    view() {
        if (!this.field.exists) {
            return <div>{app.translator.trans('fof-mason.admin.fields.save-field-for-answers')}</div>;
        }

        let suggestedAnswers = [];
        let userAnswers = [];

        (this.field.allAnswers() || []).forEach((answer) => {
            // When answers are deleted via store.delete() they stay as an "undefined" relationship
            // We ignore these deleted answers
            if (typeof answer === 'undefined') {
                return;
            }

            if (answer.is_suggested()) {
                suggestedAnswers.push(answer);
            } else {
                userAnswers.push(answer);
            }
        });

        return [
            <div>
                <div className="Mason-Container js-answers-container">
                    {sortByAttribute(suggestedAnswers).map((answer) => (
                        <div className="js-answer-data" key={answer.id()} data-id={answer.id()}>
                            <AnswerEdit answer={answer} />
                        </div>
                    ))}
                </div>
                {userAnswers.length && (
                    <>
                        <button
                            className="Button Button--block Mason-Box-Header"
                            onclick={() => {
                                this.showUserAnswers = !this.showUserAnswers;
                            }}
                        >
                            <div className="Mason-Box-Header-Title">
                                {app.translator.trans('fof-mason.admin.buttons.show-user-answers', {
                                    count: userAnswers.length,
                                })}
                            </div>
                            <div>{icon('fas fa-chevron-' + (this.showUserAnswers ? 'up' : 'down'))}</div>
                        </button>
                        {this.showUserAnswers && (
                            <div className="Mason-Container">
                                {sortByAttribute(userAnswers, 'content').map((answer) => (
                                    <div key={answer.id()}>
                                        <AnswerEdit answer={answer} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>,
            <div className="Form-group">
                <label>
                    {app.translator.trans('fof-mason.admin.fields.new-answer')}
                    <input
                        className="FormControl"
                        value={this.new_content}
                        oninput={(e) => {
                            this.new_content = e.target.value;
                        }}
                        placeholder={app.translator.trans('fof-mason.admin.fields.new-answer-placeholder')}
                    />
                </label>
            </div>,
            <div className="Form-group">
                <Button className="Button Button--primary" loading={this.processing} disabled={!this.new_content} onclick={this.saveField.bind(this)}>
                    {app.translator.trans('fof-mason.admin.buttons.add-answer')}
                </Button>
            </div>,
        ];
    }

    saveField() {
        this.processing = true;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers',
            body: {
                data: {
                    attributes: {
                        content: this.new_content,
                        is_suggested: true,
                    },
                },
            },
        }).then((result) => {
            app.store.pushPayload(result);

            this.new_content = '';
            this.processing = false;
            m.redraw();
        });
    }

    sortingChanged = debounce(500, () => {
        const sorting = this.$('.js-answer-data')
            .map(function () {
                return $(this).data('id');
            })
            .get();

        this.updateSort(sorting);
    });

    updateSort(sorting) {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers/order',
            body: {
                sort: sorting,
            },
        }).then((result) => {
            // Update sort attributes
            app.store.pushPayload(result);
            m.redraw();
        });
    }
}
