import app from 'flarum/admin/app';
import type Sortable from 'flarum/admin/utils/loadSortable';

type SortableFactory = typeof Sortable;

let sortable: Promise<SortableFactory> | null = null;

/**
 * Core's lazily loaded SortableJS chunk, shared rather than bundling another copy.
 */
export function loadSortable(): Promise<SortableFactory> {
  return (sortable ||= import('flarum/admin/utils/loadSortable').then((module) => module.default));
}

/**
 * Makes a list's `[data-id]` children draggable by `handle`; `onsort` gets the ids in their new order.
 *
 * SortableJS moves DOM nodes behind Mithril's back, so callers must re-key the list after `onsort`.
 */
export function makeSortable(element: HTMLElement, handle: string, onsort: (ids: string[]) => void) {
  loadSortable().then((Sortable) => {
    Sortable.create(element, {
      handle,
      animation: 150,
      delay: 50,
      delayOnTouchOnly: true,
      ghostClass: 'sortable-placeholder',
      onSort: () => onsort(Array.from(element.children).map((child) => (child as HTMLElement).dataset.id!)),
    });
  });
}

export function saveOrder(url: string, ids: string[]) {
  return app.request({
    method: 'POST',
    url: app.forum.attribute('apiUrl') + url,
    body: { sort: ids },
  });
}
