let container = document.querySelector('.container');

function render() {
    container.innerHTML = '';
    fetch('https://jsonplaceholder.typicode.com/posts')
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

function getPostAuthor(e) {
    console.log('Hello');
};

function addModalEvent() {
    let authorBtns = document.querySelectorAll('.user-btn');
    authorBtns.forEach(item => {
        item.addEventListener('click', getPostAuthor);
    });
};