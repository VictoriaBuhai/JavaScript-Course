function updateObjectInArray(initialArray, keyToFind, keyValueToFind, patch) {
    return initialArray.map(function (obj) {
        if (obj[keyToFind] === keyValueToFind) {
            Object.assign(obj, patch);
        }
        return obj;
    });
}
