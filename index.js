import inquirer from "inquirer";
import qr from "qr-image";
import fs, { createWriteStream } from "fs"

inquirer 
    .prompt({
        message: "Enter the desired URL",
        name: "URL"
    })
    .then((answer) => {
        const url = answer.URL;
        fs.writeFile("response.txt", url, (err) => {
            if(err) throw err;
        });
        var qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream("qr_img.png"));
        
    })
    .catch((error) => {
        if (error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment")
        } else {
          console.log("Something else went wrong")
        }
      });