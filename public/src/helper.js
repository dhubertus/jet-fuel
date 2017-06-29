$('#card-holder').on('click', (e) => {
  const parent = e.target.closest('a')
  const urlShort = parent.innerHTML
    if(!urlShort){
    return null
   }
   fetch('/api/v1/url/visit', {
     method:"PUT",
     headers:{"Content-Type": "application/json"},
     body:JSON.stringify({
       shortenedUrl:urlShort
     })
   })
})

fetchCategory(input,sortType){
    fetch('/api/v1/categories', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder: input
      })
    })
    .then((res) => res.json())
    .then((obj) => {
      if(obj.name === 'error') {
        fetch(`/api/v1/single-folder?folder=${folderInput.val()}`)
          .then((res) => res.json())
          .then((obj) => {
            folderTitle.html(obj[0].folder)
            fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
            .then(list => list.json())
            .then(list => {
              prependCardTwo(list)
            })
          })
      }else{
      folderTitle.html(folderInput.val())
    }
  })
}

/////////createFolder.js
// createFolderBtn.on('click', () => {
//   fetch('/api/v1/categories', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       folder: folderInput.val() })
//   })
//   .then((res) => res.json())
//   .then((obj) => {
//     if(obj.name === 'error') {
//       fetch(`/api/v1/single-folder?folder=${folderInput.val()}`)
//         .then((res) => res.json())
//         .then((obj) => {
//           folderTitle.html(obj[0].folder)
//           fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
//           .then(list => list.json())
//           .then(list => {
//             prependCardTwo(list)
//           })
//         })
//     }else{
//       folderTitle.html(folderInput.val())
//     }
//   })
// })


/////// dropdown
// $('#dropdown-item-holder').on('click', (e) => {
//   const selectedFolder = e.target.closest('h6').innerHTML
//   fetch('/api/v1/categories', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       folder: selectedFolder })
//   })
//   .then((res) => res.json())
//   .then((obj) => {
//     if(obj.name === 'error') {
//       fetch(`/api/v1/single-folder?folder=${ selectedFolder }`)
//       .then((res) => res.json())
//       .then((obj) => {
//         folderTitle.html(obj[0].folder)
//         fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
//         .then(list => list.json())
//         .then(list => {
//           prependCardTwo(list)
//           closeDropDown()
//         })
//       })
//     }else{
//       folderTitle.html(folderInput.val())
//     }
//   })
// })

////////radio-btn

// fetch('/api/v1/categories', {
//   method: 'POST',
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     visits:0,
//     folder: selectedFolder })
// })
// .then((res) => res.json())
// .then((obj) => {
//   if(obj.name === 'error') {
//     fetch(`/api/v1/single-folder?folder=${ selectedFolder }`)
//       .then((res) => res.json())
//       .then((obj) => {
//         folderTitle.html(obj[0].folder)
//         fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
//         .then(list => list.json())
//         .then(list => {
//           const sortList = list.sort((a,b)=>{
//             return a.visits - b.visits
//           })
//           prependCardTwo(sortList)
//         })
//         .catch(err => console.log(err))
//       })
//   } else {
//     folderTitle.html(folderInput.val())
//   }
// })
// })
