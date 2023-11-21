const global={
    currentPage:window.location.pathname,
    search:{
        term:'',
        type:'',
        page:1,
        totalPages:1,
        totalResults:0
    },
    api:{
        apiKey:'c5f0f1b0310441b6c8132e9bcace0be5',
        apiUrl:'https://api.themoviedb.org/3/'
    }
};

// Display most popular movies
const displayPopularMovies= async () => {
    const {results}=await fetchAPIData('movie/popular');
    results.forEach((movie) => {
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`<div class="card">
        <a href="movie-details.html?id=${movie.id}">
          ${
                movie.poster_path ?  `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
            />`
            :
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
            />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release:${movie.release_date}</small>
          </p>
        </div>
      </div>`;

        document.querySelector('#popular-movies').appendChild(div);
     });
};

// display most popular tv shows
const displayPopularShows= async () => {
    const {results}=await fetchAPIData('tv/popular');
    results.forEach((show) => {
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`<div class="card">
        <a href="tv-details.html?id=${show.id}">
          ${
                show.poster_path ?  `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
            />`
            :
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
            />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date:${show.first_air_date}</small>
          </p>
        </div>
      </div>`;

        document.querySelector('#popular-shows').appendChild(div);
     })
};


const showSpinner=() => {
    document.querySelector('.spinner').classList.add('show');
    
};
const hideSpinner=() => {
    document.querySelector('.spinner').classList.remove('show');

};


// Display movie details

const displayMovieDetails= async() => {
    const movieId= window.location.search.split('=')[1];
    const movie= await fetchAPIData(`movie/${movieId}`);

    // overlay or background Image
     displayBackgroundImage('movie', movie.backdrop_path);

    const div= document.createElement('div');
    div.innerHTML = `<div class="details-top">
    <div>
    ${
        movie.poster_path ?  `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
    />`
    :
    `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
    />`
  }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date:${movie.release_date} </p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}
        </li>`).join(' ')}
        
        
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((company)=>
        `<span>${company.name}</span>`).join(',')
    }</div>
  </div>`;
  document.querySelector('#movie-details').appendChild(div);

};

// Display show details

const displayShowDetails= async() => {
    const showId= window.location.search.split('=')[1];
    const show= await fetchAPIData(`tv/${showId}`);

    // overlay or background Image
    // displayShowBackgroundImage('tv', show.backdrop_path);
    displayBackgroundImage('tv', show.backdrop_path);

    const div= document.createElement('div');
    div.innerHTML = `<div class="details-top">
    <div>
    ${
        show.poster_path ?  `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
    />`
    :
    `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
    />`
  }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date:${show.last_air_date} </p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}
        </li>`).join(' ')}
        
        
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">last episode to air:</span> ${show.last_episode_to_air.name}</li>
      
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies.map((company)=>
        `<span>${company.name}</span>`).join(',')
    }</div>
  </div>`;
  document.querySelector('#show-details').appendChild(div);

};

//  display bacdrop on detail pages
const displayBackgroundImage = (type, backgroundPath) => {
    const overlayDiv=document.createElement('div');
    overlayDiv.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize='cover';
    overlayDiv.style.backgroundPosition='center';
    overlayDiv.style.height='100vh';
    overlayDiv.style.width='100vw';
    overlayDiv.style.position='absolute';
    overlayDiv.style.top='0';
    overlayDiv.style.left='0';
    overlayDiv.style.zIndex='-1';
    overlayDiv.style.opacity='0.3';
    if (type==='movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);

    }
};
// search movies/shows

const search=async () => {
    const queryString= window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    global.search.type=urlParams.get('type');
    global.search.term=urlParams.get('search-term');
    if (global.search.term!==''&& global.search.term!== null) {
        // @todo - make request and display results
        const {results,total_pages,page,total_results}= await searchAPIData();
        global.search.page=page;
        global.search.totalPages=total_pages;
        global.search.totalResults=total_results;
        if (results.length===0) {
            showAlert('No results found');
            return;
        }
        displaySearchResults(results);

        document.querySelector('#search-term').value='';
    } else {
        showAlert('Please enter a search term');
    }
    
};


const displaySearchResults= (results) => {
    
    // clear previous results
    document.querySelector('#search-results').innerHTML='';
    document.querySelector('#search-results-heading').innerHTML='';
    document.querySelector('#pagination').innerHTML='';
    results.forEach((result) => {
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`<div class="card">
        <a href="${global.search.type}-details.html?id=${result.id}">
          ${
                result.poster_path ?  `<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type==='movie' ? result.title : 
                result.name}"
            />`
            :
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${global.search.type==='movie' ? result.title : 
                result.name}"
            />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${global.search.type==='movie' ? result.title : 
          result.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release:${global.search.type==='movie' ? result.release_date : 
            result.first_air_date}</small> 
          </p>
        </div>
      </div>`;
      document.querySelector('#search-results-heading').innerHTML = `
      <h2>${results.length} of ${global.search.totalResults}
      Results for ${global.search.term}</h2>
      `
    
        document.querySelector('#search-results').appendChild(div);
     });
     displayPagination();
};

// create and display pagination for search

const displayPagination = () => {
    const div=document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML=`<button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
    document.querySelector('#pagination').appendChild(div);

    // disable prev btn if on first page
    if (global.search.page===1) {
        document.querySelector('#prev').disabled=true
    } 

    // disable last btn if on first page
    if (global.search.page===global.search.totalPages) {
        document.querySelector('#next').disabled=true
    } 
    // next page
    document.querySelector('#next').addEventListener("click",async()=>{
        global.search.page++;
        const {results,total_pages}=await searchAPIData();
        displaySearchResults(results);
    })
    // prev page
    document.querySelector('#prev').addEventListener("click",async()=>{
        global.search.page--;
        const {results,total_pages}=await searchAPIData();
        displaySearchResults(results);
    })

      }

// Display slider movies

const displaySlider=async() => {
    const {results}=await fetchAPIData('movie/now_playing');
    // console.log(results);
    results.forEach((movie) => {
        const div=document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML=`
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
        </h4>
      `;
      document.querySelector('.swiper-wrapper').appendChild(div);
      initSwiper();
    })
};
const initSwiper=() => {
    const swiper=new Swiper('.swiper',{
        
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode:true,
  loop:true,
  autoplay:{
    delay:4000,
    disableOnInteraction:false,
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    500: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    700: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    1200: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
})   
};




// Fetch data from TDMB API
  const fetchAPIData=async (endpoint) => {
      
      const API_URL=global.api.apiUrl;
      const API_KEY=global.api.apiKey;

      
     showSpinner();

      const response= await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
      const data=await response.json();

      hideSpinner();
      return data;
    };
  
    // make request to search
    const searchAPIData=async() => {
      
        const API_URL=global.api.apiUrl;
        const API_KEY=global.api.apiKey;
  
        
       showSpinner();
  
        const response= await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
        const data=await response.json();
  
        hideSpinner();
        return data;
      };
    


// Highlight active link
const highlightActiveLink=() => {
    const links= document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }; 
    })
};

// Show alert
const showAlert=(message,className='error')=> {
    const alertEl = document. createElement ('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild (document.createTextNode (message)) ;
     document.querySelector ('#alert') .appendChild (alertEl);

     setTimeout(() => alertEl.remove(), 2000);
};

// init app
const init=() => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies(); 
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search();
            break;
    
    }
    highlightActiveLink();
};

document.addEventListener('DOMContentLoaded',init);

