import sortable from 'html5sortable/dist/html5sortable.es.js';
import { debounce } from 'throttle-debounce';

import app from 'flarum/app';
import ExtensionPage from 'flarum/components/ExtensionPage';

import FieldEdit from '../components/FieldEdit';
import MasonSettings from '../components/MasonSettings';
import sortByAttribute from '../../lib/helpers/sortByAttribute';

export default class MasonFieldsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/fof/mason/fields',
      })
      .then((result) => {
        app.store.pushPayload(result);
        m.redraw();
      });
  }

  configSortable() {
    const el = sortable(this.element.querySelector('.js-fields-container'), {
      handle: '.js-field-handle',
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

  content() {
    const fields = app.store.all('mason-fields');

    let fieldsList = [];

    sortByAttribute(fields).forEach((field) => {
      // Build array of fields to show.
      fieldsList.push(
        m(
          '.js-field-data',
          {
            key: field.id(),
            'data-id': field.id(),
          },
          FieldEdit.component({
            field,
          })
        )
      );
    });

    return (
      <div class="ExtensionPage-settings">
        <div class="container">
          <h2>{app.translator.trans('fof-mason.admin.titles.fields')}</h2>
          <div class="Mason-Container">
            <div class="js-fields-container">{fieldsList}</div>
            <FieldEdit />
          </div>
          <h2>{app.translator.trans('fof-mason.admin.titles.settings')}</h2>
          <MasonSettings />
        </div>
      </div>
    );
  }

  updateSort(sorting) {
    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/fof/mason/fields/order',
        body: {
          sort: sorting,
        },
      })
      .then((result) => {
        // Update sort attributes
        app.store.pushPayload(result);
        m.redraw();
      });
  }

  sortingChanged = debounce(500, () => {
    const sorting = this.$('.js-field-data')
      .map(function () {
        return $(this).data('id');
      })
      .get();

    this.updateSort(sorting);
  });
}
