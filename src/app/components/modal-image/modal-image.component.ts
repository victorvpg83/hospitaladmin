import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ImageModalService } from '../../services/image-modal.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: []
})
export class ModalImageComponent implements OnInit {

  public imageToUpload: File
  public imgTemp: any = null

  constructor( public imageModalService: ImageModalService,
               public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null
    this.imageModalService.closeModal()
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

    const id = this.imageModalService.id
    const type = this.imageModalService.type

    this.fileUploadService.updateImage( this.imageToUpload, type, id )
      .then( img => {
        Swal.fire( 'Guardado', 'Imagen de usuario actualizada', 'success' )

        this.imageModalService.newImage.emit(img)

        this.closeModal()
      })
      .catch( err => {
        Swal.fire( 'Error', 'No se pudo guardar la imagen', 'error' )
        console.log(err)
      })
  }

}
