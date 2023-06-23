import jsdom from "jsdom";
import fetch from "node-fetch";
const url = "https://programming-idioms.org/cheatsheet/Java";
import fs from 'fs';
import { client } from "@gradio/client";

async function getContent() {
  const response = await fetch(url);
  if (response.ok) {
    let content = await response.text();
    const parser = new jsdom.JSDOM(content);
    const table = parser.window.document.querySelector('table');
    const tbody  = table.tBodies;
    const lines = tbody.item(0).querySelectorAll('.cheatsheet-line');

    let QandA = {};
    let index = 0;
let all_codes=[]
    lines.forEach((line)=>{
        let question = line.querySelector('.idiom-title a').textContent.trim();
        
        /* add question */
        QandA[index] = { index, question, codes: []}

        let codes = line.querySelectorAll('code');
        codes.forEach((code)=>{
          QandA[index].codes.push(code.textContent);
          if(index == 1){
            // console.log("idiom", code.textContent);
          }
        });
all_codes.push( QandA[index].codes)

        index++;
    });

    
// console.log("codes",all_codes);
// exportArrayToCSV(all_codes,'export_java.csv')






  }
   
}

function convertArrayToCSV(arr) {
  const csvRows = [];

  // Iterate over the array and convert each element to a comma-separated string
  for (const row of arr) {
    const csvColumns = row.map(value => `"${value}"`);
    csvRows.push(csvColumns.join(','));
  }

  // Join the rows with newlines to form the final CSV string
  return csvRows.join('\n');
}

function exportArrayToCSV(arr, filename) {
  const csvString = convertArrayToCSV(arr);

  fs.writeFile(filename, csvString, (err) => {
    if (err) {
      console.error('Error exporting to CSV:', err);
      return;
    }
    console.log('CSV file exported successfully:', filename);
  });
}
async function run() {

	const app = await client("https://huggingfaceh4-starchat-playground.hf.space/");
	const result = await app.predict(0, [		
				"generate python function to add two numbers", // string  in 'parameter_34' Dataset component
	]);

	console.log(result);
}
// getContent();
run();


// console.log(parser.window.document);
