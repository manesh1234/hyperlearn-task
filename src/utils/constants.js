
export const findOnes = (arr) => {
    const countOnes = arr.reduce((acc, val) => {
        if (val === true) {
            return acc + 1;
        }
        return acc;
    }, 0);
    return countOnes;
}

export const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const len = arr1.length;
    for (let i = 0; i < len; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}