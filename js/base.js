function toggleNav() {
  let sidebar = document.getElementById("Sidebar");
  let content = document.getElementById("Content");
  if (sidebar.style.width === "150px") {
    sidebar.style.width = "0";
    content.style.right = "0";
    content.style.width = "100%";
  } else {
    sidebar.style.width = "150px";
    content.style.right = "150px";
    content.style.width = "calc(100% - 150px)";
  }
}
