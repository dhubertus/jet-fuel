const prependSingleCard = (array) => {
    $('#card-holder').empty()
  array.forEach((obj) => {
    $('#card-holder').prepend(
      `<article id='${Date.now()} ${5}' class='single-card'>
        <h4>${obj.title}</h4>
        <a href='${obj.url_shortened}'>${obj.url_shortened}</a>
        <div>Number of visits: ${obj.visits}</div>
        <div>Created at : ${obj.created_at}</div>
      </article>`
    )
  })
}

$('.url-btn').on('click', () => {
  const title = $('.title-input').val()
  let url = $('.url-input').val()
  const parentId = $('#folder-title')
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortenedUrl = '';
  const endResult = (url.includes('.com')||url.includes('.org')||url.includes('.gov')||url.includes('.edu')||url.includes('.net')||url.includes('.io'))
  const httpResult =  (url.includes('http://') || url.includes('https://'))
  const wwwResult = url.includes('www')

  if(!title){
    alert('please include a title')
  }

  if(!endResult || !url){
    alert('pleases insert correct full url: example(https://github.com)')
    return null
  }

  if(!httpResult && wwwResult){
      url =  `http://${url}`
  }

  if(!httpResult && !wwwResult){
      url = `http://www.${url}`
  }

  for( var i=0; i < 8; i++ ){
    shortenedUrl += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  fetch(`/api/v1/single-folder?folder=${parentId.html()}`)
  .then((res) => res.json())
  .then(obj => {
    fetch('/api/v1/url',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        categories_id: obj[0].id,
        title:title,
        url:url,
        url_shortened:`www.jetfuel/${shortenedUrl}.com`,
        visits:0
        })
      }
    )
    .then(obj => obj.json())
    .then(obj => {
      fetch(`/api/v1/folder-urls?id=${obj[0]}`)
      .then(list => list.json())
      .then(list => {
        prependSingleCard(list)
        const title = $('.title-input').val('')
        const url = $('.url-input').val('')
      })
    })
  })
})
