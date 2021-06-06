async function getAll() {
  const responseFlow = await fetch('http://localhost:9898/users')
  const data = await responseFlow.json()

  document.querySelector('#users').innerHTML = ""

  for (user of data) {  
    const infoContainer = document.createElement('div')
    const pUsername = document.createElement('p')
    pUsername.innerHTML = user.username
    const pId = document.createElement('p')
    const hr = document.createElement('hr')
    const br = document.createElement('br')
    pId.textContent = user._id
    infoContainer.append(`Username: ${pUsername.innerHTML}`, br, `id: ${pId.innerHTML}`, hr)
    document.querySelector('#users').append(infoContainer)
  } 
}

getAll()