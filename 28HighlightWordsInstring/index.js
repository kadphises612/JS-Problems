function Highligher(string, keywords) {
  const uniqueKeywors = new Set(keywords);
  const words = string.split(" ");
  const result = words.map((word) => {
    let output = "";
    if (uniqueKeywors.has(word)) {
      output = `<strong>${word}</strong>`;
    } else {
      for (let i = 0; i < word.length; i++) {
        const prefix = word.slice(0, i + 1);
        const suffix = word.slice(i + 1);
        if (uniqueKeywors.has(prefix) && uniqueKeywors.has(suffix)) {
          output = `<strong>${prefix}${suffix}<strong>`;
          break;
        } else if (uniqueKeywors.has(prefix) && !uniqueKeywors.has(suffix)) {
          output = `<strong>${prefix}<strong>${suffix}`;
        } else if (!uniqueKeywors.has(prefix) && uniqueKeywors.has(suffix)) {
          output = `${prefix}<strong>${suffix}<strong>`;
        }
      }
    }
    return output !== "" ? output : word;
  });

  return result.join(" ");
}

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ["Front", "End", "JavaScript"];

console.log(Highligher(str, words));
