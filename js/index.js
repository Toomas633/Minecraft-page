document.addEventListener("DOMContentLoaded", function () {
  const serverIp = "vanilla.toomas633.com";

  const statusElement = document.getElementById("status");

  function translateAlternateColorCodes(message) {
    const colorCodes = {
      0: "color: #000000;",
      1: "color: #0000AA;",
      2: "color: #00AA00;",
      3: "color: #00AAAA;",
      4: "color: #AA0000;",
      5: "color: #AA00AA;",
      6: "color: #FFAA00;",
      7: "color: #AAAAAA;",
      8: "color: #555555;",
      9: "color: #5555FF;",
      a: "color: #55FF55;",
      b: "color: #55FFFF;",
      c: "color: #FF5555;",
      d: "color: #FF55FF;",
      e: "color: #FFFF55;",
      f: "color: #FFFFFF;",
      k: "text-shadow: 0.05em 0.05em #000000;",
      l: "font-weight: bold;",
      m: "text-decoration: line-through;",
      n: "text-decoration: underline;",
      o: "font-style: italic;",
    };

    let formattedMessage = message.replace(
      /&([0-9A-FK-OR])/g,
      function (match, code) {
        return `<span style="${colorCodes[code.toLowerCase()]}">`;
      }
    );

    formattedMessage = formattedMessage.replace(/&r/g, "</span>");

    return formattedMessage;
  }

  function updateServerStatus() {
    fetch(`https://api.mcsrvstat.us/2/${serverIp}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.online) {
          const {
            players,
            version,
            description,
            favicon,
            motd,
            software,
            plugins,
            website,
          } = data;

          let statusText = "<strong>Online</strong>";
          let statusClass = "online";
          if (!data.online) {
            statusText = "<strong>Offline</strong>";
            statusClass = "offline";
          }

          let html = `
              <div class="server-info">
                <img src="/icons/fav.png" alt="Server Icon">
                <div>
                  <div class="status ${statusClass}">Server is ${statusText}</div>
                  <div class="player-count">${
                    players.online
                  } players online</div>
                  <div class="version">Version: ${version} (${software})</div>
                  <div class="description">MOTD: ${translateAlternateColorCodes(
                    motd.html.join("<br>")
                  )}</div>
                </div>
              </div>
            `;

          if (plugins) {
            const pluginList = plugins.raw
              .map((plugin) => `<li>${plugin}</li>`)
              .join("");
            html += `
                  <div class="plugins-players">
                    <div class="plugins">
                      <div class="toggle-plugins">Plugins (${plugins.names.length}) ⮟</div>
                      <ul class="plugin-list">${pluginList}</ul>
                    </div>
                `;
          }

          if (players && players.online > 0) {
            const playerList = players.list
              .map(
                (
                  player
                ) => `<li><img class="player-head" src="https://minotar.net/avatar/${player}/25.png" alt="Player Head">
                <div class="player-name">${player}</div></li>`
              )
              .join("");

            html += `
                <div class="players">
                  <div class="toggle-players">Players (${players.online}) ⮟</div>
                  <ul class="player-list">${playerList}</ul>
                </div>
              </div>
            `;
          } else {
            html += `
              <div class="players">
                <div class="toggle-players">Players (${players.online}) ⮟</div>
                <ul class="player-list">None</ul>
              </div>
            </div>
            `;
          }

          statusElement.innerHTML = html;

          const togglePlugins = document.querySelector(".toggle-plugins");
          const pluginList = document.querySelector(".plugin-list");

          togglePlugins.addEventListener("click", function () {
            pluginList.style.display =
              pluginList.style.display === "none" ? "block" : "none";
          });

          const togglePlayers = document.querySelector(".toggle-players");
          const playerList = document.querySelector(".player-list");

          togglePlayers.addEventListener("click", function () {
            playerList.style.display =
              playerList.style.display === "none" ? "block" : "none";
          });
        } else {
          statusElement.innerHTML =
            "<div class='status offline'>Server is <strong>Offline</strong></div>";
        }
      })
      .catch((error) => {
        console.error(error);
        statusElement.innerHTML =
          "<div class='status offline'>Error: Failed to fetch server status</div>";
      });
  }

  updateServerStatus();
});

const copyLinkButton = document.getElementById("copy-ip-button");
const textToCopy = "vanilla.toomas633.com";
copyLinkButton.addEventListener("click", (e) => {
  e.preventDefault();
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  copyLinkButton.innerHTML = 'Copied!';
  setTimeout(() => {
    copyLinkButton.innerHTML = 'Copy IP';
  }, 3000);
});