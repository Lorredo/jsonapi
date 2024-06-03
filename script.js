document.getElementById('home-tab').addEventListener('click', () => navigateTo('home'));
document.getElementById('gallery-tab').addEventListener('click', () => navigateTo('gallery'));
document.getElementById('about-tab').addEventListener('click', () => navigateTo('about'));

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function displayUsers() {
  const users = await fetchData('https://jsonplaceholder.typicode.com/users');
  const content = document.getElementById('content');
  content.innerHTML = `<div class="hero bg-light p-5 rounded mb-4">
                         <h1 class="display-4">Welcome to My PWA</h1>
                         <p class="lead">Explore user information, beautiful galleries, and learn more about the developer.</p>
                       </div>
                       <h2>Users</h2>`;
  const userCards = `<div class="row">
                      ${users.map(user => `<div class="col-md-4 mb-4">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <p class="card-text"><strong>Username:</strong> ${user.username}</p>
                            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                            <p class="card-text"><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                            <p class="card-text"><strong>Phone:</strong> ${user.phone}</p>
                          </div>
                        </div>
                      </div>`).join('')}
                    </div>`;
  content.innerHTML += userCards;
}

async function displayGallery() {
  const photos = await fetchData('https://jsonplaceholder.typicode.com/photos');
  const content = document.getElementById('content');
  content.innerHTML = `<h2>Gallery</h2>`;
  const gallery = `<div class="row">
                     ${photos.slice(0, 20).map(photo => `<div class="col-md-3 mb-4">
                       <div class="card">
                         <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                         <div class="card-body">
                           <p class="card-text">${photo.title}</p>
                         </div>
                       </div>
                     </div>`).join('')}
                   </div>`;
  content.innerHTML += gallery;
}

function displayAbout() {
  const content = document.getElementById('content');
  content.innerHTML = `<h2>About the Developer</h2>
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="profile-pic-removebg-preview.png" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 d-flex align-items-center">
          <div class="card-body">
            <h5 class="card-title">Artemio III E. Lorredo</h5>
            <p class="card-text">
              Hello, I'm Artemio III E. Lorredo, a dedicated IT aspirant on a perpetual quest for knowledge and mastery in the ever-evolving world of technology. With a fervent passion for problem-solving and a keen eye for detail, I approach each project as a unique opportunity to innovate and contribute to the digital landscape.
              <br><br>
              My journey in IT is not just about writing lines of code; it's a continuous exploration of cutting-edge technologies and a commitment to staying at the forefront of industry trends. Proficient in Web Development, I thrive in dynamic environments where adaptability and creativity are key.
            </p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>`;
}

function setActiveTab(tab) {
  const tabs = ['home', 'gallery', 'about'];
  tabs.forEach(t => {
    const element = document.getElementById(`${t}-tab`);
    if (t === tab) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

function navigateTo(tab) {
  localStorage.setItem('currentTab', tab);
  setActiveTab(tab);
  switch (tab) {
    case 'home':
      displayUsers();
      break;
    case 'gallery':
      displayGallery();
      break;
    case 'about':
      displayAbout();
      break;
    default:
      displayUsers();
  }
}

// Load the correct tab based on localStorage
document.addEventListener('DOMContentLoaded', () => {
  const currentTab = localStorage.getItem('currentTab') || 'home';
  navigateTo(currentTab);
});
