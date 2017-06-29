$('#popularity-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()
  fetch('/api/v1/categories', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visits:0,
      folder: selectedFolder })
  })
  .then((res) => res.json())
  .then((obj) => {
    if(obj.name === 'error') {
      fetch(`/api/v1/single-folder?folder=${ selectedFolder }`)
        .then((res) => res.json())
        .then((obj) => {
          folderTitle.html(obj[0].folder)
          fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
          .then(list => list.json())
          .then(list => {
            const sortList = list.sort((a,b)=>{
              return a.visits - b.visits
            })
            prependCardTwo(sortList)
          })
          .catch(err => console.log(err))
        })
    } else {
      folderTitle.html(folderInput.val())
    }
  })
})

$('#date-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()
  fetch('/api/v1/categories', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visits:0,
      folder: selectedFolder })
  })
  .then((res) => res.json())
  .then((obj) => {
    if(obj.name === 'error') {
      fetch(`/api/v1/single-folder?folder=${ selectedFolder }`)
        .then((res) => res.json())
        .then((obj) => {
          folderTitle.html(obj[0].folder)
          fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
          .then(list => list.json())
          .then(list => {
            const sortList = list.sort((a,b)=>{
              return a.created_at > b.created_at
            })
            prependCardTwo(sortList)
          })
          .catch(err => console.log(err))
        })
    } else {
      folderTitle.html(folderInput.val())
    }
  })
  .catch(err => console.log(err))
})
