const params = new URLSearchParams(window.location.search)
const id = params.get('productId')
const URL = id
  ? 'https://striveschool-api.herokuapp.com/api/product/' + id
  : 'https://striveschool-api.herokuapp.com/api/product/'
const method = id ? 'PUT' : 'POST'

const form = document.querySelector('form')

window.onload = () => {
  if (id) {
    console.log('Edit product')
    changeDom()
    handleGetFetch()
  } else {
    console.log('New product')

    form.addEventListener('submit', handleSubmit)
  }
  const btnReset = document.querySelector('.reset')
  btnReset.addEventListener('click', () => {
    form.reset()
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
  if (!id) {
    form.reset()
  } else {
    window.location.assign('./homepage.html')
  }
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
  delBtn.addEventListener('click', handleDelete)
  delBtn.classList.remove('d-none')
}

const handleGetFetch = async () => {
  try {
    const resp = await fetch(URL, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQzYzdmMzA0NjAwMWFlNTlmNTQiLCJpYXQiOjE3MTI5MTE2NzUsImV4cCI6MTcxNDEyMTI3NX0.C8bU5RgOGzPu58Nd1aALChYC4dv0S1O6fCcsDcL7U08',
      },
    })
    const product = await resp.json()
    const { name, description, brand, imageUrl, price } = product
    document.getElementById('name').value = name
    document.getElementById('description').value = description
    document.getElementById('brand').value = brand
    document.getElementById('imageUrl').value = imageUrl
    document.getElementById('price').value = price
    form.addEventListener('submit', handleSubmit)
  } catch (error) {
    console.log(error)
  }
}

const handleDelete = async () => {
  try {
    const resp = await fetch(URL, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQzYzdmMzA0NjAwMWFlNTlmNTQiLCJpYXQiOjE3MTI5MTE2NzUsImV4cCI6MTcxNDEyMTI3NX0.C8bU5RgOGzPu58Nd1aALChYC4dv0S1O6fCcsDcL7U08',
      },
    })
    const product = await resp.json()
    alert('Resource: ' + product.name + ' Successfully deleted!')
    window.location.assign('./homepage.html')
  } catch (error) {
    console.log(error)
  }
}
