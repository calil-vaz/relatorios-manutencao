const modal = document.getElementById("modal");
const html = document.querySelector("html");
const body = document.querySelector("body");
const contentImg = document.querySelector("#content_img");
const navHeight = contentImg.offsetHeight;
const savedProfile = localStorage.getItem("savedProfile");
const valores = JSON.parse(savedProfile); // [bandeira, filial, nome, matricula]

function goBack() {
  window.history.back();
}

window.addEventListener("scroll", () => {
  contentImg.classList.toggle("scroll", window.scrollY >= 10);
});

function mostrarModal() {
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  modal.style.visibility = "visible";
  modal.style.display = "flex";
}

function App() {
  const data = document.getElementById("date");
  const main = document.getElementById("main");
  const cardItems = document.querySelectorAll(".cardItem");
  let allFilled = true;
  let itens = [];

  body.classList.add("cssBodyPDF");

  cardItems.forEach((cardItem) => {
    const select = cardItem.querySelector("select.item");
    const input = cardItem.querySelector('input[type="text"]');

    select.classList.remove("invalid");
    input.classList.remove("invalid");

    itens.push({
      numero: cardItem.textContent.trim().split("-")[0] + " - ",
      status: select.value,
      observacoes: input.value,
    });

    if (!select.value) {
      allFilled = false;
      select.classList.add("invalid");
    }

    select.addEventListener("change", () => {
      if (select.value) select.classList.remove("invalid");
    });
  });

  [data].forEach((campo) => {
    campo.classList.remove("invalid");

    campo.addEventListener("input", () => {
      if (campo.value) campo.classList.remove("invalid");
    });

    if (!campo.value) {
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
      style: { background: "red" },
    }).showToast();
    return;
  }

  mostrarModal();

  const [ano, mes, dia] = data.value.split("-");
  const dateBR = `${dia}/${mes}/${ano}`;

  const gerarLinhasTabela = () =>
    itens
      .map(
        (item) => `
      <tr>
        <td class="setor">${item.numero}</td>
        <td style="text-align: center;">${item.status}</td>
        <td>${item.observacoes}</td>
      </tr>`
      )
      .join("");

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
            <th>BANDEIRA:</th><th>${valores[0].toUpperCase()}</th>
            <th>FILIAL:</th><th>${valores[1].toUpperCase()}</th>
            <th>DATA DO RELATÓRIO:</th><th>${dateBR}</th>
          </tr>
        </thead>
      </table>

      <table>
        <thead>
          <tr>
            <th style="width: 25%;">ELABORADO POR:</th>
            <th style="width: 35%;">${valores[2].toUpperCase()}</th>
            <th style="width: 20%;">MATRÍCULA:</th>
            <th style="width: 20%;">${valores[3].toUpperCase()}</th>
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
          pageWidth,
          15
        );
      }

      pdf.save(
        `LOJA ${valores[1]}_CHECKLIST DIÁRIO_DIA-${dia}-${mes}-${ano}.pdf`
      );
    })
    .then(() => {
      window.location.reload();
    });
}
