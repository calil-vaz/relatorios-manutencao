var horaIncidente = document.getElementById("horaIncidente");
var modal = document.getElementById("modal");
var dataAquisicao = document.getElementById("dataAquisicao");
var html = document.querySelector("html");
var body = document.querySelector("body");
const savedProfile = localStorage.getItem("savedProfile");
const valores = JSON.parse(savedProfile);

function goBack() {
  window.history.back();
}

const requiredInputs = [
  document.getElementById("date"),
  document.getElementById("primeiroPonto"),
  document.getElementById("segundoPonto"),
  document.getElementById("terceiroPonto"),
  document.getElementById("quartoPonto"),
  document.getElementById("quintoPonto"),
];

function mostrarModal() {
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  modal.style.visibility = "visible";
  modal.style.display = "flex";
}

const inputs = document.querySelectorAll('input[type="file"]');

inputs.forEach((input) => {
  const label = document.querySelector(`label[for=${input.id}]`);

  input.addEventListener("change", function () {
    if (input.files.length > 0) {
      label.classList.add("selected");
      label.textContent = "Imagem Selecionada";
    }
  });
});

function formatarData(data) {
  let date = data.split("-");
  const dateBR = `${date[2]}/${date[1]}/${date[0]}`;
  return dateBR;
}

function handleImageSelection(input, imageId) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      const targetCell = document.getElementById(imageId);
      targetCell.innerHTML = "";
      targetCell.appendChild(imgElement);
    };

    reader.readAsDataURL(file);
  } else {
    alert("Por favor, selecione ou tire uma foto.");
  }
}

function generatePDF() {
  let allFieldsFilled = true;

  requiredInputs.forEach((input) => {
    if (!input.value) {
      input.style.border = "2px solid red";
      allFieldsFilled = false;
    } else {
      input.style.border = "1px solid var(--background-blue)";
    }
  });

  if (!allFieldsFilled) {
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

  let valorPontoUm = document.createElement("div");

  valorPontoUm.innerHTML = `
     <div style="margin-left: 26rem; margin: 0; border: none" class="cardTemperatura">
              _________
              _________
              _________
              _________
            </div>  
  `
  valorPontoUm.style.color = "white"
  
  content.innerHTML = `
            
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center; font-size: x-large;">
                            CHECKLIST DIÁRIO - CHECAGEM DE TEMPERATURA
                        </th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 25%;">BANDEIRA:</th>
                        <th style="width: 25%;">${valores[0].toUpperCase()}</th>
                        <th>FILIAL</th>
                        <th>${valores[1].toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th>REGIONAL:</th>
                        <th>${valores[4].toUpperCase()}</th>
                        <th>DATA:</th>
                        <th>${requiredInputs[0].value.toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th>TÉCNICO:</th>
                        <th>${valores[2].toUpperCase()}</th>
                        <th>GESTOR DE
                        <br>
                         MANUTENÇÃO</th>
                        <th>${valores[3].toUpperCase()}</th>
                    </tr>
                    
                </thead>
            </table>

            <table>
                <thead>
                    <tr>
                        <th style="text-align: center; height: 30px; font-size: 18px;">CHECAGEM DA TEMPERATURA AMBIENTE DA LOJA EM CINCO PONTOS</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 30%; height: 30px;">
                            1º PONTO – SAÍDA DEPÓSITO
                            (PAREDÃO)
                        </th>
                        <th>${requiredInputs[1].value.toUpperCase()}°C</th>
                    </tr>
                    <tr>
                        <th style="width: 30%; height: 30px;">
                            2º PONTO – BEBIDAS
                        </th>
                        <th>${requiredInputs[2].value.toUpperCase()}°C</th>
                    </tr>
                    <tr>
                        <th style="width: 30%; height: 30px;">
                            3º PONTO – CENTRO DA LOJA
                        </th>
                        <th>${requiredInputs[3].value.toUpperCase()}°C</th>
                    </tr>
                    <tr>
                        <th style="width: 30%; height: 30px;">
                            4º PONTO – FRENTE DE CAIXA
                        </th>
                        <th>${requiredInputs[4].value.toUpperCase()}°C</th>
                    </tr>
                    <tr>
                        <th style="width: 30%; height: 30px;">
                            5º PONTO – FLV / PERECÍVEIS
                        </th>
                        <th>${requiredInputs[5].value.toUpperCase()}°C</th>
                    </tr>
                    </thead>
            </table>           
            <div style="margin-left: 26rem; margin-top: 4rem;" class="cardTemperatura">
              <p style="margin: 0;">1° SAÍDA DO DEPÓSITO - PAREDÃO ${requiredInputs[1].value.toUpperCase()}°C</p>
            </div>                   
            <div style="margin-left: 35rem; margin-top: 10.5rem;" class="cardTemperatura">
              <p style="margin: 0;">2° BEBIDAS ${requiredInputs[2].value.toUpperCase()}°C</p>
            </div>                   
            <div style="margin-left: 16.5rem; margin-top: -3.5rem;" class="cardTemperatura">
              <p style="margin: 0;">3° CENTRO <br> DA LOJA ${requiredInputs[3].value.toUpperCase()}°C</p>
            </div>                   
            <div style="margin-left: 3rem; margin-top: -9rem;" class="cardTemperatura">
              <p style="margin: 0;">5° FLV E PERECÍVEIS ${requiredInputs[5].value.toUpperCase()}°C</p>
            </div>                   
            <div style="margin-left: 15rem; margin-top: 12rem;" border-bottom: 1px black solid class="cardTemperatura">
              <p style="margin: 0;">4° FRENTE DE CAIXA ${requiredInputs[4].value.toUpperCase()}°C</p>
            </div>                   
  `;

  content.append(valorPontoUm);

  document.getElementById("content").style.display = "block";
  const element = document.getElementById("content");
  mostrarModal();

  html2pdf()
    .set({
      margin: [25, 0, 15, 0], 
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .toPdf()
    .get("pdf")
    .then((pdf) =>
    pdf.addImage("../Images/setas-temperatura.png", "PNG", 44, 150, 120, 120))
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
        `LOJA ${valores[1].toUpperCase()}-CHECAGEM DE TEMPERATURA-${requiredInputs[0].value}.pdf`
      );
    })
    .then(() => {
      window.location.reload();
    });
}

requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value) {
      input.style.border = "1px solid var(--background-blue)";
    } else {
      input.style.border = "1px solid red"; 
    }
  });
});
