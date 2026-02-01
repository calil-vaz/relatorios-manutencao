const modal = document.getElementById("modal");
const html = document.querySelector("html");
const body = document.querySelector("body");
const contentImg = document.querySelector("#content_img");
const savedProfile = ProfileUtils.getSavedProfile();

function goBack() {
  UIUtils.goBack();
}

window.addEventListener("scroll", () => {
  contentImg.classList.toggle("scroll", window.scrollY >= 10);
});

function getChecklistNC() {
  return JSON.parse(localStorage.getItem("checklistNC")) || {};
}

function saveChecklistNC(data) {
  localStorage.setItem("checklistNC", JSON.stringify(data));
}

function enviarParaPlanilha(loja, itens) {
  fetch("https://script.google.com/macros/s/AKfycbxxtuHM6dEnNJjPFvFAG-JCPQIduxIznB4DhifHyuoYMpFX7okOJm6po5p8zz8Rgz8TFw/exec", {
    method: "POST",
    body: JSON.stringify({
      loja: loja,
      itens: itens
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log("Planilha atualizada:", res);
  })
  .catch(err => {
    console.error("Erro ao enviar para planilha", err);
  });
}

document.querySelectorAll(".cardItem").forEach(card => {
  const select = card.querySelector("select.item");
  const ssInput = card.querySelector(".ss-input");

  if (!select || !ssInput) return;

  const id = select.id;
  const savedData = getChecklistNC();

  if (savedData[id]) {
    select.value = savedData[id].status;

    if (savedData[id].status === "NC") {
      ssInput.style.display = "block";
      ssInput.value = savedData[id].ss || "";
      ssInput.classList.toggle("invalid", !ssInput.value);
    }
  }

  select.addEventListener("change", () => {
    const data = getChecklistNC();

    if (select.value === "NC") {
      ssInput.style.display = "block";
      ssInput.required = true;

      ssInput.classList.toggle("invalid", !ssInput.value);

      data[id] = {
        status: "NC",
        ss: ssInput.value || ""
      };

      saveChecklistNC(data);
    }

    if (select.value === "C" && data[id]?.status === "NC") {
      const confirmar = confirm(
        "Este item estava como NÃO CONFORME.\nConfirma que o problema foi resolvido?"
      );

      if (confirmar) {
        delete data[id];
        ssInput.value = "";
        ssInput.classList.remove("invalid");
        ssInput.style.display = "none";
        ssInput.required = false;
        saveChecklistNC(data);
      } else {
        select.value = "NC";
        ssInput.style.display = "block";
        ssInput.classList.toggle("invalid", !ssInput.value);
      }
    }

    if (select.value === "NA") {
      ssInput.style.display = "none";
      ssInput.classList.remove("invalid");
      ssInput.required = false;
    }
  });

  ssInput.addEventListener("input", () => {
    const data = getChecklistNC();

    ssInput.classList.toggle("invalid", ssInput.value.trim() === "");

    if (data[id]) {
      data[id].ss = ssInput.value;
      saveChecklistNC(data);
    }
  });
});

function App() {
  const data = document.getElementById("date");
  const main = document.getElementById("main");
  const cardItems = document.querySelectorAll(".cardItem");
  
  const requiredFields = [data];
  const selectFields = [];
  let itens = [];

  body.classList.add("cssBodyPDF");

  cardItems.forEach((cardItem) => {
    const select = cardItem.querySelector("select.item");
    const inputObs = cardItem.querySelector('input[type="text"]:not(.ss-input)');
    const ssInput = cardItem.querySelector('.ss-input');


    if (select) {
      selectFields.push(select);
      requiredFields.push(select);
    }

    itens.push({
      numero: cardItem.textContent.trim().split("-")[0] + " - ",
      status: select ? select.value : "",
      observacoes: inputObs ? inputObs.value : "",
      ss: ssInput && ssInput.value ? ssInput.value : ""
    });
  });

const existeSSInvalida = document.querySelector(".ss-input.invalid");

if (
  !ValidationUtils.validateRequiredFields(requiredFields) ||
  existeSSInvalida
) {
  ValidationUtils.showValidationError();
  return;
}

  UIUtils.showModal();

  const dateBR = ProfileUtils.formatDateBR(data.value);
  const [ano, mes, dia] = data.value.split("-");

  const gerarLinhasTabela = () =>
  itens.map(item => `
    <tr>
      <td class="setor">${item.numero}</td>
      <td style="text-align: center;">${item.status}</td>
      <td>
        ${item.observacoes}
        ${item.ss ? `<div class="ss-pdf"><strong>SS:</strong> ${item.ss}</div>` : ""}
      </td>
    </tr>
  `).join("");


  main.innerHTML = `
    <div id="content">
      <table>
        <thead>
          <tr>
            <th style="text-align: center; font-size: x-large;">
              DEPARTAMENTO DE MANUTENÇÃO
            </th>
          </tr>
        </thead>
      </table>

      <table>
        <thead>
          <tr>
            <th>BANDEIRA:</th><th>${savedProfile[0].toUpperCase()}</th>
            <th>FILIAL:</th><th>${savedProfile[1].toUpperCase()}</th>
            <th>DATA DO RELATÓRIO:</th><th>${dateBR}</th>
          </tr>
        </thead>
      </table>

      <table>
        <thead>
          <tr>
            <th style="width: 25%;">ELABORADO POR:</th>
            <th style="width: 35%;">${savedProfile[2].toUpperCase()}</th>
            <th style="width: 20%;">MATRÍCULA:</th>
            <th style="width: 20%;">${savedProfile[3].toUpperCase()}</th>
          </tr>
        </thead>
      </table>

      <div class="textPDF">
        STATUS: "C" CONFORME - "NC" NÃO CONFORME - "NA" NÃO SE APLICA 
      </div>

      <table>
        <thead>
          <tr>
            <th>SETOR</th><th>STATUS</th><th>OBSERVAÇÕES</th>
          </tr>
        </thead>
        <tbody>
          ${gerarLinhasTabela()}
        </tbody>
      </table>
    </div>
  `;


const loja = savedProfile[1]; 

const registros = itens.map(item => {
  let valor = "";

  if (item.status === "NC" && item.ss) {
    valor = `NC - ${item.ss}`;
  } else if (item.status === "C") {
    valor = "C";
  } else if (item.status === "NA") {
    valor = "NA";
  }

  return {
    setor: item.numero.replace("-", "").trim(),
    [dateBR]: valor
  };
});

enviarParaPlanilha(loja, registros);

  const element = document.getElementById("content");
  const filename = `LOJA ${savedProfile[1]}_CHECKLIST DIÁRIO_DIA-${dia}-${mes}-${ano}.pdf`;

  PDFUtils.generatePDF(element, filename, () => {
    window.location.reload();
  });
}
