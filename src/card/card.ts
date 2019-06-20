import { Component, ViewEncapsulation, Input } from '@angular/core'
import wrap from '../wrapper';

export class Profile {
  name?: string;
  profession?: string;
  motto?: string;
  photo?: string
}

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: [ './card.css' ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CardComponent {

  @Input() profile: Profile

  constructor() {
    this.profile = {
      name: '', profession: '', motto: '',
      photo: 'https://pymwoqn637.codesandbox.io/default.png'
    }
  }

}

customElements.define('ar-card', wrap(CardComponent))