import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  searchData = new BehaviorSubject<string>('');//Le defino un comportamiento a esa propiedad
  observableSearchdata$ = this.searchData.asObservable();//Siempre este escuchando los cambios que esta tenga, se le hace un casteo a esta propiedad

  constructor(private http: HttpClient) { 
    //Comenzar a crear mis servicios, mis metodos
  }

  //Mis servicios que comienzan a trabajar con el api
  getPopular(category: string, page?: any){
      //Lo hacemos con la ruta que traemos del environment
      let url = `${environment.api}/discover/movie`;
      //Comenzamos un switch
      switch(true) {
        case !category: 
          url += '?sort_by=popularity.desc'
          break;
        case category === 'G':
          url += `?certification.lte=${category}&sort_by=popularity.desc`;
          break;
        case category === 'now':
          url += `?primary_release_date.gte=2019-09-01&primary_release_date.lte=2019-12-15`;
          break;
        case category === '2019' || 
             category === '2018' || 
             category === '2017' || 
             category === '2016' || 
             category === '2015':
          url += `?primary_release_year=${category}&sort_by=vote_average.desc`;
          break; 
      }
      if(page){
        url += `&page=${page}`;
      }
      return this.http.get<any>(url);
  }

  getYear(year:any){
    return this.http.get<any>(`${environment.api}/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc`);
  }

  getMovieById(movieId:any){
    return this.http.get<any>(`${environment.api}/movie/${movieId}`);
  }

  getSearch(query:string){
    return this.http.get<any>(`${environment.api}/search/movie?query=${query}`);
  }

  //Actualizar busquedas
  nextData(data:any){
    this.searchData.next(data);
  }
}
