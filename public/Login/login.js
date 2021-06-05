async function posting() {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  if (username.length > 0 && password.length > 0) {
    const data = {username, password}

    const responseFlow = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const jsonData = await responseFlow.json()

    document.querySelector('.user-info').innerHTML = JSON.stringify(jsonData)
  }
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "submit":
      posting()
      break
  }
})