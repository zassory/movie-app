import { Component, OnInit } from '@angular/core';

// Services
import { MovieService } from '../../../services/movie.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  // Propiedades
  public searchData = null;
  public subscriptionSearchData: Subscription;

  constructor(
    private movieService: MovieService
  ) {
      this.subscriptionSearchData = this.movieService.observableSearchdata$
        .subscribe(
          dataSearch => {
            this.searchData = dataSearch; //me subscribo para estar escuchando dinamicamente y constamente la busqueda en el navbar
          });
   }

  ngOnInit() {
  }

  public getMoviesSearch() {
    if(this.searchData) {
      this.movieService.nextData(this.searchData);
    }
  }

}