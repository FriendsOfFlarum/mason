import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Icon from 'flarum/common/components/Icon';
import type Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import sortTags from 'ext:flarum/tags/common/utils/sortTags';

export interface IFieldEditTagsAttrs extends ComponentAttrs {
  discussion?: Discussion;
  selected: Tag[];
  onchange: (tags: Tag[]) => void;
  inputId: string;
}

/**
 * The "tags as a field" option: a single tag (plus its parent) picked from a dropdown.
 */
export default class FieldEditTags extends Component<IFieldEditTagsAttrs> {
  view() {
    const { selected, onchange, inputId } = this.attrs;
    const tags = this.selectableTags();

    if (this.maxPrimary() > 1 || this.maxSecondary() > 1) {
      return <div className="Alert">{app.translator.trans('fof-mason.forum.tags.inadequate-settings')}</div>;
    }

    // A child tag implies its parent, so the child identifies the selection.
    const current = selected.find((tag) => tag.parent()) || selected[0];

    return (
      <span className="Select">
        <select
          id={inputId}
          className="Select-input FormControl"
          onchange={(event: Event) => {
            const tag = tags.find((candidate) => candidate.id() === (event.target as HTMLSelectElement).value);
            const parent = tag?.parent();

            onchange(tag ? [tag, ...(parent ? [parent] : [])] : []);
          }}
        >
          <option value="" selected={!current} disabled={this.required()} hidden={this.required()}>
            {app.translator.trans(this.required() ? 'fof-mason.forum.answers.choose-option' : 'fof-mason.forum.answers.no-option-selected')}
          </option>
          {tags.map((tag) => {
            const parent = tag.parent();

            return (
              <option value={tag.id()} selected={tag === current}>
                {(parent ? parent.name() + ' | ' : '') + tag.name()}
              </option>
            );
          })}
        </select>
        <Icon name="fas fa-caret-down" className="Select-caret" />
      </span>
    );
  }

  static label(): string {
    return (app.forum.attribute<string>('fof-mason.tags-field-name') || app.translator.trans('fof-mason.forum.tags.tags-label', {}, true)) as string;
  }

  required(): boolean {
    return app.forum.attribute<number>('minPrimaryTags') > 0 || app.forum.attribute<number>('minSecondaryTags') > 0;
  }

  maxPrimary(): number {
    return app.forum.attribute<number>('maxPrimaryTags');
  }

  maxSecondary(): number {
    return app.forum.attribute<number>('maxSecondaryTags');
  }

  selectableTags(): Tag[] {
    const { discussion } = this.attrs;
    const current = discussion ? discussion.tags() || [] : [];

    let tags = app.store
      .all<Tag>('tags')
      .filter((tag) => (discussion ? tag.canAddToDiscussion() || current.includes(tag) : tag.canStartDiscussion()));

    if (this.maxPrimary() <= 0) tags = tags.filter((tag) => !tag.isPrimary());
    if (this.maxSecondary() <= 0) tags = tags.filter((tag) => tag.isPrimary());

    return sortTags(tags);
  }
}
