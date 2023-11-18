const accessKey = 'P4n1NsI5FqewVlrhbEDz6CkL-dt0Uu5A3jcrDom6hVo'

const formEl = document.querySelector('form')
const inputEl = document.querySelector('#Search-input')
const searchResult = document.querySelector('.search-result')
const showMore = document.getElementById('show-more-button')

let inputData = ""
let page = 1

async function searchImage() {
  inputData = inputEl.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url)
  const data = await response.json()
  const results = data.results
  if (page === 1) {
    searchResult.innerHTML = ""

  }
  results.map((result) => {
    // console.log(result)
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('search-image')
    const image = document.createElement('img')
    image.src = result.urls.small  // inneer page
    image.alt = result.alt_description
    const imageLink = document.createElement('a')
    imageLink.href = result.links.html;
    imageLink.target = "_blank"
    imageLink.textContent = result.alt_description // Pug dog in anchor tag

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });

  page++
  if (page > 1) {
    showMore.style.display = 'block'
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  searchImage()
})

showMore.addEventListener('click', () => {
  searchImage()
})