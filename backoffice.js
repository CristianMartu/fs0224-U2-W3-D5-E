const params = new URLSearchParams(window.location.search)
const id = params.get('productId')
const URL = id
  ? 'https://striveschool-api.herokuapp.com/api/product/' + id
  : 'https://striveschool-api.herokuapp.com/api/product/'
const method = id ? 'PUT' : 'POST'

const form = document.querySelector('form')

window.onload = () => {
  if (id) {
    changeDom()
    handleFetchType('GET')
  } else {
    form.addEventListener('submit', handleSubmit)
  }
  const btnReset = document.querySelector('.reset')
  btnReset.addEventListener('click', () => {
    const confirmed = confirm(
      'This cannot be undone, are you sure you wish to reset?'
    )
    if (confirmed) {
      form.reset()
    }
  })
}

const handleSubmit = (event) => {
  event.preventDefault()

  const newProducts = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    brand: document.getElementById('brand').value,
    imageUrl: document.getElementById('imageUrl').value,
    price: document.getElementById('price').value,
  }
  handleFetch(newProducts)
}

const handleFetch = async (product) => {
  try {
    const resp = await fetch(URL, {
      method,
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQzYzdmMzA0NjAwMWFlNTlmNTQiLCJpYXQiOjE3MTI5MTE2NzUsImV4cCI6MTcxNDEyMTI3NX0.C8bU5RgOGzPu58Nd1aALChYC4dv0S1O6fCcsDcL7U08',
      },
    })
    const products = await resp.json()
    successFetch(true)
    if (!id) {
      form.reset()
    } else {
      window.location.assign('./homepage.html')
    }
  } catch (error) {
    console.log(error)
  }
}

const changeDom = () => {
  const btnSubmit = document.querySelector("button[type='submit']")
  const delBtn = document.querySelector('.btn-danger')
  const subtitle = document.getElementById('subtitle')

  subtitle.innerText = '— Edit product'
  btnSubmit.innerText = 'EDIT'
  delBtn.addEventListener('click', () => {
    const confirmed = confirm('Do you really want to delete the product?')
    if (confirmed) {
      handleFetchType('DELETE')
    }
  })
  delBtn.classList.remove('d-none')
}

const handleFetchType = async (typeMethod) => {
  try {
    const resp = await fetch(URL, {
      method: typeMethod,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQzYzdmMzA0NjAwMWFlNTlmNTQiLCJpYXQiOjE3MTI5MTE2NzUsImV4cCI6MTcxNDEyMTI3NX0.C8bU5RgOGzPu58Nd1aALChYC4dv0S1O6fCcsDcL7U08',
      },
    })
    const product = await resp.json()
    successFetch(true)
    if (typeMethod === 'GET') {
      getData(product)
    } else {
      alert('Resource: ' + product.name + ' Successfully deleted!')
      window.location.assign('./homepage.html')
    }
  } catch (error) {
    console.log(error)
  }
}

const getData = (product) => {
  const { name, description, brand, imageUrl, price } = product
  document.getElementById('name').value = name
  document.getElementById('description').value = description
  document.getElementById('brand').value = brand
  document.getElementById('imageUrl').value = imageUrl
  document.getElementById('price').value = price
  form.addEventListener('submit', handleSubmit)
}

const deleteData = (product) => {
  alert('Resource: ' + product.name + ' Successfully deleted!')
  window.location.assign('./homepage.html')
}

const successFetch = (bool) => {
  const loader = document.querySelector('.alert')
  if (bool) {
    loader.classList.remove('d-none')
  } else {
    loader.classList.add('d-none')
  }
}
