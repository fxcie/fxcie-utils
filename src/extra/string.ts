export function substr(str: string, start: number, size: number){
	start = Math.trunc(start);
	size = Math.trunc(size);
  str = String(str);
  const len = str.length;
  if(start < 0) start = Math.max(0, len + start);
  if(size < 0){
    start = Math.max(0,start + size);
    size = -size;
  }
	return str.substring(start, size)
}

export function trimBack(strArr, ...args) {
  return strArr
  .reduce((str, next, i) => str + args[i - 1] + next)
  .split(/\n/)
  .map(str=>String(str).trim())
  .filter(str=>str)
  .join("\n");
}