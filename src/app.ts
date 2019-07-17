import { Component, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";
import wrap from './wrapper'

@Component({
  selector: "hello-name",
  templateUrl: './app.html',
  styles: [ './app.css'  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HelloNameComponent {
  
  @Input() name: string = "World";
  @Input() count: number = 0;

  @Output() increment = new EventEmitter()

  onIncrement(evt: any) {
    this.increment.emit(this.count)
  }

  updateName(newName: string) {
    this.name = newName
  }

}

customElements.define('hello-name', wrap(HelloNameComponent))