import { Component, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";
import wrap from './wrapper'

@Component({
  selector: "hello-name",
  template: `
    <h1>Hello {{ name }}</h1>
    <h2>Count {{ count }}</h2>
    
    <button (click)="onIncrement($event)">Increment</button>
  `,
  styles: [`
    h1 { 
      color: var(--h1-color, red) 
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HelloNameComponent {
  
  @Input() name: string = "World";
  @Input() count: number = 0;

  @Output() increment = new EventEmitter()

  onIncrement(evt: any) {
    this.increment.emit(this.count)
  }

}

customElements.define('hello-name', wrap(HelloNameComponent))