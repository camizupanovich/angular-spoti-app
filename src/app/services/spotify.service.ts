import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private clientId = 'd6b55734aa3f4b49af89ae8023b6c69e';
  private clientSecret = '4659ca881ead4eed81c45197f071db34';
  
  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('grant_type', 'client_credentials');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  getReleases(): Observable<any> {
    return this.getToken().pipe(
      concatMap(response => {
        const token = response.access_token;
        const type = response.token_type;
        const apiHeaders = new HttpHeaders().set('Authorization', `${type} ${token}`);
        return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers: apiHeaders });
      })
    );
  }

  getArtist(termino: string): Observable<any> {
    return this.getToken().pipe(
      concatMap(response => {
        const token = response.access_token;
        const type = response.token_type;
        const apiHeaders = new HttpHeaders().set('Authorization', `${type} ${token}`);
        return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers: apiHeaders });
      })
    );
  }
}