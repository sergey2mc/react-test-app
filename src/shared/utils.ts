export function reorderListMutating<T extends { order: number }>(
  list: T[],
  prevOrder: number,
  newOrder: number,
): void {
  list.forEach(item => {
    if (item.order === prevOrder) {
      item.order = newOrder;
    } else if (prevOrder < newOrder) {
      // move item down
      if (
        prevOrder <= item.order &&
        newOrder >= item.order
      ) {
        // affect only items with:
        // * bigger order then current item had previously
        // * smaller order than new current item's order

        item.order = item.order - 1;
      }
    } else {
      // move item up
      if (
        prevOrder >= item.order &&
        newOrder <= item.order
      ) {
        // affect only items with:
        // * smaller order then current item had previously
        // * bigger order than new current item's order

        item.order = item.order + 1;
      }
    }
  });

  list.sort((p, q) => (p.order > q.order) ? 1 : -1);
}

export function reorderList<T extends { order: number }>(
  list: T[],
  prevOrder: number,
  newOrder: number,
) {
  sortByOrder<T>(list).map(item => {
    if (item.order === prevOrder) {
      return { ...item, order: newOrder };
    } else if (prevOrder < newOrder) {
      // move item down
      if (
        prevOrder <= item.order &&
        newOrder >= item.order
      ) {
        // affect only items with:
        // * bigger order then current item had previously
        // * smaller order than new current item's order

        return { ...item, order: item.order - 1 };
      }
    } else {
      // move item up
      if (
        prevOrder >= item.order &&
        newOrder <= item.order
      ) {
        // affect only items with:
        // * smaller order then current item had previously
        // * bigger order than new current item's order

        return { ...item, order: item.order + 1 };
      }
    }
  });

  return sortByOrder<T>(list);
}

export function sortByOrder<T extends { order: number }>(list: T[], isAsc = true): T[] {
  return [...list].sort((p, q) => (p.order > q.order)
    ? (isAsc ? 1 : -1)
    : (isAsc ? -1 : 1)
  );
}
