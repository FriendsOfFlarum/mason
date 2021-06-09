/**
 * Split an array into multiple arrays of a given size.
 *
 * Useful for grid layouts.
 *
 * @see https://stackoverflow.com/a/64777515/11091039
 * @param items Array of items
 * @param itemsPerChunk Number of items per array
 */
export default function chunkArray<T>(items: T[], itemsPerChunk: number): T[][] {
    return [...Array(Math.ceil(items.length / itemsPerChunk))].map((_, i) => {
        return items.slice(itemsPerChunk * i, itemsPerChunk + itemsPerChunk * i);
    });
    // Fix for sometimes having extra empty array(s) at the end
    // .reduce((arr, itemGroup) => (itemGroup.length > 0 ? [...arr, itemGroup] : arr), [] as T[][]);
}
