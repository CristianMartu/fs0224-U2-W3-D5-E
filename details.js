const params = new URLSearchParams(window.location.search)
const id = params.get('productId')
const URL = 'https://striveschool-api.herokuapp.com/api/product/' + id

window.onload = () => {
  handleGetFetch()
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
    createPage(product)
  } catch (error) {
    console.log(error)
  }
}

const createPage = (product) => {
  const div = document.getElementById('imageContainer')
  div.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img
                        src= ${product.imageUrl}
                        class="bd-placeholder-img card-img-top"
                        height = "400px"
                    />
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title fw-bold"><span class="fw-medium">Name:</span> ${product.name}</h5>
                        <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                        <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> ${product.price}€</p>
                        <h6 class="bg-light ps-2 py-2">Server Details</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item px-2"><strong>id:</strong> ${product.userId}</li>
                            <li class="list-group-item px-2"><strong>createdAt:</strong> ${product.createdAt}</li>
                            <li class="list-group-item px-2"><strong>updatedAt:</strong> ${product.updatedAt}</li>
                        </ul>
                    </div>
                </div>
                </div>
`
}
