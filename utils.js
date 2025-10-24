
const CONFIG = {
  BANDEIRAS: [
    "Fort Atacadista",
    "Sempre Fort", 
    "Bate Fort",
    "Comper",
    "Perlog",
    "Fort Atacadista Posto",
    "Trudys"
  ],
  REGIONAIS: [
    "Distrito Federal",
    "Goiás",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Rio Grande do Sul",
    "Santa Catarina",
    "São Paulo"
  ],
  PDF_CONFIG: {
    margin: [30, 0, 20, 0],
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      format: "a4", 
      orientation: "portrait",
      compress: true
    },
    pagebreak: { mode: ["css", "legacy"] }
  }
};

const ProfileUtils = {
  getSavedProfile() {
    const savedProfile = localStorage.getItem("savedProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  },

  hasValidProfile() {
    const profile = this.getSavedProfile();
    return profile && profile.length >= 6;
  },

  formatDateBR(dateString) {
    const [ano, mes, dia] = dateString.split("-");
    return `${dia}/${mes}/${ano}`;
  }
};

const ValidationUtils = {
  validateRequiredFields(fields) {
    let allValid = true;
    
    fields.forEach(field => {
      field.classList.remove("invalid", "error");
      
      if (!field.value || field.value.trim() === "") {
        allValid = false;
        field.classList.add("invalid", "error");
      }
      
      field.addEventListener("input", () => {
        if (field.value && field.value.trim() !== "") {
          field.classList.remove("invalid", "error");
        }
      });
    });
    
    return allValid;
  },

  showValidationError() {
    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: "Preencha todos os campos obrigatórios",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: { background: "red" }
      }).showToast();
    }
  }
};

const PDFUtils = {
  generatePDF(element, filename, callback) {
    html2pdf()
      .set(CONFIG.PDF_CONFIG)
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
          pdf.addImage("../Images/footer.png", "PNG", 0, pageHeight - 20, pageWidth, 15);
        }

        pdf.save(filename);
        
        if (callback) {
          callback();
        }
      });
  }
};

const UIUtils = {

  showModal() {
    const modal = document.getElementById("modal");
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    
    if (modal && html && body) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      modal.style.visibility = "visible";
      modal.style.display = "flex";
    }
  },

  hideModal() {
    const modal = document.getElementById("modal");
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    
    if (modal && html && body) {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      modal.style.visibility = "hidden";
      modal.style.display = "none";
    }
  },

  goBack() {
    window.history.back();
  },

  showSuccessToast(message) {
    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: { background: "#28a745" }
      }).showToast();
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    ProfileUtils,
    ValidationUtils,
    PDFUtils,
    UIUtils
  };
}

