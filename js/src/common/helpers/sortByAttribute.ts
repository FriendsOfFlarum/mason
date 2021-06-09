export default function sortByAttribute<T extends { [k in K]: () => any }, K extends string | number | symbol>(items: T[], attr: K) {
    if (!attr) attr = 'sort';
    return items.sort((a, b) => a[attr]() - b[attr]());
}
