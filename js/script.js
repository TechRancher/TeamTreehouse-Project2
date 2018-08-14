/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.getElementsByClassName(".student-item");
const perPage = 10;
const totalPages = Math.ceil(students.length / perPage);
const div = document.createElement("div");





// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

const hideStudents = (studentList) => {
  studentList = students;
  for (let i=0; i<studentList.length; i++){
    studentList[i].style.display = "none";
  }
}

const showPage = (pageNum, studentList) => {
  hideStudents();
  let endCount = pageNum * perPage;
  let startCount = endCount - perPage - 1;
  for(let i=0; i<studentList.length; i++){
    if(i <= endCount  && i >= startCount) {
      studentList[i].style.display = "block";
    }
  }
}


// Create and append the pagination links - Creating a function that can do this is a good approach

const appendPageLinks = (studentList) => {
  const pageClass = document.getElementsByClassName("page")[0];
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
    const activeAnchor = document.querySelector("a");
    activeAnchor.className = "active";
    const activePage = document.querySelector("a");
    // Add functionality to the pagination buttons so that they show and hide the correct items
    // Tip: If you created a function above to show/hide list items, it could be helpful here
    div.addEventListener("click", (event) => {
      event.preventDefault();
      const pageButton = event.target.textContent;
      showPage(pageButton);
      for(let i=0; i<activePage.length; i++) {
        activePage[i].classList.remove("active");
        event.target.classList.add("active");
      }
    });
  }
};

showPage(1, students);
appendPageLinks();








