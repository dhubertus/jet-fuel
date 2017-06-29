const closeDropDown = () => {
  $('#dropdown-item-holder').toggleClass('show')
}
let toggleDropdown = (array) => {
  let dropdown = $('#dropdown-item-holder')
  dropdown.empty()
  array.forEach((obj, i) => {
    dropdown.prepend(
      `<div class='dropdown-item'>
        <h6>${obj.folder}</h6>
      </div>`
    )
  })

  dropdown.toggleClass('show')

}

$('.dropbtn').on('click', () => {
  fetch('/api/v1/categories')
    .then(list => list.json())
    .then(listArr => {
      toggleDropdown(listArr)
  })
})

$('#dropdown-item-holder').on('click', (e) => {
  const selectedFolder = e.target.closest('h6').innerHTML
  
  categoryApi(selectedFolder,"drop")
  $('.url-list').addClass('show')
})
