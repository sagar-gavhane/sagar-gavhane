// https://www.30secondsofcode.org/js/s/truncate-string
export default function truncateString(str, num) {
  if (!str) return str

  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str
}
