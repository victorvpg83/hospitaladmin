import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription

  constructor() {


    this.subscription = this.returnObs()
      .subscribe(
        num => console.log('subs ', num),
        error => console.error('Error en el obs', error),
        () => console.log('El observador terminó')

    )

   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  returnObs(): Observable<any> {

    return new Observable( observer => {

      let counter = 0

      const interval = setInterval( () => {

        counter++

        const outer = {
          value: counter
        }

        observer.next( outer )

        // if ( counter === 3 ) {
        //   clearInterval( interval )
        //   observer.complete()
        // }


      }, 1000)

    }).pipe(
      map( (resp: any) =>  resp.value ),
      filter( ( value, index ) => {
        return ( (value % 2) === 1 ) ? true : false
      })
    )


  }

}
