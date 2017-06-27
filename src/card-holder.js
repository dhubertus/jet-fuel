//NOTE: will be fetch
let fakeArray = [
  {title: 'yo', url: 'www.sup.com'},
  {title: 'hey', url: 'www.asfga.com'},
  {title: 'bro', url: 'www.dude.com'}
]

const cardHolder = $('#card-holder')

$('#thing').on('click', () => {
  //NOTE: POST TO SERVER
  const newObj = {title: 'yo', url: 'www.sup.com'}
  fakeArray.push(newObj)
  //NOTE: PLACE ON PAGE
  prependNewCard(newObj.title, newObj.url)
})

$('document').ready(() => {
  fakeArray.forEach((obj, i) => {
    prependNewCard(obj.title, obj.url)
  })
})

const prependNewCard = (title, url) => {
  cardHolder.prepend(
    `<article id='${Date.now()} ${5}' class='single-card'>
      <h4>${title}</h4>
      <a href='${'http://www.google.com'}' target='_blank'>${url}</a>
    </article>`
  )
}
