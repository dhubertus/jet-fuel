const sortList = (type,list) => {
  let sortedList;
   if(type == "date") {
      sortedList = list.sort((a,b) =>{
      return a.created_at > b.created_at
    })
  } else if (type =="Most Popular") {
      sortedList = list.sort((a,b) => {
      return a.visits - b.visits
    })
  } else {
      sortedList = list.sort((a,b) => {
      return b.visits - a.visits
    })
 }

  return sortedList
}

$("#card-holder").on("click", (e) => {
  const parent = e.target.closest("a")
  const urlShort = parent.innerHTML
    if(!urlShort){
    return null
   }
   fetch("/api/v1/url/visit", {
     method:"PUT",
     headers:{"Content-Type": "application/json"},
     body:JSON.stringify({
       shortenedUrl:urlShort
    })
  })
})

const categoryApi = (input,calltype) => {
  const folderTitle = $("#folder-title")
    fetch("/api/v1/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder: input
      })
    })
    .then((res) => res.json())
    .then((obj) => {
      if(obj.name === "error") {
        fetch(`/api/v1/single-folder?folder=${input}`)
          .then((res) => res.json())
          .then((obj) => {
            folderTitle.html(obj[0].folder)
            fetch(`/api/v1/folder-urls?id=${obj[0].id}`)
            .then(list => list.json())
            .then(list => {
              if( calltype === "drop" ) {
                closeDropDown()
              }
              // calltype === "drop"? closeDropDown():null
              if(calltype ==="Most Popular"|| "Least Popular"||"date"){
                 prependCardTwo(sortList(calltype,list))
                 return null
              }
              prependCardTwo(list)
            })
          })
      } else {
      folderTitle.html(folderInput.val())
      $("#card-holder").empty()
    }
  })
}


//NOTE: current iteration of search functionality <-- not yet functioning properly

// $('#search-url').on('keyup',(e) => {
//   const array = $('.single-card').find("h4")
//
//   array.filter(stuff => {
//     const cardTitle = array[stuff].innerHTML
//     let show = true;
//     const searchValue = e.target.value
//     const leng = searchValue.length
//
//     if(searchValue.slice(leng)=== cardTitle.slice(leng)
//        && leng <= cardTitle.length){
//       console.log(cardTitle,"cooo")
//     }
//
//     for(var j = 0; j <e.target.value.length;j++){
//       if(cardTitle[j]===e.target.value[j]){
//         console.log(j,"j")
//         console.log(cardTitle[j],"title")
//         console.log(e.target.value,"e")
//         show = false
//       }
//     }
//     console.log(show,"SHOW")
//   })
// })
