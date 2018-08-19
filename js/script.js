/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.querySelectorAll(".student-item");
const perPage = 10;
const totalPages = Math.ceil(students.length / perPage);
const div = document.createElement("div");
const pageClass = document.querySelector(".page");

const pageHeader = document.querySelector(".page-header");
let searchArray = students;


// This function will take our studentList and hide it.
const hideStudents = (studentList) => {
  studentList = students;
  for (let i=0; i<studentList.length; i++){
    studentList[i].style.display = "none";
  }
};

// This function calls on the hideStudents() and will display the studentList 
// on to a page broke down to 10 perPage 
const showPage = (pageNum) => {
  hideStudents();
  if(students.length > 0){
    const startCount = (pageNum -1) * perPage;
    const endCount = (startCount + perPage) > students.length ? students.length : startCount + perPage;
    for(let i=startCount; i<endCount; i++){
      students[i].style.display = "block";
    }
  } else {
    noResults();
  }
};


// This function will call on the showPage() and will also display 10 students perPage
// and the left over will be carried to a new page with the remaining students if it is
// less than 10. This function also creates our pagination for the page by creating 
// our elements to be displayed. A Listener function is also installed into this function
// which will change the active button class to represent the active page.
const appendPageLinks = () => {
  const div = document.createElement("div");
  div.className = "pagination";
  pageClass.appendChild(div);
  const ulCreate = document.createElement("ul");
  div.appendChild(ulCreate);
  for(let i=0; i<totalPages; i++){
    const liCreate = document.createElement("li");
    ulCreate.appendChild(liCreate);
    const anchorCreate = document.createElement("a");
    anchorCreate.href = "#";
    anchorCreate.textContent = i + 1;
    liCreate.appendChild(anchorCreate);
    const activeAnchor = document.querySelectorAll("a");
    activeAnchor[0].className = "active";
    // Add an eventListener to handle the pageNum Button
    div.addEventListener("click", (event) => {
      event.preventDefault();
      const pageButton = event.target.textContent;
      showPage(pageButton);
      for (let i = 0; i < activeAnchor.length; i++) {
        activeAnchor[i].classList.remove("active");
        event.target.classList.add("active");
      }
    });
  }
};


/* Here is my shot at Exceeds Expectations.
I create the search form and button in this function
*/
const searchElements = () => {
  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  pageHeader.appendChild(searchDiv);
  const searchField = document.createElement("input");
  searchField.setAttribute("placeholder", "Search for Student");
  searchDiv.appendChild(searchField);
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchDiv.appendChild(searchButton);
};

// I set what will happen if no results are found in this function
const noResults = () => {
  const divNoResults = document.createElement("div");
  divNoResults.classList.add("search-no-results");
  divNoResults.style.display = "none";
  divNoResults.innerHTML = `Sorry. No student found with that name. <a href="#">Reset Search</a>`;
  pageClass.appendChild(divNoResults);
};


// The function for the search
const search = (searchValue = " ") => {
  if(searchValue !== " "){
    searchArray = [];
    for (let i=0; i<students.length; i++){
      const studentFilterName = (students[i].querySelector("h3").innerText.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      searchArray.push(students[i]);
    }
  } else {
    searchArray = students;
  }
  // showPage(1);
  // appendPageLinks();
};

const resetSearch = () => {
  search();
  document.querySelector(".student-search input").value = "";
};

// Add an eventListener to handle the click event on the search button.
pageHeader.addEventListener("click", (event) => {
  search(event.target.inputValue);
});

// Add an eventListener to handle the keyup event on the search form.
pageHeader.addEventListener("keyup", (event) => {
  if(event.target && event.target.nodeName == "INPUT"){
    search(event.target.value);
  }
});

// Add an eventListener to handle the reset link.
pageClass.addEventListener("click", (event) => {
  if(event.target && event.target.nodeName == "A" && event.target.parentElement.className === "search-no-results") {
    resetSearch();
  }
});

// Calling the functions
showPage(1);
appendPageLinks();
searchElements();




