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
 
    if (jsonData.message === "Success") {
      if (jsonData.user.role === "basic") {
        window.location = "http://localhost:9898/basicUser/basicUser.html";
      } else if (jsonData.user.role === "admin") {
        window.location = "http://localhost:9898/adminPage/adminPage.html?";
      }
    } else {
      document.querySelector('.user-info').textContent = ""
      document.querySelector('.user-info').textContent = JSON.stringify(jsonData)
    }
  }
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "submit":
      posting()
      break
  }
})