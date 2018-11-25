import { Component, ɵrenderComponent as renderComponent } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `<h1>Hello World. {{ name }}</h1>`
})
export class HelloWorldComponent {

  name = "Arjay";

}

const host = document.createElement('hello-world');
document.body.appendChild(host);

renderComponent(HelloWorldComponent, { host });