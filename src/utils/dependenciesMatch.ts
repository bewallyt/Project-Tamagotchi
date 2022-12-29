export default function dependenciesMatch(oldDeps, newDeps) {
  if (oldDeps.length !== newDeps.length) {
    return false;
  }
  return oldDeps.every((oldValue, index) => newDeps[index] === oldValue);
}
