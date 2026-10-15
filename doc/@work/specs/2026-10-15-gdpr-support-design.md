# flarum/gdpr support — Design Spec

**Status:** proposed
**Flarum target:** ^2.0
**Date:** 2026-10-15

## Goal

When flarum/gdpr is enabled, a user's data export includes their Mason answers, and processing an erasure request handles those answers consistently with how core treats discussions and posts. Without flarum/gdpr, Mason behaves exactly as today.

## Non-Goals

- No new admin settings or UI; the GDPR admin page lists the type from its descriptions.
- No authorship tracking on answers (no `user_id` column / migration).
- Private discussions (`is_private`): not exported, mirroring core; the extension owning the private flag exports those.

## Architecture

A `FoF\Mason\Gdpr\MasonAnswers` class extends `Flarum\Gdpr\Data\Type` and is registered with `Flarum\Gdpr\Extend\UserData::addType()` inside a single `Extend\Conditional()->whenExtensionEnabled('flarum-gdpr', ...)` in `extend.php` (team rule FND-189; precedent: flarum/messages). Mason has no other optional integrations yet, so this is the only `Conditional`.

A user's Mason data is the set of answers attached to discussions they started (`discussions.user_id`). Answers carry no author, and free-text answers are shared rows: `AnswerRepository::findOrNew()` reuses a row when two discussions get the same text. Erasure therefore operates on the discussion–answer pivot first and only deletes answer rows nothing references any more.

flarum/gdpr runs extension types after its core types (`Posts`, `Discussions`) and before `User` (`DataProcessor::addType()`). By the time Mason's `delete()` runs, core has already deleted the user's posts and any discussion left without posts — the pivot cascades for those (`fof_mason_discussion_answer.discussion_id` has `onDelete('cascade')`), so their free-text answers are already orphaned.

## Data Model

Unchanged. Tables used: `fof_mason_fields`, `fof_mason_answers` (`is_suggested`), `fof_mason_discussion_answer` (pivot), `discussions` (`user_id`, `is_private`).

## Behaviour

### Export

For each discussion with `user_id` = user, `is_private` = false, visible to the user (`whereVisibleTo`), oldest first, that has at least one Mason answer — one file `mason/discussion-{id}.json`:

```json
{
  "discussion_id": 12,
  "title": "Crash on startup",
  "fields": [
    { "field": "Operating system", "answers": ["Linux"] },
    { "field": "App version", "answers": ["2.3.1"] }
  ]
}
```

Fields in admin order; answers to soft-deleted fields are excluded (as in the API). Returns `null` when there is nothing to export. Eager-load answers and fields per chunk (no per-discussion queries).

### Anonymize

No action: answers stay, consistent with core keeping post content and discussions under anonymization.

### Delete

1. Detach all answers from discussions the user started that still exist (their opening post is gone; the details described it).
2. Delete every free-text answer (`is_suggested` = false) that no discussion references any more. This includes answers orphaned by core deleting emptied discussions earlier in the same job, and any pre-existing orphans — unreferenced free-text answers have no remaining purpose.
3. Suggested answers (admin data) and free-text answers still used by other users' discussions are never deleted.

`piiFields()`: none (Mason serializes no PII-keyed attributes).

## Cross-Extension Integration

- `composer.json`: `flarum/gdpr` added to `extra.flarum-extension.optional-dependencies` (boot order, FND-026) and to `require-dev` (PHPStan + tests). Not a hard requirement.
- `extend.php`: `(new Extend\Conditional())->whenExtensionEnabled('flarum-gdpr', fn () => [(new GdprUserData())->addType(Gdpr\MasonAnswers::class)])`.

## Locale

Descriptions shown on the GDPR admin page, in Mason's `resources/locale/en.yml` under gdpr's namespace (as flarum/messages does), keyed by the type's `dataType()` lowercased:

```yaml
flarum-gdpr:
    lib:
        data:
            masonanswers:
                export_description: The custom field answers on discussions you started.
                anonymize_description: Your custom field answers stay with your discussions.
                delete_description: Custom field answers are removed from discussions you started, and answers you typed that no other discussion uses are deleted.
```

## Testing Surface

Integration tests (`tests/integration/gdpr/`) with `extension('flarum-gdpr', 'fof-mason')`, invoking the type directly as the gdpr jobs do:

- Export: one file per started discussion with answers; field order and contents; private discussions and other users' discussions excluded; soft-deleted field excluded; `null` when nothing to export.
- Anonymize: answers and pivot rows unchanged.
- Delete: surviving started discussions lose their answers; other users' discussions keep theirs; a free-text answer shared with another user's discussion survives; an orphaned free-text answer is deleted; suggested answers survive.
- Registration: with flarum/gdpr enabled the type is in `DataProcessor::types()`.

## Open Questions

None.

## References

- flarum/gdpr 2.x: `src/Contracts/DataType.php`, `src/Data/Type.php`, `src/Data/Posts.php`, `src/DataProcessor.php::addType()`, `src/Jobs/ErasureJob.php`.
- flarum/messages 2.x: `src/Data/Messages.php`, `extend.php` (Conditional), `locale/en.yml` (`flarum-gdpr.lib.data.messages`).
- Findings: FND-189 (single Conditional), FND-026 (optional dependency + require-dev), FND-126 (extension ids in tests), FND-167 (model-class keys in `prepareDatabase`), FND-192 (`prepareDatabase` before boot).
