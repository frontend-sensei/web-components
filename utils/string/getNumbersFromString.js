const string = "asw4fd54fd400";

export function getNumbers(string) {
  const numbers = [];
  let numberToAdd = "";

  for (let char of string) {
    if (Number.isNaN(Number(char))) {
      if (numberToAdd) {
        numbers.push(Number(numberToAdd));
        numberToAdd = "";
      }
      continue;
    }
    numberToAdd += char;
  }

  return numbers;
}
