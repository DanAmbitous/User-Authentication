async function posting() {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  if (username.length > 0 && password.length > 0) {
    const data = {username, password}

    await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "submit":
      posting()
      break
  }
})