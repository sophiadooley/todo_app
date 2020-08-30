// let allTodos = [
//     {title: 'do dishes',
//      dueDate: '08-18-2020',
//      description: 'take dishes out of sink',
//      isComplete: false},
     
//      {title: 'walk dog',
//      dueDate: '08-28-2020',
//      description: 'walk with dog',
//      isComplete: true},

//      {title: 'make up bed',
//      dueDate: '09-18-2020',
//      description: 'clean the sheets',
//      isComplete: true},

//      {title: 'fold clothes',
//      dueDate: '08-10-2020',
//      description: 'organize clothes',
//      isComplete: true},

//      {title: 'Mom birthday',
//      dueDate: '10-14-2020',
//      description: 'buy a cake',
//      isComplete: false},

//      {title: 'Playstation',
//      dueDate: '12-25-2020',
//      description: 'buy the new playstation',
//      isComplete: false},
    
//   ];

  let pendingTodos, expiredTodos, completedTodos, allTodos;

  function createElementFromTodo(todo){
    let toDoElement = $(`<div class="todo">
    <h3><span class="title">${ todo.title }</span><span class="due-date">${ todo.date }</span></h3>
    <pre>Click on the left below the icons to expand the left drawer
  
  When you're done, click complete on this todo.</pre>
    <footer class="actions">
    ${ todo.isComplete ?  `<button class="action complete">Complete</button>` : ''}
      <button class="action delete">Delete</button>
    </footer>
  </div>`)

    toDoElement.data('todo', todo);
    
    return toDoElement;
  }

  function renderTodos(){
    $('main .content').empty();

    pendingTodos.forEach(function(todo){
      let pendingElement = createElementFromTodo(todo);

      $('.pending-todos').append(pendingElement);
    })

    completedTodos.forEach(function(todo){
      let completedElement = createElementFromTodo(todo);

      $('.completed-todos').append(completedElement);
    })

    expiredTodos.forEach(function(todo){
      let expiredElement = createElementFromTodo(todo);

      $('.expired-todos').append(expiredElement);
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
  
  let todoObject = createTodoFromForm();

  allTodos.unshift(todoObject);

  $('.todo-form').trigger('reset');

  $('.modal').removeClass('open');

  storeData();
  splitTodos();
  renderTodos();
})



$('.cancel-create-todo').click(function(event){
  $('.modal').removeClass('open');
})


function createTodoFromForm(){
  return {
    title: $('#todo-title').val(),
    description: $('#todo-description').val(),
    dueDate: $('#todo-due-date').val() ,
    isComplete: false
  }
}

//below here also states its not working...ask for help regarding these two comments

$('main').on('click', '.action.complete', function () {
    let closeToDo = $(this).closest('.todo');

    closeToDo.data('todo').isComplete = true;

    
    closeToDo.slideUp(function () {
      storeData();
      splitTodos();
      renderTodos()
    });
})






function isCurrent(todo){
  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();

  return now < todoDueDate;
}


function splitTodos(){
  pendingTodos = allTodos.filter(function(todo) {
    return todo.isComplete === false && isCurrent(todo);
  })

  completedTodos = allTodos.filter(function(todo){
    return todo.isComplete;
  })

  expiredTodos = allTodos.filter(function(todo){
    return todo.isComplete === false && isCurrent(todo) === false;
  })
}

function storeData(){
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

function retrieveData(){
  allTodos = JSON.parse(localStorage.getItem('allTodos')) || fetchDefaultTodos();
}

function fetchDefaultTodos(todo){
  return [
    {    title: 'Click sidebar',
         dueDate: '08-18-2020',
         description: 'move mouse to side bar and click',
         isComplete: false},
         
         {title: 'Click add new Todo',
         dueDate: '08-28-2020',
         description: 'click add button at top corner',
         isComplete: false},
    
         {title: 'Write Todo',
         dueDate: '09-18-2020',
         description: 'write what you need to do',
         isComplete: false},
    
         {title: 'click add',
         dueDate: '08-10-2020',
         description: 'click add todo',
         isComplete: false},
]
}

retrieveData();
splitTodos();
renderTodos();