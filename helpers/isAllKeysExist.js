export default function isAllKeysExist(object = {}, keys = []) {
  return keys.every(key => key in object);
}
