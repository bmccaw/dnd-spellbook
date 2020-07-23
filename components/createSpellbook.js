import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const formatData = (data) => {
  console.log("PDF Data", data);
  let returnedSpells = [];
  for (let i = 0; i < data.length; i++) {
    returnedSpells.push(data[i].original);
  }
  console.log(returnedSpells);
  return returnedSpells;
};

function htmlParser(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<[^>]*>/g, "\n");
}

const createSpellbook = (data) => {
  const formattedData = formatData(data);
  console.log(formattedData);
  const documentDefinition = {
    content: [
      { text: "D&D Spellbook", alignment: "center" },
      "\n",
      formattedData.map((x) => {
        return {
          layout: "headerLineOnly",
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [{ text: x.name }],
              [{ text: x.school }],
              [{ text: `Level: ${x.level}` }],
              [{ text: `Casting Time: ${x.casting_time}` }],
              [{ text: `Range: ${x.range}` }],
              [{ text: `Components: ${x.component_desc}, ${x.material_desc}` }],
              [{ text: `Duration: ${x.duration}` }],
              [{ text: htmlParser(x.desc) }],
            ],
          },
        };
      }),
    ],
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default createSpellbook;
