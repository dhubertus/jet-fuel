// const getFolderUrls = () => {
//
//   fetch('/api/v1/categories', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       visits:0,
//       folder: selectedFolder })
//   })
//   .then((res) => res.json())
//   .then((obj) => {
//     if(obj.name === 'error') {
//       fetch(`/api/v1/single-folder?folder=${ selectedFolder }`)
//         .then((res) => res.json())
//         .then((obj) => {
//           folderTitle.html(obj[0].folder)
//           fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
//           .then(list => list.json())
//           prom.then(list => {
//             prependCardTwo(list)
//             closeDropDown()
//           })
//         })
//     }else {
//       folderTitle.html(folderInput.val())
//     }
//   })
// }

$('#card-holder').on('click', (e) => {
  const parent = e.target.closest('a')
  const urlShort = parent.innerHTML
   fetch('/api/v1/url/visit', {
     method:"PUT",
     headers:{"Content-Type": "application/json"},
     body:JSON.stringify({
       shortenedUrl:urlShort
     })
   })
})
