/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.querySelectorAll(".student-item");
const perPage = 10;
const totalPages = Math.ceil(students.length / perPage);
const div = document.createElement("div");


// This function will take our studentList and hide it.
const hideStudents = (studentList) => {
  studentList = students;
  for (let i=0; i<studentList.length; i++){
    studentList[i].style.display = "none";
  }
}
// This function calls on the hideStudents() and will display the studentList 
// on to a page broke down to 10 perPage 
const showPage = (pageNum, studentList) => {
  hideStudents();
  let startCount = (pageNum - 1) * perPage;
  let endCount = (startCount + perPage)> students.length ? students.length : startCount + perPage;
  for(let i=0; i<studentList.length; i++){
    if(i <= endCount  && i >= startCount) {
      studentList[i].style.display = "block";
    }
  }
}


// This function will call on the showPage() and will also display 10 students perPage
// and the left over will be carried to a new page with the remaining students if it is
// less than 10. This function also creates our pagination for the page by creating 
// our elements to be displayed. A Listener function is also installed into this function
// which will change the active button class to represent the active page.
const appendPageLinks = (studentList) => {
  const pageClass = document.querySelector(".page");
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
    div.addEventListener("click", (event) => {
      event.preventDefault();
      const pageButton = event.target.textContent;
      showPage(pageButton, studentList);
      for(let i=0; i<activeAnchor.length; i++) {
        activeAnchor[i].classList.remove("active");
        event.target.classList.add("active");
      }
    });
  }
};


/* Here is my shot at Exceeds Expectations.
I have not figured out how to use two listener functions in this code to  call on "click" and 
"keypress" or "keydown". I would really enjoy feedback on this. I would love to figure this out. */
const searchOption = () => {
  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  const pageHeader = document.querySelector(".page-header");
  pageHeader.appendChild(searchDiv);
  const searchField = document.createElement("input");
  searchField.setAttribute("placeholder", "Search for Student");
  searchDiv.appendChild(searchField);
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchDiv.appendChild(searchButton);
};

// Calling the functions
showPage(1, students);
appendPageLinks(students);
searchOption(students);

searchButton.addEventListener("click", (event) => {
  const paginationClass = document.querySelector(".pagination");
  event.preventDefault();
  paginationClass.classList.remove();
  const studentValue = searchField.value.toLowerCase();
  searchField.value = "";
  for (let i = 0; i < students.length; i++) {
    const studentName = document.querySelectorAll("h3")[i].textContent;
    if (studentName.indexOf(studentValue) > 0) {
      students[i].style.display = "";
    } else {
      students[i].style.display = "none";
    }
  }
});




