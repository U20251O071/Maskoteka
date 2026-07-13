import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private http: HttpClient
  ) {  }

  listar_mascotas_usuario(param: string){
    return this.http.get("https://36fl9rx247.execute-api.us-east-1.amazonaws.com/v1/listarmascotausuario?idUsuario=" + param, {responseType: 'json'});
  }

  obtener_dashboard(param: string) {
    return this.http.get(
      'https://g3cjzx1ix5.execute-api.us-east-1.amazonaws.com/v1/dashboard?idUsuario=' + param,
      { responseType: 'json' }
    );
  }

  login_usuario(data: { correo: string; clave: string }) {
    return this.http.post(
      'https://8hr2841ry8.execute-api.us-east-1.amazonaws.com/v1/usuario/login',
      data,
      {
        responseType: 'json',
      },
    );
  }

  obtener_detalle_mascota(data: { idMascota: string; idUsuario: string }){
    /* return this.http.get("https://36fl9rx247.execute-api.us-east-1.amazonaws.com/v1/mascota/obtenermascota?idUsuario=" 
    + data.idUsuario + "&idMascota=" + data.idMascota, {responseType: 'json'}); */
    const params = new HttpParams()
      .set('idUsuario', data.idUsuario)
      .set('idMascota', data.idMascota);
      
    return this.http.get("https://36fl9rx247.execute-api.us-east-1.amazonaws.com/v1/mascota/obtenermascota", {params});
  }
}
