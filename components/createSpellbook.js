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
      "D&D Spellbook",
      formattedData.map((x) => {
        return [
          "\n",
          { text: x.name },
          { text: htmlParser(x.desc) },
          "\n",
          { text: x.level_desc },
        ];
      }),
    ],
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default createSpellbook;
