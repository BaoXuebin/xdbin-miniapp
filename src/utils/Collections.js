export const equals = (e1, e2, equalCondition, strict=false) => {
  if (!equalCondition || typeof equalCondition !== 'function') {
    return strict ? e1 === e2 : e1 == e2;
  }
  return equalCondition(e1, e2);
};
//
export const contains = (collection, element, equalCondition) => {
  if (!collection) {
    throw new Error(collection + 'is not collection.');
  }
  if (!equalCondition || typeof equalCondition !== 'function') {
    return collection.indexOf(element) >= 0;
  }
  for (let e of collection) {
    if (equalCondition(e, element)) {
      return true;
    }
  }
  return false;
};
export const distinct = (collection, equalCondition) => {
  if (!equalCondition || typeof equalCondition !== 'function') {
    return new Set([...collection]);
  }
  const newCollection = [];
  for (let element of collection) {
    if (!contains(newCollection, element, equalCondition)) {
      newCollection.push(element);
    }
  }
  return newCollection;
};