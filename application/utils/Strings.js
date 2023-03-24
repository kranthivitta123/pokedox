export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function prefixAdd(id, prefix_id = "0") {
  const string = id.toString();
  let value;
  switch (string.length) {
    case 1:
      value = `${prefix_id}${prefix_id}` + string;
      break;
    case 2:
      value = `${prefix_id}` + string;
      break;
    case 3:
      value = string;
      break;
    default:
      value = string;
  }
  return value;
}

export function trun(str, limit = 0) {
  return str.substring(0, limit) + "...";
}

export function toFeet(n) {
  var realFeet = (n * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return feet + "'" + inches + "''";
}
