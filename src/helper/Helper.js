//function to capitalize first letter of string
export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//function to capitalize first letter of a each word of string
export function capitalize(str, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
}
//custom function to generate random password
export function generateRandomPassword() {
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const num = '1234567890';
  const specials = ',.!@#$%^&*';
  const options = [alpha, num, alpha, specials, calpha, calpha, num, num, specials, alpha];
  let opt, choose;
  let randomPass = '';
  for (let i = 0; i < 10; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    randomPass = randomPass + options[opt][choose];
    options.splice(opt, 1);
  }
  return randomPass;
}
