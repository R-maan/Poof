const conditions = ["vendor/", "resources/"];

let poofBtn = document.getElementById("poofBtn");
let msg = document.getElementById("msg");


poofBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: hideSections,
  });
  msg.innerText = "To see them again, you need to refresh the page.";
  msg.classList.add('para');

  poofBtn.style.display = 'none';
});

function hideSections() {
  /** @type {HTMLElement} */
  let sections = document.getElementsByClassName("js-targetable-element")
  for (section of sections) {
    let fileAddress = section.firstElementChild.firstElementChild.getElementsByClassName("Link--primary");
    if (fileAddress[0].innerText.includes("vendor/") ||
        fileAddress[0].innerText.includes("resources/") ||
        fileAddress[0].innerText.includes(".circleci/") ||
        fileAddress[0].innerText.includes(".gen.go") ||
        fileAddress[0].innerText.includes("go.mod") ||
        fileAddress[0].innerText.includes("go.sum")) {
      section.style.display = 'none';
    }
  }  
}