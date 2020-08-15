import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  public users: User[] = []
  public doctors: Doctor[] = []
  public hospitals: Hospital[] = []

  constructor( private activatedRoute: ActivatedRoute,
               private searchService: SearchService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ term }) => this.globalSearch( term ) )
  }

  globalSearch( term: string ) {
    this.searchService.globalSearch( term )
      .subscribe( (resp: any) => {
        this.users = resp.users
        this.doctors = resp.doctors
        this.hospitals = resp.hospitals
      })
  }

  openDoctor( doctor: Doctor ) {
    console.log(doctor)
  }

}
