async function fetchData(type) {
  const res = await fetch(`/.netlify/functions/lastfm?type=${type}`);
  return res.json();
}

async function loadRecent() {
  const data = await fetchData("recent");
  const list = document.getElementById("recent");
  list.innerHTML = "";
  (data.recenttracks.track || []).forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.artist["#text"]} – ${t.name}`;
    list.appendChild(li);
  });
}

async function loadNow() {
  const data = await fetchData("now");
  const now = document.getElementById("now");
  const track = (data.recenttracks.track || []).find(t => t["@attr"]?.nowplaying);
  now.textContent = track ? `${track.artist["#text"]} – ${track.name}` : "Nema aktivne svirke";
}

loadRecent();
loadNow();
setInterval(loadNow, 15000); // osvježava svakih 15 sekundi
