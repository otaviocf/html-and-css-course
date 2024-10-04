const button = document.querySelector('button')
window.addEventListener('DOMContentLoaded', getUser)
button.addEventListener('click', getUser)


async function getUser() {
  const response = await fetch('https://randomuser.me/api')
  const data = await response.json()
  const results = data.results[0]
  const userObject = {
    name: `${results.name.first} ${results.name.last}`,
    email: results.email,
    phone: results.phone,
    location: `${results.location.city}, ${results.location.country}`,
    age: results.dob.age,
    pfp: results.picture.large,
    gender: results.gender
  }

  function setUser(userObject) {
  // Bring in elements
  const pfp = document.querySelector('img')
  const name = document.querySelector('#name')
  const email = document.querySelector('#email')
  const phone = document.querySelector('#phone')
  const location = document.querySelector('#location')
  const age = document.querySelector('#age')
  
  
  // Set content
  pfp.setAttribute('src', userObject.pfp)
  name.textContent = userObject.name
  email.textContent = userObject.email
  phone.textContent = userObject.phone
  location.textContent = userObject.location
  age.textContent = userObject.age

  // Change background color based on gender
  if (userObject.gender === 'male') {
    document.body.style.backgroundColor = '#4287fc'
  } else {
    document.body.style.backgroundColor = '#ff58fd'
  }
  }

  setUser(userObject)
}
