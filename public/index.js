if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      //console.log( registration) to find out more;
      console.log('Success')
    })
    .catch(error => {
      console.log('Failure')
    })
  })
}
