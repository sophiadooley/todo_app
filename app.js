let allTodos = [
    {title: 'do dishes',
     dueDate: '08-18-2020',
     description: 'take dishes out of sink',
     isComplete: false},
     
     {title: 'walk dog',
     dueDate: '08-28-2020',
     description: 'walk with dog',
     isComplete: true},

     {title: 'make up bed',
     dueDate: '09-18-2020',
     description: 'clean the sheets',
     isComplete: true},

     {title: 'fold clothes',
     dueDate: '08-10-2020',
     description: 'organize clothes',
     isComplete: true},

     {title: 'Mom birthday',
     dueDate: '10-14-2020',
     description: 'buy a cake',
     isComplete: false},

     {title: 'Playstation',
     dueDate: '12-25-2020',
     description: 'buy the new playstation',
     isComplete: false},
    
  ];

  function createElementFromTodo(todo){
    return $(`<div class="todo">
    <h3><span class="title">${ todo.title }</span><span class="due-date">${ todo.date }</span></h3>
    <pre>Click on the left below the icons to expand the left drawer
  
  When you're done, click complete on this todo.</pre>
    <footer class="actions">
      <button class="action complete">Complete</button>
      <button class="action delete">Delete</button>
    </footer>
  </div>`)
  }

  function renderTodos(){
    $('main .content').empty();

    allTodos.forEach(function(todo){
       let newElement = createElementFromTodo(todo);

        if ( todo.isComplete ){
        $('.completed-todos').append(newElement);
     }else {
         $('.pending-todos').append(newElement)
     }
    })
  }



$('.left-drawer').click(function(){
    if ( $(this).hasClass('left-drawer') ) {

        $('#app').toggleClass('drawer-open');
      };
})

$('.add-todo').click(function() {
  $('.modal').addClass('open');
})



$('.create-todo').click(function(event){
  event.preventDefault();
  
  let newForm = $('.todo-form');

  todoObject = createTodoFromForm(newForm);

  allTodos.unshift(todoObject);

  newForm.trigger('reset');

  $('.modal').removeClass('open');

  renderTodos();
})



$('.cancel-create-todo').click(function(event){
  $('.modal').removeClass('open');
})


function createTodoFromForm(){
  let newTodo = {
    title: $('#todo-title').val(),
    description: $('#todo-description').val(),
    dueDate: $('#todo-due-date').val() ,
    isComplete: false
  }
  todoElement.data("todo", todo);

 return newTodo;
}

$('main').on('click', '.action.complete', function () {
    let closeToDo = $(this).closest('.todo');

    closeToDo.data('todo', todo).isComplete(true);

    todoElement.slideUp(function () {
      renderTodos();
});
})


renderTodos();