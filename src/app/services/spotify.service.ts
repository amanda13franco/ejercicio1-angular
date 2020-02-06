import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) {
  }

  getQuery( query: string) {
     const url = `https://api.spotify.com/v1/${query}`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCY3C5uC1czFyMk1JY-wm3GsMPSAFwk5tnbhCdVkOD1oZD7eVCDLUVx5Jh8Hih4MQx7e0NO0KQNz0yV3UU'
      });

      return this.http.get(url, { headers });
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    // 'Authorization': 'Bearer BQB8Uspnwk2TPsHBT7eKilHJaqLP_tsKfKDPUdwjdiyB6wIn8xqKwpGndUW9tIMkEZjNk0TL6-3pJBTay-Y'
    // });
    return this.getQuery('browse/new-releases')
    .pipe( map( data => {
      return data['albums'].items;
    }));
  }

  getArtista(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=20`)
      .pipe( map(data => data['artists'].items));
  }
}
