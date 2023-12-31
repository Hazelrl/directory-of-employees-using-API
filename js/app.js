// Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".card-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


// Close modal
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });
    

// displayEmployees function
function displayEmployees(employeeData) {
    employees = employeeData;
    // Variable for employee data
    let employeeHTML = '';
    // Loop through employee data
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // Add data to HTML
    employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="employee-img" alt="${name.first} ${name.last}" src="${picture.large}">
        <p class="employee-name">${name.first} ${name.last}</p>
        <p class="employee-email">${email}</p>
        <p class="employee-town">${city}</p>
        </div>
    </div>
    `
    });

    gridContainer.innerHTML = employeeHTML;
    
}


function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="employee-img" alt="${name.first} ${name.last}" src="${picture.large}" />
    <div class="text-container">
        <h2 class="employee-name">${name.first} ${name.last}</h2>
        <a href="mailto:${email}" class="employee-email">${email}</a>
        <p class="employee-town">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="employee-address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});
    

