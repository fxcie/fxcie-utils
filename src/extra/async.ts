export function sleep(ms=1){
  return new Promise($=>setTimeout($,ms));
}

export async function asyncMap(
  arr: Array<any>, method: Function
){
  const copy = [...arr];
  const results: Array<any> = [];
  for(let i=0;i<copy.length; i++){
    const result = await method(copy[i], i, arr);
    results.push(result);
  }
  return results;
}

export async function asyncFilter(
  arr: Array<any>, method: Function
){
  const copy = [...arr];
  const results: Array<any> = [];
  for(let i=0;i<copy.length; i++){
    const result = await method(copy[i], i, arr);
    if(result) results.push(copy[i]);
  }
  return results;
}

