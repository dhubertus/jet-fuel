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
 categoryApi(folderInput.val())
 // folderInput.val("") //affects unfortunatly the folders that are already created and doesn't render it propely for list and title
})
