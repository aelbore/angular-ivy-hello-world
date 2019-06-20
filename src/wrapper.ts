import { 
  ɵdetectChanges as detectChanges, 
  ɵrenderComponent as renderComponent, 
  ViewEncapsulation, 
  Type 
} from "@angular/core";

export default function wrap<T>(componentType: Type<T>) {
  /// @ts-ignore
  const { inputs, styles, encapsulation, outputs } = componentType.ngComponentDef

  function initProps(target: HTMLElement, component: T) {
    const keys = Object.keys(inputs)
    keys.forEach(key => {
      Object.defineProperty(target, key, {
        get() { component[key]; },
        set(value) {
          component[key] = value;
          detectChanges(component);
        }
      })
    })
  }

  function initEvents(target: HTMLElement, component: T) {
    const outputEvents = Object.keys(outputs)
    outputEvents.forEach(outputEvent => {
      component[outputs[outputEvent]].subscribe(info => {
        target.dispatchEvent(new CustomEvent(outputEvent, { detail: info }))
      })
    })
  }
  
  return class extends HTMLElement {
    private root: HTMLElement | ShadowRoot;
    private component: T

    constructor() {
      super();
      
      this.root = (encapsulation === ViewEncapsulation.ShadowDom)
         ? this.attachShadow({ mode: "open" }) : this;
      this.component = renderComponent(componentType, { host: this.root as any });

      initProps(this, this.component)
      initEvents(this, this.component)
    }

    static get observedAttributes() {
      return [...Object.keys(inputs)];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const attributes = Object.keys(inputs)
      if (attributes.includes(name)) {
        this[name] = newValue;
      }      
    }

    connectedCallback() {
      if (styles) {
        const style = document.createElement('style')
        style.textContent = styles.join('\n')
        this.root.prepend(style)
      }      
    }
  }
}