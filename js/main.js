let container = document.querySelector('.container');
let modalBody = document.querySelector('.modal-body');
let prevPageBtn = document.querySelector('#prev-page');
let nextPageBtn = document.querySelector('#next-page');

let page = 1;

function render() {
    container.innerHTML = '';
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
            container.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <b>Post id: ${item.id}</b></br>
                    <b>${item.title}</b>
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>${item.body}</p>
                    </blockquote>
                    <button class="btn btn-dark user-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    id="authorId-${item.userId}">About author</button>
                </div>
            </div>
            `;
            addModalEvent();
        })})
        .catch(err => console.log(err))
};
render();

function writeAuthorObj(id) {
    modalBody.innerHTML = `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                modalBody.innerHTML = `
                    <p><b>Author id:</b> ${data.id}</p>
                    <p><b>Email:</b> ${data.email}</p>
                    <p><b>Name:</b> ${data.name}</p>
                    <p><b>Username:</b> ${data.username}</p>
                `;
            }, 1000);
        })
        .catch(err => console.log(err))
};

function getPostAuthor(e) {
    let authorId = e.target.id.split('-')[1];
    writeAuthorObj(authorId);
};

function addModalEvent() {
    let authorBtns = document.querySelectorAll('.user-btn');
    authorBtns.forEach(item => {
        item.addEventListener('click', getPostAuthor);
    });
};

function checkPages() {
    if(page === 1) {
        prevPageBtn.style.display = 'none';
        nextPageBtn.style.display = 'block';
    } else if (page === 10) {
        prevPageBtn.style.display = 'block';
        nextPageBtn.style.display = 'none';
    } else {
        prevPageBtn.style.display = 'block';
        nextPageBtn.style.display = 'block';
    };
};
checkPages();

prevPageBtn.addEventListener('click', () => {
    page--;
    render();
    checkPages();
});

nextPageBtn.addEventListener('click', () => {
    page++;
    render();
    checkPages();
});