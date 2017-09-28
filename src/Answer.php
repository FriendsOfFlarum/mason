<?php

namespace Flagrow\Mason;

use Carbon\Carbon;
use Flarum\Core\Discussion;
use Flarum\Database\AbstractModel;

/**
 * @property int $id
 * @property int $field_id
 * @property Field $field
 * @property string $content
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property \Illuminate\Database\Eloquent\Collection|Discussion[] $discussions
 */
class Answer extends AbstractModel
{
    public $timestamps = true;

    protected $table = 'flagrow_mason_answers';

    protected $fillable = ['*'];

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
