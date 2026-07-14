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

  listar_especies(){
    return this.http.get("https://36fl9rx247.execute-api.us-east-1.amazonaws.com/v1/listespecie", {responseType: 'json'});
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

  registar_mascota(data: any) {
    const imagenes: any = {
      0: 'https://em-content.zobj.net/source/microsoft/378/dog-face_1f436.png', //perro
      1: 'https://em-content.zobj.net/source/microsoft/378/cat-face_1f431.png', //gato
      2: 'https://em-content.zobj.net/source/microsoft/378/hamster_1f439.png', // hamster  
      3: 'https://em-content.zobj.net/source/microsoft/378/rabbit-face_1f430.png', //conejo
      4: 'https://em-content.zobj.net/source/microsoft/378/bird_1f426.png',//pajaro
      // pajaro: 'https://em-content.zobj.net/source/microsoft/378/bird_1f426.png', // pajaro2
      5: 'https://em-content.zobj.net/source/microsoft/378/parrot_1f99c.png',//loro
      6: 'https://em-content.zobj.net/source/microsoft/378/turtle_1f422.png', //tortuga
      // pez: 'https://em-content.zobj.net/source/microsoft/378/fish_1f41f.png',
      //caballo: 'https://em-content.zobj.net/source/microsoft/378/horse-face_1f434.png',
      //vaca: 'https://em-content.zobj.net/source/microsoft/378/cow-face_1f42e.png',
      //cerdo: 'https://em-content.zobj.net/source/microsoft/378/pig-face_1f437.png',
      //gallina: 'https://em-content.zobj.net/source/microsoft/378/chicken_1f414.png',
    };

    data.fotoUrl =
    imagenes[data.idEspecie] ??
    'https://em-content.zobj.net/source/microsoft/378/paw-prints_1f43e.png';

    // data.idEspecie = "5"

    console.log("Enviando:", data)
    return this.http.post('https://36fl9rx247.execute-api.us-east-1.amazonaws.com/v1/mascota',data,{responseType: 'json'});
  }

  editar_mascota(data: any) {
    const imagenes: any = {
      0: 'https://em-content.zobj.net/source/microsoft/378/dog-face_1f436.png', //perro
      1: 'https://em-content.zobj.net/source/microsoft/378/cat-face_1f431.png', //gato
      2: 'https://em-content.zobj.net/source/microsoft/378/hamster_1f439.png', // hamster  
      3: 'https://em-content.zobj.net/source/microsoft/378/rabbit-face_1f430.png', //conejo
      4: 'https://em-content.zobj.net/source/microsoft/378/bird_1f426.png',//pajaro
      // pajaro: 'https://em-content.zobj.net/source/microsoft/378/bird_1f426.png', // pajaro2
      5: 'https://em-content.zobj.net/source/microsoft/378/parrot_1f99c.png',//loro
      6: 'https://em-content.zobj.net/source/microsoft/378/turtle_1f422.png', //tortuga
    };
 
    data.fotoUrl =
    imagenes[data.idEspecie] ??
    'https://em-content.zobj.net/source/microsoft/378/paw-prints_1f43e.png';
  
    return this.http.post('https://36fl9rx247.execute-api.us-east-1.amazonaws.com/v1/mascota/updmascota',data,{ responseType: 'json' });
  
  }
  
}
