import { ɵdetectChanges as detectChanges, ɵrenderComponent as renderComponent, ViewEncapsulation, Type } from "@angular/core";

export default function wrap<T>(componentType: Type<T>) {
  /// @ts-ignore
  const { inputs, styles, encapsulation, outputs } = componentType.ngComponentDef
  
  return class extends HTMLElement {
    private root: HTMLElement | ShadowRoot;
    private component: T

    constructor() {
      super();
      
      this.root = (encapsulation === ViewEncapsulation.ShadowDom)
         ? this.attachShadow({ mode: "open" }) : this;
      this.component = renderComponent(componentType, { host: this.root as any });
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
      const keys = Object.keys(inputs)
      keys.forEach(key => {
        Object.defineProperty(this, key, {
          get() { return this.component[key]; },
          set(value) {
            this.component[key] = value;
            detectChanges(this.component);
          }
        })
      })

      const outputEvents = Object.keys(outputs)
      outputEvents.forEach(outputEvent => {
        this.component[outputEvent].subscribe(info => {
          this.dispatchEvent(new CustomEvent(outputEvent, { detail: info }))
        })
      })

      if (styles) {
        const style = document.createElement('style')
        style.textContent = styles.join('\n')
        this.root.prepend(style)
      }      
    }
  };
}