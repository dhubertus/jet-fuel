$('#popularity-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()

  categoryApi(selectedFolder,"popular")
})

$('#date-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()

  categoryApi(selectedFolder,"date")
})
