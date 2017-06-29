const folderInput = $('#folder-input')
const createFolderBtn = $('#create-folder-btn')
const folderTitle = $('#folder-title')
let currentlyClicked = ''

const prependCardTwo = (array) => {
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


createFolderBtn.on('click', () => {
  //on submit if folder already exisits return the folder
  //else create the folder
  //then set current viewiing to create folder
console.log(folderInput)
  fetch('/api/v1/categories', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      folder: folderInput.val() })
  })
  .then((res) => res.json())
  .then((obj) => {
    if(obj.name === 'error') {
      fetch(`/api/v1/single-folder?folder=${folderInput.val()}`)
        .then((res) => res.json())
        .then((obj) => {
          console.log(obj);
          folderTitle.html(obj[0].folder)
          fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
          .then(list => list.json())
          .then(list => {
            prependCardTwo(list)
          })
        })
    } else {
      folderTitle.html(folderInput.val())
    }
  })


})
