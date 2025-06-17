export const buscarEnSesionStorage = (key: string): any => {
    let data = sessionStorage.getItem(key);

    if(data){
      return JSON.parse(data);
    }

    return null;
}
