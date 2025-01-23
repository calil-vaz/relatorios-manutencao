const modalEditProfile = document.getElementById("content-profile");
const iconUser = document.getElementById("icon-user");
let bandeira = document.getElementById("selectBandeira");
let regional = document.getElementById("regional");
let loja = document.getElementById("storeProfile");
let tecnico = document.getElementById("nameTechnical");
let gestor = document.getElementById("gestor");
const containerInputsProfile = document.getElementById("containerInputsProfile");

window.addEventListener("load", function () {
    let savedInputs = localStorage.getItem("savedInputs");
    if (savedInputs) {
      containerInputsProfile.innerHTML = savedInputs;
    }
  });

function verificarPerfil(event) {
    if (localStorage.getItem("savedProfile") == null) {
        iconUser.style.color = "red";
        Toastify({
          text: "Preencha seu perfil",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "red",
          },
        }).showToast();
        event.preventDefault();
        return;
      }
}

function editProfile() {
    modalEditProfile.style.display = "block";
    modalEditProfile.style.visibility = "visible";
  }
  function closeProfile() {
    modalEditProfile.style.display = "none";
    modalEditProfile.style.visibility = "hidden";
  }
  function saveProfile() {
    let bandeira = document.getElementById("selectBandeira").value;
    let loja = document.getElementById("storeProfile").value;
    let tecnico = document.getElementById("nameTechnical").value;
    let gestor = document.getElementById("gestor").value;
    let regional = document.getElementById("regional").value;
    if (!bandeira || !loja || !tecnico || !gestor || !regional) {
      Toastify({
        text: "Preencha todos os campos",
        duration: 3000,
        close: true,
        gravity: "center",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "red",
        },
      }).showToast();
      return;
    }
    containerInputsProfile.innerHTML = `
      <div>
        <label>Bandeira:</label>
        <br>
        <select required id="selectBandeira">
          <option value="${bandeira}">Atual: ${bandeira}</option>
          <option value="Fort Atacadista">Fort Atacadista</option>
          <option value="Sempre Fort">Sempre Fort</option>
          <option value="Bate Fort">Bate Fort</option>
          <option value="Comper">Comper</option>
          <option value="Perlog">Perlog</option>
          <option value="Fort Atacadista Posto">Fort Atacadista Posto</option>
        </select>
        <br>
        <label>Loja:</label>
        <br>
        <input value="${loja}" type="number" id="storeProfile" placeholder="${loja}">
        <br>
        <label>Técnico:</label>
        <br>
        <input value="${tecnico}" id="nameTechnical" type="text" placeholder="${tecnico}">
      <br>
                <label>GESTOR:</label>
                <br>
                <input value="${gestor}" id="gestor" type="text"   placeholder="${gestor}">
                <br>
                <label>REGIONAL:</label>
                <br>
                <select name="regional" id="regional">
                    <option value="${regional}">${regional}</option>
                    <option value="Distrito Federal">Distrito Federal</option>
                    <option value="Goiás">Goiás</option>
                    <option value="Mato Grosso">Mato Grosso</option>
                    <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                    <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                    <option value="Santa Catarina">Santa Catarina</option>
                    <option value="São Paulo">São Paulo</option>
                </select>
            </div>
            <div style="width: 17rem; display: flex; justify-content: space-between;">
                <button id="save_profile" onclick="saveProfile()">Salvar</button>
                <button id="close_profile" onclick="closeProfile()">Cancelar</button>
            </div>
    `;
    const valueProfile = [bandeira, loja, tecnico, gestor, regional ];
    localStorage.setItem("savedProfile", JSON.stringify(valueProfile));
    localStorage.setItem("savedInputs", containerInputsProfile.innerHTML);
    iconUser.style.color = "black";
    Toastify({
      text: "Perfil salvo com sucesso!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#28a745",
      },
    }).showToast();

    const savedProfile = localStorage.getItem("savedProfile");
    const valores = JSON.parse(savedProfile);

    closeProfile();
  }
