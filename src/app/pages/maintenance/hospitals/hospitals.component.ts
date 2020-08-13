import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ImageModalService } from 'src/app/services/image-modal.service';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = []
  public loading = true
  private imgSubs: Subscription

  constructor( private hospitalService: HospitalService,
               private imageModalService: ImageModalService,
               private searchService: SearchService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.loadHospitals()

    this.imgSubs = this.imageModalService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.loadHospitals() )

  }

  search( term: string ) {
    if ( term.length === 0 ) {
      return this.loadHospitals()
    }

    this.searchService.search( 'hospitals', term )
    .subscribe( results => {
      this.hospitals = results
    })
  }

  loadHospitals() {
    this.loading = true

    this.hospitalService.loadHospitals()
      .subscribe( hospitals => {
        this.loading = false
        this.hospitals = hospitals
      })
  }

  saveChanges( hospital: Hospital ) {
    this.hospitalService.updateHospitals( hospital._id, hospital.name )
      .subscribe( resp => {
        Swal.fire( 'Actualizado', hospital.name, 'success' )
      })
  }

  deleteHospital( hospital: Hospital ) {
    this.hospitalService.deleteHospitals( hospital._id )
      .subscribe( resp => {
        this.loadHospitals()
        Swal.fire( 'Eliminado', hospital.name, 'success' )
      })
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if ( value.trim().length > 0 ) {
      this.hospitalService.createHospitals( value )
        .subscribe( (resp: any) => {
          this.hospitals.push( resp.hospital )
        })
    }
  }

  openModal( hospital: Hospital ) {
    this.imageModalService.openModal( 'hospitals', hospital._id, hospital.img )

  }

}
