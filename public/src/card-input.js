const d     = new Date()
const month = d.getMonth()+1
const day   = d.getDate()
const year  = d.getFullYear()
const ACCESS_TOKEN = 'ad6420e4b76dd1083ad965a0e4840952bb746972'
$('.url-btn').on('click', () => {
const base_url = `https://api-ssl.bitly.com/v3/link/lookup?url=http%3A%2F%2Fcnn.com%2F&access_token=${ACCESS_TOKEN}`
fetch(base_url)
.then(item => item.json())
.then(item => console.log(item,"item!!!!!!"))
.catch(err => console.log(err,"error"))




  return null
  console.log("WOOO");
  const title = $('.title-input').val()
  const url = $('.url-input').val()
  const parentId = $('#folder-title')
  let shortenedUrl = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ){
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
          url_shortened:shortenedUrl,
          updated_at: month+" "+day+" "+year,
          created_at: month+" "+day+" "+year
        })
      }
    )
    .then(obj => obj.json())
    .then(obj => {
      console.log(obj);
      fetch(`/api/v1/folder-urls?id=${obj[0]}`)
      .then(list => list.json())
      .then(list => console.log(list,"list!!!!"))

  })
  })
  .catch(err => console.log(err))
})
