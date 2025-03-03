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

export function escapeRegExp(str) {
	return str.replace(/[[\]*+?{}.()^$|\\-]/g, "\\$&");
}

export function randomString(len: number = 8, charSet?: string) {
	charSet =
		charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	len = len || 8;
	var randomString = "";
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
}
