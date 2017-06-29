const prependSingleCard = (array) => {
    $('#card-holder').empty()
  array.forEach((obj, i) => {
    $('#card-holder').prepend(
      `<article id='${Date.now()} ${5}' class='single-card'>
        <h4>${obj.title}</h4>
        <a href='${obj.url}' target='_blank'>${obj.url_shortened}</a>
      </article>`
    )
  })
}

$('.url-btn').on('click', () => {
  const title = $('.title-input').val()
  const url = $('.url-input').val()
  const parentId = $('#folder-title')
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortenedUrl = "";

  for( var i=0; i < 8; i++ ){
    shortenedUrl += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  fetch(`/api/v1/single-folder?folder=${parentId.html()}`)
  .then((res) => res.json())
  .then(obj => {
    fetch('http://localhost:3000/api/v1/url',{
      method:"POST",
      headers:{"Content-Type": "application/json"},
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
      })
    })
  })
})
