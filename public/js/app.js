const form = document.querySelector('form')
const search = document.querySelector('input')

const msgOne = document.getElementById('msgOne')
const msgTwo = document.getElementById('msgTwo')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  msgOne.textContent = 'loading...'
  msgTwo.textContent = ''

  fetch(`/weather?address=${location}`)
    .then(r => {
      r.json()
        .then(data => {
          if (data.error) {
            msgOne.textContent = `${data.error}`
          } else {
            msgOne.textContent = `${data.location}`
            msgTwo.textContent = `${data.forecast.temp}`
          }
        })
    })
})