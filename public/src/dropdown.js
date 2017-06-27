let toggleDropdown = () => {
  let dropdown = $('#dropdown-item-holder')

  dropdown.toggleClass('show')
}

$('.dropbtn').on('click', () => {
  toggleDropdown()
})
