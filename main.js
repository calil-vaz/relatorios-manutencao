const modalEditProfile = document.getElementById("content-profile");
const iconUser = document.getElementById("icon-user");
const containerInputsProfile = document.getElementById("containerInputsProfile");

window.addEventListener("load", function () {
  const savedInputs = localStorage.getItem("savedInputs");
  const savedProfile = localStorage.getItem("savedProfile");

  if (savedInputs && savedProfile) {
    containerInputsProfile.innerHTML = savedInputs;
    closeProfile();
  } else {
    editProfile();
  }
});

function verificarPerfil(event) {
  if (!ProfileUtils.hasValidProfile()) {
    iconUser.style.color = "red";
    
    Toastify({
      text: "Preencha seu perfil",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: { background: "red" }
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
  const fields = [
    document.getElementById("selectBandeira"),
    document.getElementById("storeProfile"),
    document.getElementById("nameTechnical"),
    document.getElementById("matricula"),
    document.getElementById("gestor"),
    document.getElementById("regional")
  ];

  if (!ValidationUtils.validateRequiredFields(fields)) {
    ValidationUtils.showValidationError();
    return;
  }

  const [bandeira, loja, tecnico, matricula, gestor, regional] = fields.map(field => field.value);

  containerInputsProfile.innerHTML = generateProfileHTML(bandeira, loja, tecnico, matricula, gestor, regional);

  const profileData = [bandeira, loja, tecnico, matricula, gestor, regional];
  localStorage.setItem("savedProfile", JSON.stringify(profileData));
  localStorage.setItem("savedInputs", containerInputsProfile.innerHTML);

  iconUser.style.color = "black";
  UIUtils.showSuccessToast("Perfil salvo com sucesso!");

  closeProfile();
}

function generateProfileHTML(bandeira, loja, tecnico, matricula, gestor, regional) {
  const bandeirasOptions = CONFIG.BANDEIRAS.map(b => 
    `<option value="${b}">${b}</option>`
  ).join('');

  const regionaisOptions = CONFIG.REGIONAIS.map(r => 
    `<option value="${r}">${r}</option>`
  ).join('');

  return `
    <div>
      <h2 style="margin: 1rem 0;">EDITAR PERFIL</h2>
      <label for="selectBandeira">Bandeira:</label><br>
      <select required id="selectBandeira">
        <option value="${bandeira}">Atual: ${bandeira}</option>
        ${bandeirasOptions}
      </select><br>
      
      <label for="storeProfile">Loja:</label><br>
      <input required value="${loja}" type="number" id="storeProfile" placeholder="${loja}"><br>
      
      <label for="nameTechnical">TÉCNICO: <span style="color: red; font-size: small;">(digite seu nome completo)</span></label><br>
      <input required value="${tecnico}" id="nameTechnical" type="text" placeholder="${tecnico}"><br>
      
      <label for="matricula">MATRÍCULA</label><br>
      <input required id="matricula" value="${matricula}" type="number" placeholder="${matricula}"><br>
      
      <label for="gestor">GESTOR: <span style="color: red; font-size: small;">(nome completo)</span></label><br>
      <input required value="${gestor}" id="gestor" type="text" placeholder="${gestor}"><br>
      
      <label for="regional">REGIONAL:</label><br>
      <select required name="regional" id="regional">
        <option value="${regional}">${regional}</option>
        ${regionaisOptions}
      </select>
    </div>
    <div style="width: 17rem; display: flex; justify-content: space-between;">
      <button id="save_profile" onclick="saveProfile()">Salvar</button>
      <button id="close_profile" onclick="closeProfile()">Cancelar</button>
    </div>
  `;
}
