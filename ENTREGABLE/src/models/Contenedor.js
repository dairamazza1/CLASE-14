const fs = require('fs');

class Contenedor{
    constructor(nombre){
        this.nombre = nombre;
    }
    // saveInFile(object){ //recibe objeto. lo guarda en el archivo, devuelve el id asignado
    //     const aux = [];
    //     try{
    //         const arc = fs.readFileSync(this.nombre, 'utf-8'); // lee el archivo
    //         const jsonObj = JSON.parse(arc);
    //         jsonObj.push(object);
    //         /*for (let i = 0; i < jsonObj.length; i++) {
    //             jsonObj[i].id = i+1;
    //         }*/
    //         // sobreescribir
    //          fs.saveInFile(this.nombre , JSON.stringify(jsonObj))
            
    //     }catch(error){
    //         console.log('Error: ', error)
    //     }
    // }
    saveInFile(content) {
        fs.writeFileSync(this.nombre, JSON.stringify(content));
    }
     getByID(number){
        try {
            const arc = fs.readFileSync(this.nombre, 'utf-8');  
            const jsonObj = JSON.parse(arc);
            let foundID = null;
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    foundID = jsonObj[key];
                    break;
                }
            }
            return foundID;  
        } catch (error) {
            console.log("No se pudieron obtener los productos");
        }
    }
     getContentFile(){ 
        let content = [];    
        try {
            const arc =  fs.readFileSync(this.nombre, 'utf-8');         
            content = JSON.parse(arc);
        } catch (error) {
            this.saveInFile(content)
            console.log(`Creacion del archivo ${this.nombre}`);
        }
        return content;
    }
     deleteById(number){
        try {
             
            const jsonObj = this.getContentFile();
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    jsonObj.splice(key,1)
                    break;
                }
            }
            console.log(jsonObj);
            // sobreescribir
             fs.writeFileSync(this.nombre , JSON.stringify(jsonObj))
        } catch (error) {
            console.log(error);
        }
    }
     deleteAll(){
         fs.saveInFile(this.nombre , '')
        const arc =  fs.readFile(this.nombre, 'utf-8'); 
        console.log(arc);
    }

     
}
 
module.exports = { Contenedor };