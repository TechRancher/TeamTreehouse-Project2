function hideStudentList(studentList) {
  studentList = document.getElementsByClassName("student-item");
  for (let i=0; i<studentList.length; i++){
    studentList[i].style.display = "none";
  }
}

function showPage(pageNum, studentList){
  hideStudentList();
  studentList = document.getElementsByClassName("student-item");
  for (let i=0; i<studentList.lenght; i++){
    if(i>=(pageNum * 10)-10 && i<(pageNum * 10)){
      studentList[i].style.display = "block";
    }
  }
}


function appendPageLinks(studentList){
  studentList = document.getElementsByClassName("student-item");
  let totalPage = Math.ceil(studentList.lenght / 10);
  const newPaginationDiv = document.createElement("div");
  newPaginationDiv.className = "pagination";
  const pageClass = document.getElementsByClassName("page")[0];
  pageClass.appendChild(newPaginationDiv);
  const newPaginationUnorderedList = document.createElement("ul");
  newPaginationDiv.appendChild(newPaginationUnorderedList);
  for (let i=0; i<totalPage; i++){
    let newPaginationList = document.createElement("li");
    newPaginationUnorderedList.appendChild(newPaginationList);
    let newPaginationAnchor = document.createElement("a");
    newPaginationAnchor.href = "#";
    newPaginationAnchor.textContent = i+1;
    newPaginationList.appendChild(newPaginationAnchor);
  }
  let firstPaginationAnchor = document.getElementsByTagName("a")[0];
  firstPaginationAnchor.className = "active";
  let pageActive = document.getElementsByTagName("a");
  newPaginationDiv.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.tagName = "a";
    let linkButton = event.target.textContent;
    showPage(linkButton);
    for (let i=0; i<pageActive.length; i++){
      pageActive[i].classList.remove("active");
      event.target.classList.add("active");
    }
  })
}
showPage(1);
appendPageLinks();
