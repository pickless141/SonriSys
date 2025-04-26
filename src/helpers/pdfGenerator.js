import PDFDocument from "pdfkit";

const historialMedicoPDF = (historia, res) => {
  const doc = new PDFDocument({
    margin: 20,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="historia_medica.pdf"'
  );
  doc.pipe(res);

  const boolToStr = (val) => (val ? "Sí" : "No");

  const drawSectionHeader = (title) => {
    const pageWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;
    doc
      .save()
      .rect(doc.x, doc.y, pageWidth, 18)
      .fill("#FF6B6B");
    doc
      .fillColor("#ffffff")
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("  " + title, doc.x, doc.y + 4, { align: "center" });
    doc.restore();
    doc.moveDown(1);
  };

  const drawDivider = () => {
    const pageWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.margins.left + pageWidth, doc.y)
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .stroke();
    doc.moveDown(1);
  };

  const checkPageBreak = (neededSpace = 50) => {
    const bottom = doc.page.height - doc.page.margins.bottom;
    if (doc.y + neededSpace > bottom) {
      doc.addPage();
    }
  };

  doc
    .fillColor("#0b4870")
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("HISTORIA CLÍNICA", { align: "center" });
  doc.moveDown(1);

  drawSectionHeader("DATOS DEL PACIENTE");

  const {
    nombreCompleto,
    fechaNacimiento,
    edad,
    sexo,
    direccion,
    telefono,
    email,
    ocupacion,
    estadoCivil,
    recomendadoPor,
    responsableTutor,
  } = historia.paciente;

  const patientData = [
    { label: "Nombre Completo", value: nombreCompleto || "N/A" },
    {
      label: "Fecha de Nacimiento",
      value: fechaNacimiento
        ? new Date(fechaNacimiento).toLocaleDateString()
        : "N/A",
    },
    { label: "Edad", value: edad || "N/A" },
    { label: "Sexo", value: sexo || "N/A" },
    { label: "Dirección", value: direccion || "N/A" },
    { label: "Teléfono", value: telefono || "N/A" },
    { label: "Email", value: email || "N/A" },
    { label: "Ocupación", value: ocupacion || "N/A" },
    { label: "Estado Civil", value: estadoCivil || "N/A" },
    { label: "Recomendado por", value: recomendadoPor || "N/A" },
  ];

  if (responsableTutor && responsableTutor.nombre) {
    patientData.push({
      label: "Responsable/Tutor",
      value: responsableTutor.nombre,
    });
  }

  doc.font("Helvetica").fontSize(9).fillColor("#000000");

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const colSpacing = 10; 
  const colWidth = (pageWidth - colSpacing) / 2; 
  const startX = doc.page.margins.left;
  const startY = doc.y;
  const rowHeight = 12;

  patientData.forEach((item, index) => {
    checkPageBreak(20);
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = startX + col * (colWidth + colSpacing);
    const y = startY + row * rowHeight;
    doc.text(`${item.label}: ${item.value}`, x, y, { width: colWidth });
  });

  const totalRows = Math.ceil(patientData.length / 2);
  doc.y = startY + totalRows * rowHeight + 10;
  doc.x = doc.page.margins.left;

  doc.moveDown();
  drawDivider();

  drawSectionHeader("HISTORIAL MÉDICO");

  checkPageBreak(80);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text("Enfermedades:", { underline: true });

  const enfermedadesArray = [
    { label: "Tuberculosis", value: boolToStr(historia.enfermedades.tuberculosis) },
    { label: "Lepra", value: boolToStr(historia.enfermedades.lepra) },
    { label: "Enf. Sexuales", value: boolToStr(historia.enfermedades.enfermedadesSexuales) },
    { label: "Hepatitis", value: boolToStr(historia.enfermedades.hepatitis) },
    { label: "SIDA", value: boolToStr(historia.enfermedades.sida) },
    { label: "Chagas", value: boolToStr(historia.enfermedades.enfermedadChagas) },
    { label: "Fiebre Reumática", value: boolToStr(historia.enfermedades.fiebreReumatica) },
    { label: "Asma", value: boolToStr(historia.enfermedades.asma) },
    { label: "Sinusitis", value: boolToStr(historia.enfermedades.sinusitis) },
    { label: "Alergia", value: boolToStr(historia.enfermedades.alergia) },
    { label: "Úlceras", value: boolToStr(historia.enfermedades.ulceras) },
    { label: "Cardiacas", value: boolToStr(historia.enfermedades.enfermedadesCardiacas) },
    { label: "Epilepsia", value: boolToStr(historia.enfermedades.epilepsia) },
    { label: "Hipertensión", value: boolToStr(historia.enfermedades.hipertensionArterial) },
    { label: "Anemia", value: boolToStr(historia.enfermedades.anemia) },
    { label: "Hemofilia", value: boolToStr(historia.enfermedades.hemofilia) },
    { label: "Dist. Psíquicos", value: boolToStr(historia.enfermedades.disturbiosPsiquicos) },
    { label: "Convulsiones", value: boolToStr(historia.enfermedades.convulsiones) },
    { label: "Desmayos", value: boolToStr(historia.enfermedades.desmayos) },
    { label: "Coagulación", value: boolToStr(historia.enfermedades.problemasCoagulacion) },
    { label: "Diabetes", value: boolToStr(historia.enfermedades.diabetes) },
    { label: "Otras", value: historia.enfermedades.otras || "N/A" },
  ];

  const startYEnf = doc.y;
  const colCount = 4;
  const colWidthEnf = pageWidth / colCount;
  const rowHeightEnf = 12;

  enfermedadesArray.forEach((item, index) => {
    checkPageBreak(20);
    const col = index % colCount;
    const row = Math.floor(index / colCount);
    const xPos = doc.page.margins.left + col * colWidthEnf;
    const yPos = startYEnf + row * rowHeightEnf;
    doc
      .font("Helvetica")
      .fontSize(9)
      .text(`${item.label}: ${item.value}`, xPos, yPos, { width: colWidthEnf });
  });

  const totalRowsEnf = Math.ceil(enfermedadesArray.length / colCount);
  doc.y = startYEnf + totalRowsEnf * rowHeightEnf + 10;
  doc.x = doc.page.margins.left;
  doc.moveDown();

  const medicalTwoColsData = [
    {
      label: "Tratamiento Médico Actual",
      value: `En tratamiento: ${boolToStr(historia.tratamientoMedicoActual.enTratamiento)}
Tiempo: ${historia.tratamientoMedicoActual.tiempo || "N/A"}`,
    },
    {
      label: "Uso de Medicamentos",
      value: `Usa medicamentos: ${boolToStr(historia.usoMedicamento.usaMedicamento)}
Cuáles: ${historia.usoMedicamento.cuales || "N/A"}`,
    },
    {
      label: "Transfusión Sanguínea",
      value: `Necesita transfusión: ${boolToStr(historia.transfusionSanguinea.necesitaTransfusion)}
Motivo: ${historia.transfusionSanguinea.motivo || "N/A"}`,
    },
    {
      label: "Cirugías Previas",
      value: `Fue sometido: ${boolToStr(historia.cirugiasPrevias.fueSometido)}
Detalle: ${historia.cirugiasPrevias.detalle || "N/A"}`,
    },
    {
      label: "Sangrado Prolongado",
      value: boolToStr(historia.sangradoProlongado),
    },
    {
      label: "Fuma",
      value: `Fuma: ${boolToStr(historia.fuma.fuma)}
Tiempo: ${historia.fuma.tiempo || "N/A"}`,
    },
    {
      label: "Alcohol",
      value: `Bebe alcohol: ${boolToStr(historia.alcohol.bebeAlcohol)}
Frecuencia/Tiempo: ${historia.alcohol.tiempo || "N/A"}`,
    },
    {
      label: "Test ELISA",
      value: `Se realizó: ${boolToStr(historia.testElisa.seRealizo)}
Hace cuánto: ${historia.testElisa.tiempo || "N/A"}`,
    },
    {
      label: "Embarazo",
      value: boolToStr(historia.embarazo),
    },
    {
      label: "Tolerancia a la Anestesia",
      value: boolToStr(historia.toleranciaAnestesia),
    },
  ];

  const startY2Cols = doc.y;
  const colSpacing2 = 10; 
  const colWidth2 = (pageWidth - colSpacing2) / 2;
  const rowHeight2 = 35;

  medicalTwoColsData.forEach((item, i) => {
    checkPageBreak(40);
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = doc.page.margins.left + col * (colWidth2 + colSpacing2);
    const y = startY2Cols + row * rowHeight2;
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(item.label + ":", x, y, { width: colWidth2 });
    const valY = doc.y + 2;
    doc
      .font("Helvetica")
      .fontSize(9)
      .text(item.value, x + 15, valY, {
        width: colWidth2 - 15,
        align: "left",
      });
  });

  const totalRows2 = Math.ceil(medicalTwoColsData.length / 2);
  doc.y = startY2Cols + totalRows2 * rowHeight2 + 10;
  doc.x = doc.page.margins.left;
  doc.moveDown();

  checkPageBreak(30);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text("Motivo de la Visita:", { underline: true });
  doc
    .font("Helvetica")
    .fontSize(9)
    .text(`   ${historia.motivoVisita || "N/A"}`);
  doc.moveDown(2);

  checkPageBreak(60);
  doc.moveDown(16);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text("Firma del Paciente:", { align: "left" });
  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(9)
    .text("_______________________________", { align: "left" });
  doc.moveDown(2);

  doc.end();
};

export default historialMedicoPDF;