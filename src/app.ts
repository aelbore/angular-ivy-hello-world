import { Component, ɵrenderComponent as renderComponent } from '@angular/core';

@Component({ 
  selector: 'hello-world', 
  template: 'Hello World' 
})
class HelloWorld { }

renderComponent(HelloWorld);