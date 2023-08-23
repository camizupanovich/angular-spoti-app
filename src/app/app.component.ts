import { Component,OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spoti-app';
  public data:any;
  constructor(
    private _service :SpotifyService
  ){}
  ngOnInit(){
    this.data =this._service.getReleases();
    if(this.data){
      console.log(this.data)
    }
  }
}
