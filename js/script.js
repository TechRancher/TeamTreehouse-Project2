/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
// Declaring global variables
const students = document.querySelectorAll(".student-item");
const pageElement = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");
const divElement = document.createElement("div");
const activeA = document.querySelector(".pagination li a");
const perPage = 10;
let searchResult = students;

// Create a function to hide all the students.
const hideStudents = () => {
  for (let i = 0; i < students.length; i++) {
    students[i].style.display = "none";
  }
};

/* This function calls on the hideStudents() and will display the studentList 
onto a page broke down to 10 perPage */
const showPage = pageNum => {
  hideStudents();
  noSearchResultsHide();

  if (searchResult.length > 0) {
    const startCount = (pageNum - 1) * perPage;
    const endCount =
      startCount + perPage > searchResult.length
        ? searchResult.length
        : startCount + perPage;

    for (let i = startCount; i < endCount; i++) {
      searchResult[i].style.display = "list-item";
    }
  } else {
    noSearchResultsShow();
  }
};

/* This function is for the search. It takes in the value of the search form and looks for a match
in the student's name which is an h3 element. If there is a match it will then push it into an array then 
the array will be displayed. */
const search = (searchValue = "") => {
  if (searchValue !== "") {
    searchResult = [];
    for (let i = 0; i < students.length; i++) {
      const studentfilterName =
        students[i]
          .querySelector("h3")
          .innerText.toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1;
      if (studentfilterName) {
        searchResult.push(students[i]);
      }
      // this will hide the page btn at the bottom if searchResult is less than 10
      if (searchResult.length <= perPage) {
        divElement.style.display = "none";
      } else {
        divElement.style.display = "block";
      }
    }
  } else {
    searchResult = students;
  }
  showPage(1);
  appendPageLinks();
};

// This function resets the search form and page to page 1.
const searchReset = () => {
  search();
  document.querySelector(".student-search input").value = "";
};

// This function creates the pagination links
const appendPageLinks = () => {
  const totalPages = Math.ceil(searchResult.length / perPage);
  const ulCreate = document.createElement("ul");
  
  // this removes the additional page btns durning a search
  while (divElement.firstChild) {
    divElement.removeChild(divElement.firstChild);
  }
  // loop through the pagebtns
  for (let i = 1; i <= totalPages; i++) {
    const liCreate = document.createElement("li");
    ulCreate.appendChild(liCreate);
    const anchorCreate = document.createElement("a");
    anchorCreate.href = "#";
    anchorCreate.textContent = i;
    liCreate.appendChild(anchorCreate);
    // Add an eventListener to handle the pageNum Button
    liCreate.addEventListener("click", event => {
      const pageButton = event.target.textContent;
      const activeAnchor = document.querySelectorAll("a");
      showPage(pageButton);
      for (let i = 0; i < activeAnchor.length; i++) {
        activeAnchor[i].classList.remove("active");
        event.target.classList.add("active");
      }
    });
  }
  // finish appending the rest of the pagination elements
  divElement.classList.add("pagination");
  divElement.appendChild(ulCreate);
  pageElement.appendChild(divElement);
  // This function makes the page btn become active on page load
  if (activeA) {
    const activeA = document.querySelector(".pagination li a");
    activeA.classList.add("active");
  } 
};

// This function creates the search form elements.
const searchOption = () => {
  const searchDiv = document.createElement("div");
  searchDiv.classList.add("student-search");
  searchDiv.innerHTML = `<input placeholder="Search for Student"><button>Search</button>`;
  pageHeader.appendChild(searchDiv);
};

// This function create the no search results when no students are found.
const noSearchResults = () => {
  const noResultsDiv = document.createElement("div");
  noResultsDiv.classList.add("no-search-results");
  noResultsDiv.style.display = "none";
  noResultsDiv.innerHTML = `Sorry. No student found with that name. <a href="#">Reset Search</a>`;
  pageElement.appendChild(noResultsDiv);
};

// This function shows the text for when no search results were found.
const noSearchResultsShow = () => {
  document.querySelector(".no-search-results").style.display = "block";
};

// This function hides the text for when no search results were found.
const noSearchResultsHide = () => {
  document.querySelector(".no-search-results").style.display = "none";
};

// Calles the functions.
searchOption();
noSearchResults();
showPage(1);
appendPageLinks();


// Key up event listener to handle the key up event on the search form.
pageHeader.addEventListener("keyup", event => {
  if (event.target && event.target.nodeName == "INPUT") {
    search(event.target.value);
  }
});

// Button event listener to handle the click event on the search button.
pageHeader.addEventListener("click", event => {
  if (event.target && event.target.nodeName == "BUTTON") {
    search(event.target.previousElementSibling.value);
  }
});

// Reset search event listener to handle the click event in the no search results.
pageElement.addEventListener("click", event => {
  if (event.target && event.target.nodeName == "A" && event.target.parentElement.className === "no-search-results") {
    // this reloads the page to start the search over again.
    document.location.reload(true);
    searchReset();
  }
});
