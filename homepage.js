const URL = 'https://striveschool-api.herokuapp.com/api/product/'

window.onload = () => {
  handleFetch()
  isLoading(true)
}

const isLoading = (bool) => {
  const loader = document.querySelector('.spinner-border')
  if (bool) {
    loader.classList.remove('d-none')
  } else {
    loader.classList.add('d-none')
  }
}

const handleFetch = async () => {
  try {
    const resp = await fetch(URL, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQzYzdmMzA0NjAwMWFlNTlmNTQiLCJpYXQiOjE3MTI5MTE2NzUsImV4cCI6MTcxNDEyMTI3NX0.C8bU5RgOGzPu58Nd1aALChYC4dv0S1O6fCcsDcL7U08',
      },
    })
    const products = await resp.json()
    createListProduct(products)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading(false)
  }
}

const createListProduct = (products) => {
  const ul = document.querySelector('.list-group')
  products.forEach((product) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'gap-2')
    li.innerHTML = `<span class="me-auto">${product.name}</span> 
                    <a href="./backoffice.html?productId=${product['_id']}">
                    <button type="button" class="btn btn-outline-primary">Edit</button></a>
                    <a href="./details.html?productId=${product['_id']}">Find Out More</a>`
    ul.appendChild(li)
  })
}
