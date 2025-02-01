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