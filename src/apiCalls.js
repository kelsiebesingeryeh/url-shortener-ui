export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const createNewURL = (newURL) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newURL)
  }
  return (
    fetch("http://localhost:3001/api/v1/urls")
    .then(response => response.json())
  )
}

// add the post request here