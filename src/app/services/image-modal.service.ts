import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  // tslint:disable-next-line: variable-name
  private _hideModal = true
  public id: string
  public type: 'users' | 'doctors' | 'hospitals'
  public img = ''

  public newImage: EventEmitter<string> = new EventEmitter<string>()

  get hideModal() {
    return this._hideModal
  }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img?: string
  ) {
    this._hideModal = false
    this.id = id
    this.type = type

    if ( !img ) {
      return this.img = `${ base_url }/upload/${ type }/no-image`
    }

    img.includes( 'https' ) ? this.img = img : this.img = `${ base_url }/upload/${ type }/${ img }`

    console.log(img)

    // this.img = img
  }

  closeModal() {
    this._hideModal = true
  }

  constructor() { }
}
