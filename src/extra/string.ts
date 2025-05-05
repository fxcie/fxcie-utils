import { str } from "./convert";

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

export function trimInfo(strArr, ...args) {
  return strArr
  .reduce((str, next, i) => str + args[i - 1] + next)
  .split(/\n/)
  .map(str=>String(str).trim())
  .filter(str=>str)
  .join("\n");
}

export function ucase(s){ return str(s).toUpperCase(); }
export function lcase(s){ return str(s).toLowerCase(); }
export function fcase(s){
  return str(s).split(/\b/)
  .map(s=>{
    const [first, ...rest] = s.split('');
    return `${ucase(first)}${lcase(rest.join(''))}`;
  })
  .join('');
}

export async function digest({ algorithm = "SHA-256", message }){
  const buffer = new Uint8Array(
    await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
  );

  return buffer // @ts-ignore
  .map((x) => ("0" + x.toString(16)).slice(-2))
  .join('');
}
