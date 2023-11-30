var state = {taskList:[]};
var taskContents = document.querySelector(".task_contents");
var taskModal = document.querySelector(".task_modal_body");
var htmltaskcontents = ({id,title,url,type,description}) =>
`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
                <div class="card shadow-sm task_card">
                    <div class="card-header d-flex justify-content-end task_card_header">
                        <button type="button" class="btn btn-outline-info mr-2 "><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-outline-danger mr-2"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="card-body task_card_body"> 
                       ${
                       url &&
                       `<img src="${url}" width="100%" alt="Task Image" class="card-img-top md-3 rounded-lg">`
                        }
                        <h5 class="card-title task_card_title">${title}</h5>
                        <p class="card-text trim-3-lines text-muted data-gram_editor='false' task_card_description">${description}</p>
                    <div class="card-footer d-flex task_card_footer">
                    <!--Open Task Button-->
                    <button type="button" class="btn btn-primary d-flex align-items-center gap-2 float-end" data-bs-toggle="modal"
                        data-bs-target="#opentaskModal">
                        Open Task</button>
                    </div>
                </div>
            </div>`


