const folderInput = $('#folder-input')
const createFolderBtn = $('#create-folder-btn')
const folderTitle = $('#folder-title')
let currentlyClicked = ''

createFolderBtn.on('click', () => {
  //on submit if folder already exisits return the folder
  //else create the folder
  //then set current viewiing to create folder

  fetch('/api/v1/categories', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visits:0,
      folder: folderInput.val() })
  })
  .then((res) => res.json())
  .then((obj) => {
    if(obj.name === 'error') {
      fetch(`/api/v1/single-folder?folder=${folderInput.val()}`)
        .then((res) => res.json())
        .then((obj) => {
          folderTitle.html(obj[0].folder)
          console.log('folder', obj[0])
        })
    } else {
      console.log('added');
      folderTitle.html(folderInput.val())
    }
  })


})
