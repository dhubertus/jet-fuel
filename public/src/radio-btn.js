$('#most-popular-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()
  const filterType = $('#most-popular').html()

  categoryApi(selectedFolder,filterType)
})

$('#least-popular-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()
  const filterType =  $('#least-popular').html()

  categoryApi(selectedFolder,filterType)
})


$('#date-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()

  categoryApi(selectedFolder, 'date')
})
