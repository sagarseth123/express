// to add text or change the text 

// var books= document.querySelectorAll('#fourth li .three');
// Array.from(books).forEach(function(book){
// book.textContent +='  (test)';
// });

// const booklist=document.querySelector('#fourth');
// booklist.innerHTML +='<h2>books and more books</h2>';

// const life=document.querySelector('#second');
// life.innerHTML +='<p>my self </p>';


// to delete the the list using buttons

// var btns=document.querySelectorAll('#fourth .delete');

// Array.from(btns).forEach(function(btn){
//     btn.addEventListener('click',function(e){
//         const li= e.target.parentElement;
//         li.parentNode.removeChild(li)
//     }); 
// });


// event bubbling means to do something on click Same as previous  but it does in all 
var link=document.querySelector('#fourth ul');
link.addEventListener('click',function(e){
    if(e.target.className=='delete'){
        const li=e.target.parentNode;
        link.removeChild(li);
    }
});

// to add book-list

const addForm=document.forms['add-book'];
addForm.addEventListener('submit',function(e){
    e.preventDefault();
    const value=addForm.querySelector('input[type="text"]').value
    // console.log(value);

    // to create Element

    const li=document.createElement('li');
    const bookName=document.createElement('span');
    const deleteBtn=document.createElement('span');
      

    // add content

    deleteBtn.textContent="delete";
    bookName.textContent=value;


    // add classes

    bookName.classList.add('name');
    deleteBtn.classList.add('delete');

    // append to document

    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    link.appendChild(li);

});

const hidebox=document.querySelector('#hide');
hidebox.addEventListener('change',function(e){
    if( hidebox.checked){
        link.style.display="none";
    }else{
        link.style.display="initial";
    }
});

