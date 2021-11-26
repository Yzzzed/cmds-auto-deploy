function getTime() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const MM = coverEachUnit(date.getMonth() + 1);
  const dd = coverEachUnit(date.getDate());
  const HH = coverEachUnit(date.getHours());
  const mm = coverEachUnit(date.getMinutes());
  const ss = coverEachUnit(date.getSeconds());
  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
}

function coverEachUnit(val) {
  return val < 10 ? '0' + val : val;
}

module.exports = getTime;