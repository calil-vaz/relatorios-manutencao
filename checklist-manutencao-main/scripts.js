var modal = document.getElementById("modal");
var html = document.querySelector("html");
var body = document.querySelector("body");

const content_img = document.querySelector("#content_img");
const navHeigth = content_img.offsetHeight;

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
  modal.classList.add("modal-visible")
}
function App() {
  const body = document.querySelector("body");
  const contentPDF = document.getElementById("content");
  var bandeira = document.getElementById("selectBandeira");
  var regional = document.getElementById("selectRegional");
  var nomeTecnico = document.getElementById("nameTecnico");
  var filial = document.getElementById("filial");
  var data = document.getElementById("date");
  var gestor = document.getElementById("manager");
  var anotacoes = document.getElementById("anotacoes");
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

  var camposObrigatorios = [
    bandeira,
    regional,
    nomeTecnico,
    filial,
    data,
    gestor,
  ];
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
      position: "right",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
     return;
  }
  mostrarModal()
  const date = data.value.split("-");
  const dateBR = `${date[2]}/${date[1]}/${date[0]}`;

  main.innerHTML = ``;

  main.innerHTML = `
  <div id="content">
  <div id="contentImgPDF">
  <img src="../Images/logo-gp-pereira.svg" style="width: 10rem; margin-left: -4.5rem;" alt="Logo Grupo Pereira">
  </div>
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
          <p>${bandeira.value.toUpperCase()}</p>
          </td>
          <td>
          <p>FILIAL: </p>
          </td>
          <td>
          <p>${filial.value}</p>
          </td>
          </tr>
          <tr>
          <td>
          <p>REGIONAL: </p>
          </td>
          <td>
          <p>${regional.value.toUpperCase()}</p>
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
          <p>${nomeTecnico.value.toUpperCase()}</p>
          </td>
          <td>
          <p>GESTOR: </p>
          </td>
          <td>
          <p>${gestor.value.toUpperCase()}</p>
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
    `;

  const content = document.querySelector("#content");

    html2pdf()
      .set({
        margin: [0, 10, 30, 10],
        filename: `Loja-${filial.value}_técnico-${nomeTecnico.value}_dia-${date[2]}-${date[1]}-${date[0]}.pdf`,
      })
      .from(content)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        const pageCount = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgUrl = "../images/footer.png";

        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          const imgWidth = 210;
          const imgHeight = 15;
          const xPos = (pageWidth - imgWidth) / 2;
          const yPos = pageHeight - imgHeight - 10;

          pdf.addImage(imgUrl, "PNG", xPos, yPos, imgWidth, imgHeight);
        }}
      )
      .save()
  .then(() => {
    window.location.reload();
  });
}
