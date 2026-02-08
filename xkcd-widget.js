(function () {
  const container = document.currentScript.previousElementSibling;

  if (!container || !container.classList.contains("xkcd-widget")) {
    console.error("xkcd-widget: container div not found");
    return;
  }

  // Create elements
  const img = document.createElement("img");
  const alt = document.createElement("p");
  const link = document.createElement("a");

  img.style.maxWidth = "100%";
  img.style.height = "auto";

  link.href = "https://xkcd.com/";
  link.textContent = "View on xkcd.com";
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  container.appendChild(img);
  container.appendChild(alt);
  container.appendChild(link);

  // Fetch latest comic
  fetch("https://xkcd.vercel.app/?comic=latest")
    .then(res => res.json())
    .then(data => {
      img.src = data.img;
      img.alt = data.alt;
      alt.textContent = data.alt;
    })
    .catch(err => {
      alt.textContent = "Failed to load xkcd 😢";
      console.error("xkcd-widget error:", err);
    });
})();
