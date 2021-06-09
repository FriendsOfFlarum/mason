/**
 * Split an array into multiple arrays of a given size.
 *
 * Useful for grid layouts.
 *
 * @see https://stackoverflow.com/a/64777515/11091039
 * @param arr Array of items
 * @param size Number of items per array
 */
export default function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array(Math.ceil(arr.length / size))
        .fill(undefined)
        .map((_, i) => {
            const x = arr.slice(size * i, size + size * i);
            console.log('a', x);

            return x;
        });
}
