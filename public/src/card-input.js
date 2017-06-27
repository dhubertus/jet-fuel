const d     = new Date()
const month = d.getMonth()+1
const day   = d.getDate()
const year  = d.getFullYear()

$('.url-btn').on('click', () => {
  const title = $('.title-input').val()
  const url = $('.url-input').val()


  fetch('http://localhost:3000/api/v1/url',{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({
      title:title,
      url:url,
      url_shortened:"blah",
      updated_at: month+" "+day+" "+year,
      created_at: month+" "+day+" "+year
    })
     }
  )
  .then(res => console.log(res,"wooo"))
})




//     knex.schema.createTable('url', function(table) {
//       table.increments('id').primary();
//       table.string('title');
//       table.string('url');
//       table.integer('visits')
//       table.string('url_shortened');
//       table.integer('categories_id').unsigned()
//       table.foreign('categories_id')
//       .references('categories.id');
//       table.timestamps(true);
//     })
//   ])
// };
