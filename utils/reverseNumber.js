/*
принимает в себя число и возвращает его обратное значение
пример: 1234 => 4321, -4321 => -1234, -0 => 0, 0 => 0
*/

// Better solution
function reverseNumber(x) {
    const MIN = Math.pow(-2, 31);
    const MAX = Math.pow(2, 31) - 1;
    let reversed = 0;
    let tail = 0;
    let sign = 1;
    let source = x;
    if (source < 0) {
        sign = -1;
        source *= sign
    }
    while (source > 0) {
        tail = source % 10;
        source = (source - tail) / 10;
        reversed = reversed * 10 + tail;
    }
    reversed = sign * reversed;
    if (reversed <= MIN || reversed >= MAX) {
        return 0;
    }
    return reversed;
};

// console.log(reverseNumber(-5123))
