let title = document.querySelector("#title"),
    author = document.querySelector("#author"),
    isbn = document.querySelector("#isbn"),
    submit = document.querySelector("#submit"),
    message = document.querySelector('.message'),
    Tbody = document.querySelector(".t-body"),
    Table = document.querySelector(".table"),
    form = document.querySelector(".form");

    // document.addEventListener("DOMContentLoaded" , ()=>{
    //     let items;
    //     if(localStorage.getItem('items')=== null){
    //         items = []
    //     }else{
    //         items = JSON.parse(localStorage.getItem("items"))
    //     }
    
    //     items.forEach(item =>{
    //         let tr = document.createElement("tr");
    //     tr.innerHTML = `
    //         <th>${item.title}</th>
    //         <th>${item.author}</th>
    //         <th>${item.isbn}</th>
    //         <th><a class="delete" href="#">X</a></th>
    //     `
    //     Tbody.appendChild(tr);
    //     })
    // })
    

class Book {
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}



class BookList {
    static AddBookToList(book){
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <th>${book.title}</th>
            <th>${book.author}</th>
            <th>${book.isbn}</th>
            <th><a class="delete" href="#">X</a></th>
        `
        Tbody.appendChild(tr);

        Store.AddBookToLS(book)

        title.value = "";
        author.value = ""; 
        isbn.value = "";
    }

    static removeBookFromList(book){
        book.target.parentElement.parentElement.remove();
        Store.removeLS(book.target.parentElement.previousElementSibling.textContent)
    }

    static showMessage(msg , color){
            let p = document.createElement("p");
            p.className = `alert alert-${color}`;
            p.textContent = msg;
            message.appendChild(p);
            setTimeout(()=>{
                let alert = document.querySelector(".alert");
                alert.remove()
            },2000)
       
    }

    


   
  
}

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem("books")===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static AddBookToLS(book){
        let books = Store.getBooks();
        books.push(book)
        localStorage.setItem("books" , JSON.stringify(books))
    }


    static itemLoaded(){
        let books = Store.getBooks();

        books.forEach((book) => {
            let tr = document.createElement("tr");
        tr.innerHTML = `
            <th>${book.title}</th>
            <th>${book.author}</th>
            <th>${book.isbn}</th>
            <th><a class="delete" href="#">X</a></th>
        `
        Tbody.appendChild(tr);
        });
    }

    static removeLS(isbn){
        let books = Store.getBooks();
        books.forEach((book , index) => {
            if(isbn === book.isbn){
                books.splice(index , 1)
            }
        });
        localStorage.setItem('books' , JSON.stringify(books))
    }

}


document.addEventListener("DOMContentLoaded" , ()=>{
    Store.itemLoaded()
})

submit.addEventListener("click" , (e)=>{
    e.preventDefault();
    if(title.value =="" || author.value == "" || isbn.value == ""){
       
            BookList.showMessage(`Please Fill The Field ...` , "danger")
          
    }else{
        let book = new Book(title.value , author.value , isbn.value)
        BookList.AddBookToList(book);
        BookList.showMessage(`Book was added ... ` , "success")
    }
})


Table.addEventListener("click" , (e)=>{
    e.preventDefault();
    if(e.target.className == "delete"){
        BookList.removeBookFromList(e);
        BookList.showMessage(`The Book Was Removed ...` , "danger")
    }
})
