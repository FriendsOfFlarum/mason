/**
 * Split an array into multiple arrays of a given size
 * Useful for grid layouts
 * @see https://stackoverflow.com/a/10456644/3133038
 * @param {Array} items
 * @param {number} itemsPerChunk
 * @returns {Array}
 */
export default function (items, itemsPerChunk) {
    let R = [];
    for (let i = 0; i < items.length; i += itemsPerChunk) {
        R.push(items.slice(i, i + itemsPerChunk));
    }
    return R;
}
