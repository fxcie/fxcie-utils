import { isString } from "../core/isString";

export const FMT = Object.freeze({
  nz: n=>`${num(n) || ''}`,
  int: n=>`${num(n).toFixed(0)}`,
  intNZ: n=>`${num(n)? num(n).toFixed(0): ''}`,
  ceil: n=>`${num(n)? Math.ceil(num(n)).toFixed(0): ''}`,
  percent: n=>`${num(n).toFixed(0)}%`,
  euro: n=>`€${num(n).toFixed(2)}`,
  euroNZ: n=>num(n)?`€${num(n).toFixed(2)}`:'',
  euroKg: n=>`€${num(n).toFixed(2)}/Kg`,
  euroLitre: n=>`€${num(n).toFixed(2)}/Litre`,
  euro_min: n=>`€${num(n).toFixed(2)}/min`,
  euro_30min: n=>`€${num(n).toFixed(2)}/30min`,
  euro_60min: n=>`€${num(n).toFixed(2)}/60min`,
  euro_litre: n=>`€${num(n).toFixed(2)}/Litre`,
  euro_kg: n=>`€${num(n).toFixed(2)}/Kg`,
  euro_ton: n=>`€${num(n).toFixed(2)}/Ton`,
  euro_m: n=>`€${num(n).toFixed(2)}/m`,
  euro_m2: n=>`€${num(n).toFixed(2)}/m2`,
  euro_5m2: n=>`€${num(n).toFixed(2)}/5 m2`,
  euro_10m2: n=>`€${num(n).toFixed(2)}/10 m2`,


  kg: n=>`${num(n).toFixed(3)}Kg`,
  litre: n=>`${num(n).toFixed(3)}Litre`,
  mm: n=>`${num(n).toFixed(0)}mm`,
  m2dp2: n=>`€${num(n).toFixed(2)}m2`,
  m2: n=>`${num(n).toFixed(3)}m2`,

  p1: n=>`€${num(n).toFixed(2)}/unit`,
  pmin: n=>`€${num(n).toFixed(2)}/min`,
  p30min: n=>`€${num(n).toFixed(2)}/30min`,
  p60min: n=>`€${num(n).toFixed(2)}/60min`,
  plitre: n=>`€${num(n).toFixed(2)}/Litre`,
  pkg: n=>`€${num(n).toFixed(2)}/Kg`,
  pton: n=>`€${num(n).toFixed(2)}/Ton`,
  pm: n=>`€${num(n).toFixed(2)}/m`,
  pm2: n=>`€${num(n).toFixed(2)}/m2`,
  p5m2: n=>`€${num(n).toFixed(2)}/5 m2`,
  p10m2: n=>`€${num(n).toFixed(2)}/10 m2`,

  m: n=>`${num(n).toFixed(2)}m`,
  min: n=>`${num(n).toFixed(1)}min`,
  hrs: n=>`${num(n).toFixed(2)}hrs`,
  hideZero: n=>num(n) || '',
  dp0: n=>num(n).toFixed(0),
  dp1: n=>num(n).toFixed(1),
  dp2: n=>num(n).toFixed(2),
  dp3: n=>num(n).toFixed(3),
  dp4: n=>num(n).toFixed(4),
  dp0NZ: n=>num(n)?num(n).toFixed(0):'',
  dp1NZ: n=>num(n)?num(n).toFixed(1):'',
  dp2NZ: n=>num(n)?num(n).toFixed(2):'',
  dp3NZ: n=>num(n)?num(n).toFixed(3):'',
  dp4NZ: n=>num(n)?num(n).toFixed(4):'',
  minToMinSec: n=>minToMinSec(num(n)),
  minToHourMinSec: n=>minToHourMinSec(num(n)),
});


export function num(value): number{
  return Number(value || 0);
}

export function str(value): string{
  return isString(value)? String(value): '';
}

export function minToMinSec(min){
  min = num(min);
  const mins = Math.floor(min)
  const secs = Math.floor((min*60)) - mins*60;
  return `${
    String(mins).padStart(2,'0')
  }:${
    String(secs).padStart(2,'0')
  }`;
}

export function minToHourMinSec(min){
  min = num(min);
  const hours = Math.floor(min/60)
  const mins = Math.floor(min) - hours*60
  const secs = Math.floor((min*60)) - mins*60 - hours*3600;
  return `${
    hours?
    String(hours).padStart(2,'0')+':':''
  }${
    String(mins).padStart(2,'0')
  }:${
    String(secs).padStart(2,'0')
  }`;
}

export function format(value, format){
  return formatValue(value, format)
}

export function formatValue(value, format){
  return FMT[format]? FMT[format](value): value
}

export function encodeHTMLEntities(str: string): string {
  if (!str)
    return str;

  // First:
  //   Match any currently encoded characters first
  //   (i.e. `&#67;`, `&#x43;`, or '&amp;')
  //   Finally, match on any character with `.`, using
  //   the `u` RegExp flag to match full Unicode code points.
  // Second:
  //   1) Already encoded characters must be at least four
  //      characters (i.e. `&#1;`), and must start with an
  //      '&' character. If this is true, then the match
  //      is an already encoded character sequence, so just
  //      return it.
  //   2) Otherwise, see if the character is a single UTF-16
  //      character, and is in our whitelist of allowed
  //      characters (common ASCII, without masters or < or >).
  //      If this is the case, then don't encode the character,
  //      and simply return it.
  //   3) Finally, use codePointAt to encode the Unicode character.
	// @ts-ignore
  return str.replace(/&#[0-9]+;|&#x[0-9a-fA-F]+;|&[0-9a-zA-Z]{2,};|./gu, (m) => {
    // #1, is this an already encoded character sequence?
    // If so, just return it.
    if (m.length >= 4 && m[0] === '&')
      return m;

    // #2, is this one of our whitelisted ASCII characters
    // (not including masters or < or >)
    if (m.length === 1 && m.match(/[a-zA-Z0-9\s\t\n\r~`!@#$%^&*_+=(){}[\]/\\,?:;|.-]/))
      return m;

    // #3 Otherwise, encode it as unicode
    return `&#${m.codePointAt(0)};`;
  });
}

export function decodeHTML(str: string): string{
  return str.replace(/&#([0-9]+);/g, function(full, int) {
      return String.fromCharCode(parseInt(int));
  });
}
