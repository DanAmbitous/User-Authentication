async function getUsers() {
  getAll()
}

getUsers()

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "delete-all":
      removeAllUsers()
      break
    case "edit-user-button":
      editUser()
      break
    case "get-specific-user-button":
      getSpecificUser()
      break
    case "delete-specific-user-button":
      deleteSpecificUser()
      break
  }
})

async function deleteSpecificUser() {
  const responseFlow = await fetch(`http://localhost:9898/users/${document.querySelector('#delete-specific-user').value}`)
  const data = await responseFlow.json()

  const userInfoContainer = document.createElement('div')
  const username = document.createElement('h3')
  username.innerHTML = JSON.stringify(data.username)
  const id = document.createElement('p')
  id.innerHTML = JSON.stringify(data._id)
  const role = document.createElement('p')
  role.innerHTML = JSON.stringify(data.role)
  userInfoContainer.append(username, role, id)

  document.querySelector('.delete-the-user').append(userInfoContainer)

  await fetch(`http://localhost:9898/users/${document.querySelector('#delete-specific-user').value}`, {
    method: 'DELETE'
  })
}

async function getSpecificUser() {
  const responseFlow = await fetch(`http://localhost:9898/users/${document.querySelector('#get-specific-user').value}`)
  const data = await responseFlow.json()

  document.querySelector('.get-the-user').innerHTML = ""

  if (data.role == null) {
    document.querySelector('.get-the-user').textContent = `User with an id of ${document.querySelector('#get-specific-user').value} doesn't exist.`
  } else {
    const userInfoContainer = document.createElement('div')
    const username = document.createElement('h3')
    username.innerHTML = JSON.stringify(data.username)
    const id = document.createElement('p')
    id.innerHTML = JSON.stringify(data._id)
    const role = document.createElement('p')
    role.innerHTML = JSON.stringify(data.role)
    userInfoContainer.append(username, role, id)
  
    document.querySelector('.get-the-user').append(userInfoContainer)
  }
}

async function editUser() {
  const username = document.querySelector('#edit-user-username').value
  const role = document.querySelector('#role').value

  const data = {username, role}

  await fetch(`http://localhost:9898/users/${document.querySelector("#edit-user").value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  getAll()
}

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
    pUsername.innerHTML = user.username
    const pId = document.createElement('p')
    const hr = document.createElement('hr')
    const role = document.createElement('p')
    role.innerHTML = user.role
    const br = document.createElement('br')
    const br2 = document.createElement('br')
    pId.textContent = user._id
    infoContainer.append(`Username: ${pUsername.innerHTML}`, br, `Role: ${role.innerHTML}`, br2,`id: ${pId.innerHTML}`, hr)
    document.querySelector('.users').append(infoContainer)
  } 
}