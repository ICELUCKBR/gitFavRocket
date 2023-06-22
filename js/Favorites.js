//class que vai conter a logica dos dados
//Como os dados serão distriubidos

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    const entries  = localStorage.getItem('@github-favorites:')
   this.entries = []


  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    this.entries = filteredEntries;
    this.update();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector("table tbody");
    this.update();
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;
      row.querySelector(".action").onclick = () => {
        const isOk = confirm("Tem certeza que você quer remover essa linha?");
        if (isOk) {
          this.delete(user);
        }
      };

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    const content = `

            <td class="user">
              <img
                src="https://github.com/iceluckbr.png"
                alt="imagem de allan Garcia"
              />
              <a href="https://github.com/iceluckbr" target="_blank">
                <p>Allan Garcia</p>
                <span>/iceluckbr</span>
              </a>
            </td>
            <td class="repositories">33</td>
            <td class="followers">18</td>
            <td class="action"><button>Remover</button></td>
          `;

    tr.innerHTML = content;

    return tr;
  }
  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
