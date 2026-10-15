/**
 * Model.save() serializes relationships only through the static Model.getIdentifier(), so this is the one
 * seam for sending unsaved free-text answers inline; the API creates them along with the discussion.
 */
export default function patchModelIdentifier(): void;
