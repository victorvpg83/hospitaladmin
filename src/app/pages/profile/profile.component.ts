import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup
  public user: User
  public imageToUpload: File
  public imgTemp: any = null

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private fileUploadService: FileUploadService ) {
    this.user = userService.user
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required ],
      email: [ this.user.email, [ Validators.required, Validators.email ] ],
    })

  }

  updateProfile() {
    this.userService.updateProfile( this.profileForm.value )
      .subscribe( resp => {
        const { name, email } = this.profileForm.value
        this.user.name = name
        this.user.email = email

        Swal.fire( 'Guardado', 'Cambios guardados correctamente', 'success' )

      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' )
      })
  }

  changeImage( file: File ) {
    this.imageToUpload = file

    if ( !file ) {
      return this.imgTemp = null
    }

    const reader = new FileReader()
    reader.readAsDataURL( file )

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

  uploadImage() {
    this.fileUploadService.updateImage( this.imageToUpload, 'users', this.user.uid )
      .then( img => {
        this.user.img = img
        Swal.fire( 'Guardado', 'Imagen de usuario actualizada', 'success' )
      })
      .catch( err => {
        Swal.fire( 'Error', 'No se pudo guardar la imagen', 'error' )
        console.log(err)
      })
  }

}
