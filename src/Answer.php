<?php

namespace FoF\Mason;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;

/**
 * @property int $id
 * @property int $field_id
 * @property Field $field
 * @property string $content
 * @property bool $is_suggested
 * @property bool $sort
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property \Illuminate\Database\Eloquent\Collection|Discussion[] $discussions
 */
class Answer extends AbstractModel
{
    public $timestamps = true;

    protected $table = 'fof_mason_answers';

    protected $casts = [
        'is_suggested' => 'boolean',
    ];

    protected $visible = [
        'content',
        'is_suggested',
        'sort',
    ];

    protected $fillable = [
        'content',
        'is_suggested',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function discussions()
    {
        return $this->belongsToMany(Discussion::class);
    }
}
