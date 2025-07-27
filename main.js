const modalEditProfile = document.getElementById("content-profile");
const iconUser = document.getElementById("icon-user");
let bandeira = document.getElementById("selectBandeira");
let regional = document.getElementById("regional");
let loja = document.getElementById("storeProfile");
let tecnico = document.getElementById("nameTechnical");
let matricula = document.getElementById("matricula");
let gestor = document.getElementById("gestor");
const containerInputsProfile = document.getElementById("containerInputsProfile");

window.addEventListener("load", function () {
  const savedInputs = localStorage.getItem("savedInputs");
  const savedProfile = localStorage.getItem("savedProfile");

  if (savedInputs && savedProfile) {
    if (savedInputs.includes('id="matricula"')) {
      containerInputsProfile.innerHTML = savedInputs;
    } else {
      Toastify({
        text: "Seu perfil está desatualizado. Atualize para continuar.",
        duration: 5000,
        gravity: "top",
        position: "center",
        style: {
          background: "#f39c12",
        },
      }).showToast();

      localStorage.removeItem("savedInputs");
      localStorage.removeItem("savedProfile");

      editProfile();
    }
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
    let matricula = document.getElementById("matricula").value;
    let gestor = document.getElementById("gestor").value;
    let regional = document.getElementById("regional").value;
    if (!bandeira || !loja || !tecnico || !gestor || !regional || !matricula) {
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
      <h2 style="margin: 1rem 0;">EDITAR PERFIL</h2>
        <label for="selectBandeira"l>Bandeira:</label>
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
        <label for="storeProfile">Loja:</label>
        <br>
        <input required value="${loja}" type="number" id="storeProfile" placeholder="${loja}">
        <br>
        <label for="nameTechnical">TÉCNICO: <span style="color: red; font-size: small;">(digite seu nome completo)</span></label>
        <br>
        <input required value="${tecnico}" id="nameTechnical" type="text" placeholder="${tecnico}">
      <br>      
      <label for="matricula">MATRÍCULA</label><br>
      <input required id="matricula"  value="${matricula}" type="number" placeholder=${matricula}><br>
                <label for="gestor">GESTOR: <span style="color: red; font-size: small;">(nome completo)</span></label>
                <br>
                <input required value="${gestor}" id="gestor" type="text"   placeholder="${gestor}">
                <br>
                <label for="regional">REGIONAL:</label>
                <br>
                <select required name="regional" id="regional">
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
    const valueProfile = [bandeira, loja, tecnico, matricula, gestor, regional ];
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
    
    console.log(valores);
    closeProfile();
  }
