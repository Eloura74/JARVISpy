/**
 * textEffect.js - Simulateur de décryptage de caractères pour interface J.A.R.V.I.S
 */
export const decryptText = (element, finalValue, duration = 800) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
  const length = finalValue.length;
  let iteration = 0;

  const interval = setInterval(() => {
    element.innerText = finalValue
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return finalValue[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= length) {
      clearInterval(interval);
      element.innerText = finalValue;
    }

    iteration += length / (duration / 30);
  }, 30);
};
