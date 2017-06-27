
let fakeArray = [
  {title: 'yo', url: 'www.sup.com'},
  {title: 'hey', url: 'www.asfga.com'},
  {title: 'bro', url: 'www.dude.com'}
]

$('document').ready(() => {
  const cardHolder = $('#card-holder')

  fakeArray.forEach((obj, i) => {
    cardHolder.prepend(
      `<article class='single-card'>
        <h4>${obj.title}</h4>
        <a href='http://www.google.com' target='_blank'>${obj.url}</a>
      </article>`
    )
  })
})
