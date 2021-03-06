const folderInput = $('#folder-input')
const createFolderBtn = $('#create-folder-btn')
const folderTitle = $('#folder-title')

const prependCardTwo = (array) => {
  $('#card-holder').empty()
  array.forEach((obj, i) => {
    $('#card-holder').prepend(
      `<article id='${Date.now()} ${5}' class='single-card'>
        <h4>${obj.title}</h4>
        <a href='${obj.url}'>${obj.url_shortened}</a>
        <div id="visits-text">Number of visits: ${obj.visits}</div>
        <div>Created at : ${obj.created_at}</div>
      </article>`
    )
  })
}

createFolderBtn.on('click', () => {
 categoryApi(folderInput.val())
 $('.url-list').addClass('show')
})
