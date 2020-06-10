import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef

  // tslint:disable-next-line: no-input-rename
  @Input('valueLegend') legend = 'Legend'
  @Input() percentage = 50

  @Output() valueChange: EventEmitter<number> = new EventEmitter()

  constructor() {
    // console.log('legend', this.legend)
    // console.log('percentage', this.percentage)
  }

  ngOnInit(): void {
  }

  onChanges( newValue: number ) {

    if ( newValue >= 100 ) {
      this.percentage = 100
    } else if ( newValue <= 0 ) {
      this.percentage = 0
    } else {
      this.percentage = newValue
    }

    this.txtProgress.nativeElement.value = this.percentage

    this.valueChange.emit( this.percentage )
  }

  changeValue( value: number ) {

    if ( this.percentage >= 100 && value > 0 ) {
      this.percentage = 100
      return
    }
    if ( this.percentage <= 0 && value < 0 ) {
      this.percentage = 0
      return
    }

    this.percentage = this.percentage + value
    this.valueChange.emit( this.percentage )

    this.txtProgress.nativeElement.focus()
  }

}
