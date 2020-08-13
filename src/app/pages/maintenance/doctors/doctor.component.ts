import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Doctor } from '../../../models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup
  public hospitals: Hospital[] = []

  public selectedDoctor: Doctor
  public selectedHospital: Hospital

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private doctorService: DoctorService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => this.loadDoctor( id ) )

    this.loadHospitals()

    this.doctorForm = this.fb.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    })

    this.doctorForm.get( 'hospital' ).valueChanges
      .subscribe( hospitalId => this.selectedHospital = this.hospitals.find( h => h._id === hospitalId) )

  }

  loadDoctor( id: string ) {

    if ( id === 'new' ) { return }

    this.doctorService.getDoctorById( id )
      .pipe(
        delay(100)
      )

      .subscribe( doctor => {

        if ( !doctor ) {
          return this.router.navigateByUrl( `/doctors` )
        }

        const { name, hospital: { _id } } = doctor
        this.selectedDoctor = doctor
        this.doctorForm.setValue( { name, hospital: _id } )
      })
  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
      .subscribe( (hospitals: Hospital[]) => this.hospitals = hospitals )
  }

  saveDoctor() {

    const { name } = this.doctorForm.value

    if (this.selectedDoctor) {

      // Update doctor
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }
      this.doctorService.updateDoctor( data )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', `Doctor ${ name } actualizado correctamente`, 'success' )
        })

    } else {
      // Create Doctor

      this.doctorService.createDoctor( this.doctorForm.value )
        .subscribe( ( resp: any ) => {
          Swal.fire( 'Añadido', `Doctor ${ name } añadido correctamente`, 'success' )
          this.router.navigateByUrl( `/doctor/${ resp.doctor._id }` )
        })
    }


  }

}
