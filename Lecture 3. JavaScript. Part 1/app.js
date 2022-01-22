document.getElementById("add").addEventListener("click", AddItemToList);
document.getElementById("remove").addEventListener("click", RemoveItemFromList);

const inputText = document.getElementById("input-text");
const itemsContainer = document.getElementById("items-container");

CheckLocalStorage();
PrintListOfItems();

function CheckLocalStorage() {
  let list = JSON.parse(localStorage.getItem("list"));
  if (list && list.length > 20) {
    list = list.slice(0, 20);
    localStorage.setItem("list", JSON.stringify(list));
  }
}

function PrintItem(item) {
  let component = document.createElement("div");
  component.innerText = item;
  component.className = "card";
  itemsContainer.append(component);
}

function PrintListOfItems() {
  for (let i of JSON.parse(localStorage.getItem("list"))) {
    PrintItem(i);
  }
}

function AddItemToList() {
  let item = inputText.value;
  if (item !== "") {
    if (localStorage.getItem("list") === null) {
      localStorage.setItem("list", JSON.stringify([]));
    }

    let listOfItems = JSON.parse(localStorage.getItem("list"));

    if (listOfItems.length < 20) {
      listOfItems.push(item);
      localStorage.setItem("list", JSON.stringify(listOfItems));
      inputText.value = "";
      PrintItem(item);
    } else {
      alert("Sorry, you can not input more than 20 values");
    }
  } else {
    alert("You can not add empty value");
  }
}

function RemoveItemFromList() {
  if (
    localStorage.getItem("list") === null ||
    JSON.parse(localStorage.getItem("list")).length === 0
  ) {
    alert("There is no items you can remove");
  } else {
    const listOfItems = JSON.parse(localStorage.getItem("list"));
    listOfItems.splice(0, 1);
    localStorage.setItem("list", JSON.stringify(listOfItems));

    let firstItem = document.querySelector(".card:first-child");
    itemsContainer.removeChild(firstItem);
  }
}
