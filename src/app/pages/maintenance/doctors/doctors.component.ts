import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { ImageModalService } from '../../../services/image-modal.service';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = []
  public loading = true
  private imgSubs: Subscription

  constructor( private doctorService: DoctorService,
               private imageModalService: ImageModalService,
               private searchService: SearchService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.loadDoctors()

    this.imgSubs = this.imageModalService.newImage
    .pipe( delay(100) )
    .subscribe( img => this.loadDoctors() )

  }

  search( term: string ) {
    if ( term.length === 0 ) {
      return this.loadDoctors()
    }

    this.searchService.search( 'doctors', term )
    .subscribe( results => {
      this.doctors = results
    })
  }

  loadDoctors() {
    this.loading = true
    this.doctorService.loadDoctors()
      .subscribe( doctors => {
        this.loading = false
        this.doctors = doctors
        console.log(doctors)
      })
  }

  openModal( doctor: Doctor ) {
    this.imageModalService.openModal( 'doctors', doctor._id, doctor.img )

  }

  deleteDoctor( doctor: Doctor ) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de eliminar a ${ doctor.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {

        this.doctorService.deleteDoctor( doctor._id )
          .subscribe( resp => {
            this.loadDoctors()
            Swal.fire(
              'Doctor borrado',
              `${ doctor.name } fue eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }

}
