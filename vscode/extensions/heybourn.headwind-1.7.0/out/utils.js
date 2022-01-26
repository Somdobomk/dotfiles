"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sorts a string of CSS classes according to a predefined order.
 * @param classString The string to sort
 * @param sortOrder The default order to sort the array at
 *
 * @returns The sorted string
 */
exports.sortClassString = (classString, sortOrder, options) => {
    let classArray = classString.split(/\s+/g);
    if (options.shouldRemoveDuplicates) {
        classArray = removeDuplicates(classArray);
    }
    // prepend custom tailwind prefix to all tailwind sortOrder-classes
    const sortOrderClone = [...sortOrder];
    if (options.customTailwindPrefix.length > 0) {
        for (var i = 0; i < sortOrderClone.length; i++) {
            sortOrderClone[i] = options.customTailwindPrefix + sortOrderClone[i];
        }
    }
    classArray = sortClassArray(classArray, sortOrderClone, options.shouldPrependCustomClasses);
    return classArray.join(' ');
};
const sortClassArray = (classArray, sortOrder, shouldPrependCustomClasses) => [
    ...classArray.filter(el => shouldPrependCustomClasses && sortOrder.indexOf(el) === -1),
    ...classArray
        .filter(el => sortOrder.indexOf(el) !== -1) // take the classes that are in the sort order
        .sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)),
    ...classArray.filter(el => !shouldPrependCustomClasses && sortOrder.indexOf(el) === -1) // prepend the classes that were not in the sort order if configured this way
];
const removeDuplicates = (classArray) => [
    ...new Set(classArray)
];
//# sourceMappingURL=utils.js.map