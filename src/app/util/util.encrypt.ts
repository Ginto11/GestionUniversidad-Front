import { environment } from "@envs/environment"
import CryptoJS from "crypto-js";

export const encriptar = (valor:string):string => {
    return CryptoJS.AES.encrypt(valor, environment.ENCRYPT_KEY).toString();
}

export const desencriptar = (valorEncriptado:string):string =>{
    const valorDesencriptado = CryptoJS.AES.decrypt(valorEncriptado, environment.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
    if(!valorDesencriptado){
        return "Error: al descriptar.";
    }

    return valorDesencriptado;
}