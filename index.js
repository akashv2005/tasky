var state = {taskList:[]};
var taskContents = document.querySelector(".task_contents");
var taskModal = document.querySelector(".task_modal_body");
var htmlTaskContent = ({id,title,url,type,description}) =>
`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
                <div class="card shadow-sm task_card">
                    <div class="card-header d-flex justify-content-end task_card_header">
                        <button type="button" class="btn btn-outline-info mr-2 "><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-outline-danger mr-2"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="card-body task_card_body"> 
                       ${
                       url ?
                       `<img src="${url}" width="100%" alt="Task Image" class="card-img-top md-3 rounded-lg">`
                       :
                       `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" width="100%" alt="Task Image" class="card-img-top md-3 rounded-lg">`
                        }
                        <h4 class="card-title task_card_title">${title}</h4>
                        <span class="badge text-bg-primary">${type}</span>
                        <p class="card-text trim-3-lines text-muted data-gram_editor='false' task_card_description">${description}</p>
                    <div class="card-footer d-flex task_card_footer">
                    <!--Open Task Button-->
                    <button type="button" class="btn btn-primary d-flex align-items-center gap-2 float-end" data-bs-toggle="modal"
                        data-bs-target="#opentaskModal">
                        Open Task</button>
                    </div>
                </div>
            </div>`;
var htmlModalContent  =({id,title,url,description,type}) =>
{
var date = newDate(parseInt(id));
return
`<div id=${id}>
${
    url ?
    `<img width='100%' src="${url}" class="card-img-top">`
    :
    `<img width='100%' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" class="card-img-top">`
}
<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
<h2 class="my-3">${title}</h2>
<p class="lead">${description}</p>
</div>`
}
var updateLocalStorage = () =>
{
localStorage.setItem('task',JSON.stringify({tasks:state.taskList}));
}

var loadInitialData =() =>
{
    var localStorageCopy = JSON.parse(localStorage.tasks);
    if(localStorageCopy)state.taskList = localStorageCopy.tasks
    {
        taskList.map((cardDate) =>
        {
        taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate))
        })
    }
}

var handleSubmit = () =>
{
const id = `${Date.now()}`
const input =
{
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDesc").value,
};
if(input.title==="" || input.type==="" || input.description==="")
{
   return alert("Please fill all the required details");
}
taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({...input,id}));
  state.taskList.push({ ...input, id });
  updateLocalStorage();
};
var openTask = (e) => {
  if (!e) e = window.event;

  var getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

var deleteTask = (e) => {
  if (!e) e = window.event;
  var targetID = e.target.getAttribute("name");
  var type = e.target.tagName;
  var removeTask = state.taskList.filter(({ id }) => id !== targetID);

  state.taskList = removeTask;
  updateLocalStorage();

  if (type === "BUTTON") {
    console.log(e.target.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};
