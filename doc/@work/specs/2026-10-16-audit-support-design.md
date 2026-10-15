# flarum/audit support — Design Spec

**Status:** proposed
**Flarum target:** ^2.0
**Date:** 2026-10-16

## Goal

When flarum/audit is enabled, the audit log records who changed Mason's configuration (fields and suggested answers) and every edit to the answers on an existing discussion, with readable entries in the audit browser. Without flarum/audit, Mason behaves as today apart from dispatching its new domain events.

## Non-Goals

- Answers chosen when a discussion is started (core logs `discussion.created`).
- Free-text answer rows created implicitly from the composer.
- Reordering fields or answers.
- Mason settings and permission grants (core audit logs setting and permission changes).
- GDPR erasure effects (flarum/gdpr logs erasures).

## Architecture

Mason dispatches its own domain events; the audit integration only listens. Eloquent model events (tags' approach) cannot see answer changes on a discussion — they are pivot syncs — and would also fire for implicit free-text rows. The events are public API other extensions can hook into.

- Field and answer events are dispatched from `FieldResource` / `AnswerResource` lifecycle hooks (`created`, `updated`, `deleted`), via the resource's `$this->events`. `updated` reports the changed attributes as old → new using `$model->getChanges()` and `$model->getPrevious()`, ignoring `updated_at`; no event when nothing else changed.
- `DiscussionAnswersChanged` is raised on the discussion (`$discussion->raise()`, as flarum/tags raises `DiscussionWasTagged`) from `DiscussionResourceFields::setAnswers()` when the discussion already exists and its set of answers differs from the stored set. It fires for every edit, whoever the actor is.
- The audit integration is one more `->whenExtensionEnabled('flarum-audit', ...)` on the existing single `Extend\Conditional` (FND-189), using `Flarum\Audit\Extend\Audit::listen()`; payload builders live in `FoF\Mason\Audit\AuditPayloads` so `extend.php` stays declarative.

## Events (`FoF\Mason\Event`)

All carry the acting `User $actor`.

| Class | Properties |
|---|---|
| `FieldCreated` | `Field $field` |
| `FieldUpdated` | `Field $field`, `array $changes` (attribute => `[old, new]`) |
| `FieldDeleted` | `Field $field` |
| `AnswerCreated` | `Answer $answer` |
| `AnswerUpdated` | `Answer $answer`, `array $changes` (attribute => `[old, new]`) |
| `AnswerDeleted` | `Answer $answer` |
| `DiscussionAnswersChanged` | `Discussion $discussion`, `Answer[] $oldAnswers`, `Answer[] $newAnswers` |

`AnswerCreated` covers answers created through the admin answer endpoint only, not free-text rows created with a discussion.

## Audit actions and payloads

The audit browser renders label placeholders from a fixed set of payload keys (`name`, `key`, `keys`, `old_name`, `new_name`, `old_value`, `new_value`, `discussion` from `discussion_id`) and has no seam for others. Payloads use those keys for the label and keep full detail alongside, visible via "Show raw". Values are snapshots, so entries stay readable after the field or answer is deleted.

| Action | Payload |
|---|---|
| `mason_field.created` | `field_id`, `name` |
| `mason_field.updated` | `field_id`, `name`, `keys` (changed attribute names), `changes` (attribute => `{old, new}`) |
| `mason_field.deleted` | `field_id`, `name` |
| `mason_answer.created` | `answer_id`, `field_id`, `key` (field name), `name` (answer content) |
| `mason_answer.updated` | `answer_id`, `field_id`, `key` (field name), `old_name`, `new_name` (content), `keys`, `changes` |
| `mason_answer.deleted` | `answer_id`, `field_id`, `key` (field name), `name` (answer content) |
| `discussion.mason_answers_changed` | `discussion_id`, `keys` (names of fields whose answers changed), `old_value`, `new_value` (e.g. `Operating system: Windows; App version: 2.3.1`), `changes` (field name => `{old: [...], new: [...]}`) |

## Locale

Labels ship in Mason's `resources/locale/en.yml` under the audit namespace, as flarum/tags does:

```yaml
flarum-audit:
    lib:
        browser:
            mason_field:
                created: Created custom field {name}
                updated: Updated custom field {name} ({keys})
                deleted: Deleted custom field {name}
            mason_answer:
                created: Added answer {name} to custom field {key}
                updated: Updated answer {old_name} to {new_name} in custom field {key} ({keys})
                deleted: Deleted answer {name} from custom field {key}
            discussion:
                mason_answers_changed: Changed {keys} on {discussion} from {old_value} to {new_value}
```

## Cross-Extension Integration

- `composer.json`: `flarum/audit` added to `optional-dependencies` and `require-dev`.
- `extend.php`: the existing `Extend\Conditional` gains `->whenExtensionEnabled('flarum-audit', fn () => [(new Audit())->listen(...) × 7])`. The group auto-detects as `fof-mason`.

## Testing Surface

Integration tests with `extension('flarum-audit', 'fof-mason')`, driving the real API as admin / users and asserting `audit_log` rows (action, actor, payload):

- Field create / update (only changed attributes; no entry when nothing changed) / delete.
- Answer create via the admin endpoint / update (rename, suggest toggle) / delete.
- Discussion answers edited by the owner and by another user with `update-other-fields` → one entry each with old/new; an update that does not change answers (e.g. rename) → no entry; starting a discussion with answers → no `discussion.mason_answers_changed` entry.
- Without flarum/audit enabled, the existing suite still passes.

## Open Questions

None.

## References

- flarum/audit 2.x: `src/Extend/Audit.php`, `src/AuditLogger.php`, `js/src/common/components/AuditItem.tsx` (parameter whitelist).
- flarum/tags 2.x: `extend.php` audit block, `src/AuditIntegration.php`, `locale/en.yml` (`flarum-audit.lib.browser`).
- Findings: FND-189 (single Conditional), FND-026 (optional dependency + require-dev), FND-126, FND-167.
