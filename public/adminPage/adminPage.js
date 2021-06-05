async function getUsers() {
  getAll()
}

getUsers()

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "delete-all":
      removeAllUsers()
      break
  }
})

async function removeAllUsers() {
  await fetch('http://localhost:9898/users', {
    method: "DELETE"
  })

  getAll()
}

async function getAll() {
  const responseFlow = await fetch('http://localhost:9898/users')
  const data = await responseFlow.json()

  document.querySelector('.users').innerHTML = ""

  for (user of data) {  
    const infoContainer = document.createElement('div')
    const pUsername = document.createElement('p')
    pUsername.textContent = user.username
    const pPassword = document.createElement('p')
    pPassword.textContent = user.username
    const pId = document.createElement('p')
    const hr = document.createElement('hr')
    pId.textContent = user._id
    infoContainer.append(pUsername, pPassword, pId, hr)
    document.querySelector('.users').append(infoContainer)
  } 
}