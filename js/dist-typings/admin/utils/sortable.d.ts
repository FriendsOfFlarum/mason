import type Sortable from 'flarum/admin/utils/loadSortable';
type SortableFactory = typeof Sortable;
/**
 * Core's lazily loaded SortableJS chunk, shared rather than bundling another copy.
 */
export declare function loadSortable(): Promise<SortableFactory>;
/**
 * Makes a list's `[data-id]` children draggable by `handle`; `onsort` gets the ids in their new order.
 *
 * SortableJS moves DOM nodes behind Mithril's back, so callers must re-key the list after `onsort`.
 */
export declare function makeSortable(element: HTMLElement, handle: string, onsort: (ids: string[]) => void): void;
export declare function saveOrder(url: string, ids: string[]): Promise<unknown>;
export {};
