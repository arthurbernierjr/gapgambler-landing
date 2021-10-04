const mainForm = document.querySelector('#main-form')
const emailField = document.querySelector('#email')
mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetch('/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailField.value
    })
  }).then((response)=>{
    return response.json()
  }).then((data) => {
     mainForm.innerHTML = `<h2 style="text-align: center; letter-spacing: .25rem; color: white;"> Thankyou For Subscribing </h2>`
  })
})
