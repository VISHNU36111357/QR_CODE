/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.

*/
var qr = require('qr-image');
var fs =require('fs');
var inquirer = require('inquirer');
inquirer.prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    }
  ])
  .then((answers) => {
    console.log(answers);
    const content = answers.URL;
   fs.writeFile('data.txt', content, err => {
  if (err) {
    console.error(err);
  }
  fs.unlink("qr_img.png", (err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: example_file.txt");
    }
  }));

   var qr_svg = qr.image(content );
   qr_svg.pipe(require('fs').createWriteStream('qr_img.png'));
   
   
  
});
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });