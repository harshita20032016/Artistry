const accessKey = 'fh1t5OtR4iGeWzfOzrRSEau1kaXQBuK2dj4P_gWdEQA';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn =  document.querySelector('.loadbtn');
let page = 1;


const  fetchImages = async (query, pageNo) => {
    try{

    if(pageNo === 1){
        imagesContainer.innerHTML = '';    
    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=30&page=${pageNo}&client_id=${accessKey}`;
    // const url =  `https://api.unsplash.com/photos/?query=${query}client_id${accessKey}`;


    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
    if(data.results.length > 0 ){
        data.results.forEach(photo => {
            const imageElement = document.createElement('div');
            // imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
    
            // const overlayElement = document.createElement('div');
            // overlayElement.classList.add('overlay');
    
            // const overlayText = document.createElement('h4');
            // overlayText.innerHTML = `${photo.alt_description}`;
    
            // overlayElement.appendChild(overlayText);
            // imageElement.appendChild(overlayElement);
            imagesContainer.appendChild(imageElement);
        });
    
        if(data.total_pages === pageNo){
            loadMoreBtn.style.display = "none";
        }
        else{
            loadMoreBtn.style.display = "block";
        }
    }
    else{
        var p = "No Image Found";
        window.alert(p);
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
    }
    catch(error){
        var err = "failed to fetch images, Please try again later!!";
        window.alert(err);
    }
}
  


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        page = 1;
        fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
});

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page)
});