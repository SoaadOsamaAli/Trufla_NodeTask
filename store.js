
var fs=require('fs'); //importing fileSystem


var userInput = process.openStdin(); // to get user input from console

//each time the user write somthing in console
userInput.addListener("data", function(data) {
    var str = data.toString().trim(); // trim for the linefeed at the end of data
    var arr = str.split(' ');
    var first = arr[0];
    operation(arr,first);
  });


//execute the input operation
function operation(d,op){
    switch(op){
        case'add':{   
            var jsonObj = "{" + JSON.stringify(d[1])+ ":" + JSON.stringify(d[2]) + "}"+" ";
            fs.appendFile('jsonFile.json', jsonObj +" ",function(err){
            console.log(err);
            });
            break;
        }
        case'list':{
            var data = fs.readFileSync('jsonFile.json').toString();
            console.log(data);
            break;
        }
        case'get':{
            let arr2 = convertToJson();
            for(let i = 0; i < arr2.length; i++){
                for(key in arr2[i]){
                    if(key == d[1]){
                        console.log(arr2[i][key]);
                    }            
                }
            }
            break;
        }
        case'remove':{
            let arr2 = convertToJson();
            for(let i = 0; i < arr2.length; i++){
                for(key in arr2[i]){
                    if(key == d[1]){
                        delete arr2[i][key];
                    }            
                }
            }
            fs.truncate('jsonFile.json', 0, function(){})            
            arr2.map(obj => {if(Object.keys(obj).length !== 0)
                fs.appendFile('jsonFile.json',JSON.stringify(obj)+" ")})       
            break;

        }
        case'clear':{
            fs.truncate('jsonFile.json', 0, function(){console.log('done')})
            break;
        }
        
        default :{
            console.log("not a valid operation");
            break;
        }
    } 
}

//to convert data in file to json
function convertToJson(){
    let data = fs.readFileSync('jsonFile.json').toString();
    let arr2 = [];
    data.split(" ").map(obj => {
        if(obj != '') arr2.push(JSON.parse(obj));
        });
        return arr2;
}