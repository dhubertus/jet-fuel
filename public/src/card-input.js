const ACCESS_TOKEN = 'ad6420e4b76dd1083ad965a0e4840952bb746972'


$('.url-btn').on('click', () => {
  const title = $('.title-input').val()
  const url = $('.url-input').val()
  const parentId = $('#folder-title')
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortenedUrl = "";
  let domain;
  let bitly;

  for( var i=0; i < 5; i++ ){
    shortenedUrl += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  if(url.slice(0,5)==="https"){
    domain = url.slice(8,url.length)
  }else if(url.slice(0,4)==="http"){
    domain = url.slice(7,url.length)
  }else{
    domain = url
  }

const base_url = `https://api-ssl.bitly.com/v3/link/lookup?url=http%3A%2F%2F${domain}%2F&access_token=${ACCESS_TOKEN}`
fetch(base_url)
.then(item => item.json())
.then(item => bitly = item.data.link_lookup[0].aggregate_link || "error")
.then(() => {
    if(bitly==="error"){
      alert("excuse me sah! please place a full http://url address where needed! ")
      return null
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
        url_shortened:bitly
      })
    }
  )
  .then(obj => obj.json())
  .then(obj => {
    fetch(`/api/v1/folder-urls?id=${obj[0]}`)
    .then(list => list.json())
    .then(list => console.log(list,"list!!!!"))
   })
  })
 })
})
