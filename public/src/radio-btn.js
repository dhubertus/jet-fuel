$('#most-popular-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()
  const filterType = $('#most-popular').html()
  console.log(filterType)
  console.log()

  categoryApi(selectedFolder,filterType)
})

$('#least-popular-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()
  const filterType =  $('#least-popular').html()
  console.log(filterType)
  categoryApi(selectedFolder,filterType)
})



$('#date-filter').on('click',(e) => {
  const selectedFolder = $('#folder-title').html()

  categoryApi(selectedFolder,"date")
})
