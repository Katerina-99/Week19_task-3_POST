const inputTitle = document.querySelector("#input-title");
const inputBody = document.querySelector("#input-body");
const createBtn = document.querySelector("#create-btn");
const postList = document.querySelector("#posts-list");

const addPost = (post) => {
  const postItem = document.createElement("li");
  postItem.style = "list-style: none";
  postItem.style.margin = "15px";

  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title;
  postTitle.style.margin = "0 0 5px";
  postTitle.style.fontSize = "24px";

  const postBody = document.createElement("p");
  postBody.textContent = post.body;

  postItem.appendChild(postTitle);
  postItem.appendChild(postBody);
  postList.appendChild(postItem);

  return postList;
};

const createPost = () => {
  const title = inputTitle.value.trim();
  const body = inputBody.value.trim();

  if (!title || !body) {
    alert("Пожалуйста, заполните оба поля!");
    return;
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      addPost(json);
      inputTitle.value = "";
      inputBody.value = "";
    })
    .catch((err) => {
      console.error("Пост не был создан", err);
    });
};

createBtn.addEventListener("click", createPost);
