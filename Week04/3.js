// Wildcard
function find(s, t) {
  let startCount = 0;
  let startIndex = [];
  for (let i = 0; i < t.length; i++) {
    if (t[i] == '*') {
      startCount++;
      startIndex.push(i);
    }
  }
  if (startCount == 0) {
    for (let i = 0; i < t.length; i++) {
      if (s[i] !== t[i] && t[i] !== '?') return false;
    }
    return true;
  }
  let lastIndex = 0;
  for (i = 0; t[i] !== '*'; i++) {
    if (s[i] !== t[i] && t[i] !== '?') return false;
  }
  lastIndex = i;
  for (let p = 0; p < startCount - 1; p++) {
    i++;
    let subt = '';
    while (t[i] !== '*') {
      subt += t[i];
      i++;
    }
    let reg = new RegExp(subt.replace(/\?/g, '[\\s\\S]'), 'g');
    reg.lastIndex = lastIndex;
    if (!reg.exec(s)) return false;
    lastIndex = reg.lastIndex;
  }
  if (s.length - lastIndex < t.length - startIndex[startIndex.length - 1] - 1) {
    return false;
  }
  for (let j = 0; j <= s.length - lastIndex && t[t.length - j] !== '*'; j++) {
    if (t[t.length - j] !== s[s.length - j] && t[t.length - j] !== '?')
      return false;
  }
  return true;
}
