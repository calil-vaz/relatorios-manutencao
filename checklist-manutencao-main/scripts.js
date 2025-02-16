var modal = document.getElementById("modal");
var html = document.querySelector("html");
var body = document.querySelector("body");
const content_img = document.querySelector("#content_img");
const navHeigth = content_img.offsetHeight;
const savedProfile = localStorage.getItem("savedProfile");
const valores = JSON.parse(savedProfile);

function goBack() {
  window.history.back();
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    content_img.classList.add("scroll");
  } else {
    content_img.classList.remove("scroll");
  }
});
function mostrarModal() {
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  modal.style.visibility = "visible";
  modal.style.display = "flex";
}
function App() {
  const body = document.querySelector("body");
  var data = document.getElementById("date");
  const main = document.getElementById("main");
  let allFilled = true;
  body.classList.add("cssBodyPDF");

  var itens = [];

  var cardItems = document.querySelectorAll(".cardItem");
  cardItems.forEach(function (cardItem) {
    var select = cardItem.querySelector("select.item");
    var input = cardItem.querySelector('input[type="text"]');

    select.classList.remove("invalid");
    input.classList.remove("invalid");

    itens.push({
      numero: cardItem.textContent.trim().split("-")[0] + " - ",
      status: select.value,
      observacoes: input.value,
    });

    if (select.value === "") {
      allFilled = false;
      select.classList.add("invalid");
    }

    select.addEventListener("change", function () {
      if (select.value !== "") {
        select.classList.remove("invalid");
      }
    });
  });

  var camposObrigatorios = [data];
  camposObrigatorios.forEach(function (campo) {
    campo.classList.remove("invalid");

    campo.addEventListener("change", function () {
      if (campo.value !== "") {
        campo.classList.remove("invalid");
      }
    });

    campo.addEventListener("input", function () {
      if (campo.value !== "") {
        campo.classList.remove("invalid");
      }
    });

    if (campo.value === "") {
      allFilled = false;
      campo.classList.add("invalid");
    }
  });

  if (!allFilled) {
    Toastify({
      text: "Preencha todos os campos obrigatórios",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
    return;
  }
  mostrarModal();
  const date = data.value.split("-");
  const dateBR = `${date[2]}/${date[1]}/${date[0]}`;

  main.innerHTML = ``;

  main.innerHTML = `
  <div id="content">
        <table>
          <thead>
            <tr>
                <th>
                  DEPARTAMENTO DE MANUTENÇÃO
                </th>
            </tr>
          </thead>
          <thead>
            <tr>
                <th>
                  CHECKLIST DIÁRIO - TÉCNICO DE MANUTENÇÃO
                </th>
            </tr>
          </thead>
        
        </table>
        <table>
          <tbody>
          <tr>
          <td>
          <p>BANDEIRA: </p>
          </td>
          <td>
          <p>${valores[0].toUpperCase()}</p>
          </td>
          <td>
          <p>FILIAL: </p>
          </td>
          <td>
          <p>${valores[1]}</p>
          </td>
          </tr>
          <tr>
          <td>
          <p>REGIONAL: </p>
          </td>
          <td>
          <p>${valores[4].toUpperCase()}</p>
          </td>
          <td>
          <p>DATA: </p>
          </td>
          <td>
          <p>${dateBR}</p>
          </td>
          </tr>
          <tr>
          <td>
          <p>TÉCNICO: </p>
          </td>
          <td>
          <p>${valores[2].toUpperCase()}</p>
          </td>
          <td>
          <p>GESTOR: </p>
          </td>
          <td>
          <p>${valores[3].toUpperCase()}</p>
          </td>
          </tr>
        </tbody>
        </table>
  
        <table>
        <div class="textPDF">
          STATUS: "C" CONFORME - "NC" NÃO CONFORME - "NA" NÃO SE APLICA 
        </div>
        </div>
        
    <thead>
    <tr>
        <th>SETOR</th>
        <th>STATUS</th>
        <th>OBSERVAÇÕES</th>
    </tr>
    </thead>
    <tbody>
      <tr>
            <td class="setor">${itens[0].numero}</td>
            <td style="text-align: center;">${itens[0].status}</td>
            <td>${itens[0].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[1].numero}</td>
            <td style="text-align: center;">${itens[1].status}</td>
            <td>${itens[1].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[2].numero}</td>
            <td style="text-align: center;">${itens[2].status}</td>
            <td>${itens[2].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[3].numero}</td>
            <td style="text-align: center;">${itens[3].status}</td>
            <td>${itens[3].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[4].numero}</td>
            <td style="text-align: center;">${itens[4].status}</td>
            <td>${itens[4].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[5].numero}</td>
            <td style="text-align: center;">${itens[5].status}</td>
            <td>${itens[5].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[6].numero}</td>
            <td style="text-align: center;">${itens[6].status}</td>
            <td>${itens[6].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[7].numero}</td>
            <td style="text-align: center;">${itens[7].status}</td>
            <td>${itens[7].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[8].numero}</td>
            <td style="text-align: center;">${itens[8].status}</td>
            <td>${itens[8].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[9].numero}</td>
            <td style="text-align: center;">${itens[9].status}</td>
            <td>${itens[9].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[10].numero}</td>
            <td style="text-align: center;">${itens[10].status}</td>
            <td>${itens[10].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[11].numero}</td>
            <td style="text-align: center;">${itens[11].status}</td>
            <td>${itens[11].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[12].numero}</td>
            <td style="text-align: center;">${itens[12].status}</td>
            <td>${itens[12].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[13].numero}</td>
            <td style="text-align: center;">${itens[13].status}</td>
            <td>${itens[13].observacoes}</td>
        </tr>
      <tr>
            <td class="setor">${itens[14].numero}</td>
            <td style="text-align: center;">${itens[14].status}</td>
            <td>${itens[14].observacoes}</td>
        </tr>              
        </tbody>
        </table>
        
        </div>
    </div>
    <p style="color: white;"> 
            _________________
            _________________
            _________________
            _________________
            _________________
            _________________
            _________________
            </p>
    `;

  const element = document.getElementById("content");

  html2pdf()
    .set({
      margin: [30, 0, 20, 0],
      html2canvas: { scale: window.devicePixelRatio > 1 ? 3 : 2 },
      jsPDF: { format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      const pageCount = pdf.internal.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.addImage("../Images/logo-gp-pereira 2.png", "PNG", 85, -4, 40, 40);
        pdf.addImage(
          "../Images/footer.png",
          "PNG",
          0,
          pageHeight - 20,
          pageWidth - 0,
          15
        );
      }
      pdf.save(
        `LOJA ${valores[1]}_CHECKLIST DIÁRIO_DIA-${date[2]}-${date[1]}-${date[0]}.pdf`
      );
    })
    .then(() => {
      window.location.reload();
    });
}
