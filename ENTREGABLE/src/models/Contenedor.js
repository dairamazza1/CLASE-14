const fs = require('fs');

class Contenedor{
    constructor(nombre){
        this.nombre = nombre;
    }
    async save(object){ //recibe objeto. lo guarda en el archivo, devuelve el id asignado
        const aux = [];
        try{
            const arc = await fs.promises.readFile(this.nombre, 'utf-8'); // lee el archivo
            const jsonObj = JSON.parse(arc);
            jsonObj.push(object);
            /*for (let i = 0; i < jsonObj.length; i++) {
                jsonObj[i].id = i+1;
            }*/
            // sobreescribir
            await fs.promises.writeFile(this.nombre , JSON.stringify(jsonObj))
            
        }catch(error){
            console.log('Error: ', error)
        }
    }
    async getByID(number){
        try {
            const arc = await fs.promises.readFile(this.nombre, 'utf-8');  
            const jsonObj = JSON.parse(arc);
            let foundID = null;
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    foundID = jsonObj[key];
                    break;
                }
            }
           // console.log(foundID);
            return foundID;  
        } catch (error) {
            console.log("No se pudieron obtener los productos");
        }
    }
    async getContentFile(){ 
        let content = [];    
        try {
            const arc = await fs.promises.readFile(this.nombre, 'utf-8');            
            const jsonObj = JSON.parse(arc);
            //console.log(jsonObj);
            return jsonObj;
        } catch (error) {
            //const arc = fs.promises.writeFile(this.nombre , content)
            console.log(error);
        }
    }
    async deleteById(number){
        try {
            const arc = await fs.promises.readFile(this.nombre, 'utf-8');  
            const jsonObj = JSON.parse(arc);
            jsonObj.splice((number-1),1);

            console.log(jsonObj);
            // sobreescribir
            await fs.promises.writeFile(this.nombre , JSON.stringify(jsonObj))
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAll(){
        await fs.promises.writeFile(this.nombre , '')
        const arc = await fs.promises.readFile(this.nombre, 'utf-8'); 
        console.log(arc);
    }

    async updateByID(number,req){
        try {
            const arc = await fs.promises.readFile(this.nombre, 'utf-8');  
            const jsonObj = JSON.parse(arc);
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    jsonObj[key] = {
                        title: req.title,
                        price: req.price,
                        thumbnail: req.thumbnail,
                        id: number
                    }
                }
            }
           // sobreescribir
           await fs.promises.writeFile(this.nombre , JSON.stringify(jsonObj))
        } catch (error) {
            console.log(error);
        }
    }
}
 
module.exports = { Contenedor };