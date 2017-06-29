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
  fetch('/api/v1/categories', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
          prependCardTwo(list)
          closeDropDown()
        })
      })
    }else{
      folderTitle.html(folderInput.val())
    }
  })
})
