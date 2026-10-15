import app from 'flarum/common/app';
import type Answer from '../models/Answer';
import type Field from '../models/Field';

interface Ordered {
  id(): string | undefined;
  sort(): number | null;
}

/**
 * Admin-defined order. Items never reordered (`sort` null) go last, oldest first.
 */
export function bySort<T extends Ordered>(items: T[]): T[] {
  const key = (item: T) => item.sort() ?? Number.MAX_SAFE_INTEGER;

  return items.slice().sort((a, b) => key(a) - key(b) || Number(a.id()) - Number(b.id()));
}

export function byContent(answers: Answer[]): Answer[] {
  return answers.slice().sort((a, b) => a.content().localeCompare(b.content()));
}

export function sortedFields(): Field[] {
  return bySort(app.store.all<Field>('mason-fields'));
}

/**
 * Answers preloaded with the forum carry no `field` linkage, so fall back to the field suggesting them.
 */
export function fieldOf(answer: Answer, fields: Field[]): Field | undefined {
  const field = answer.field();

  if (field) return field;

  return fields.find((candidate) => (candidate.suggestedAnswers() || []).some((suggested) => suggested?.id() === answer.id()));
}

export function answersFor(field: Field, answers: Answer[], fields: Field[]): Answer[] {
  return answers.filter((answer) => fieldOf(answer, fields) === field);
}

/**
 * `answers` with `field`'s answers swapped for `fieldAnswers`.
 */
export function withFieldAnswers(answers: Answer[], field: Field, fieldAnswers: Answer[], fields: Field[] = sortedFields()): Answer[] {
  return [...answers.filter((answer) => fieldOf(answer, fields) !== field), ...fieldAnswers];
}

export function missingRequiredFields(answers: Answer[], fields: Field[] = sortedFields()): Field[] {
  return fields.filter((field) => field.required() && !answersFor(field, answers, fields).length);
}

/**
 * Store relationships keep `undefined` holes for records deleted client-side.
 */
export function present<T>(items: false | (T | undefined)[] | undefined | null): T[] {
  return (items || []).filter((item): item is T => !!item);
}
