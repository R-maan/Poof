let poofBtn = document.getElementById("poofBtn");
let repoBtn = document.getElementById("repoBtn");
let msg = document.getElementById("msg");

repoBtn.addEventListener("click", async () => {
  open("https://github.com/R-maan/Poof");
})

poofBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: hideSections,
  });
  msg.innerText = "To see the hidden files again, you need to refresh the page.";
  msg.classList.add('para');

  poofBtn.style.active = false;
  poofBtn.classList.remove('poofBtn');
  poofBtn.classList.add('deactiveBtn');
});

function hideSections() {
  let changedFilesCounter = document.getElementById("files_tab_counter").title;
  let filesVisited = 0;
  while (changedFilesCounter > filesVisited) {
    window.scrollTo(0, document.body.scrollHeight);
    /** @type {HTMLElement} */
    let sections = document.getElementsByClassName("js-targetable-element")
    for (section of sections) {
      filesVisited++;
      let fileAddress = section.firstElementChild.firstElementChild.getElementsByClassName("Link--primary");
      if (fileAddress[0].title.includes("vendor/") ||
          fileAddress[0].title.includes("resources/") ||
          fileAddress[0].title.includes(".circleci/") ||
          fileAddress[0].title.includes(".gen.go") ||
          fileAddress[0].title.includes("go.mod") ||
          fileAddress[0].title.includes("go.sum")) {
        section.style.display = 'none';
      }
    }
 }
 window.scrollTo(0, 0);
}


