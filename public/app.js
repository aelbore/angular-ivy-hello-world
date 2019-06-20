import { render, html } from 'https://unpkg.com/lit-html@1.1.1/lit-html.js'
import { getProfiles } from './profiles.js'

const { debounceTime, distinctUntilChanged } = rxjs.operators
const { of } = rxjs

const root = document.getElementById('app')

const cards = (profiles) => {
  return html `${profiles.map(profile => {
    return html `<ar-card .profile=${profile}></ar-card>`
  })}`
}

const onChange = (e) => {
  of(e.detail.value.toLowerCase())
  .pipe(
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(text => {
      const profiles = getProfiles().filter(profile => profile.name.toLowerCase().includes(text))
      render(app(profiles), root)
    });
}

const app = (profiles) => {
  return html `
    <ar-input placeholder="Search" @change=${onChange}></ar-input>
    <div class="cards">${cards(profiles)}</div>
  `
}

render(app(getProfiles()), root)