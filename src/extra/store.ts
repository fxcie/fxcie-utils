export function save_store(store, data){
  if(data==null) localStorage.clearItem(store);
  else localStorage.setItem(store, data);
}

export function load_store(store, def = null){
  return localStorage.getItem(store) || def;
}
