const form = document.querySelector("form");
const template = document.querySelector("template");
const tbody = document.querySelector("tbody");

let users = JSON.parse(localStorage.getItem("users")) ?? [];

let userCount = users.length;
const userCountElement = document.getElementById("userCount");
userCountElement.textContent = `All users: ${userCount}`;

const makeUsers = () => {
  tbody.innerHTML = "";
  users.forEach((user) => {
    const clone = template.content.cloneNode(true);
    const avatarImage = clone.querySelector(".avatar-image");
    const userName = clone.querySelector(".user-name");
    const age = clone.querySelector(".age");
    const bio = clone.querySelector(".bio");
    const deleteBtn = clone.querySelector(".delete-btn");
    deleteBtn.setAttribute("onclick", `deleteItem(${user.id})`);

    avatarImage.src = `https://picsum.photos/400?random=${Math.trunc(
      Math.random() * 1000
    )}`;
    userName.textContent = user.firstName;
    age.textContent = user.age;
    bio.textContent = `${user.bio.slice(0, 60)}...`;

    tbody.appendChild(clone);
  });

  userCount = users.length;
  userCountElement.textContent = `All users: ${userCount}`;
};

const deleteItem = (e) => {
  const filteredUsers = users.filter((user) => user.id !== e);
  users = filteredUsers;
  makeUsers();
  localStorage.setItem("users", JSON.stringify(users));
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const age = Number(document.getElementById("age").value.trim());
  const bio = document.getElementById("bio").value.trim();

  if (!firstName || !age || !bio) {
    alert("Qatorlarni to'liq to'ldiring");
    return;
  }

  users.push({ id: Math.random(), firstName, age, bio });
  makeUsers();
  localStorage.setItem("users", JSON.stringify(users));
  form.reset();
});

function updateUserCount() {
  userCountElement.textContent = `All users: ${userCount}`;
}
