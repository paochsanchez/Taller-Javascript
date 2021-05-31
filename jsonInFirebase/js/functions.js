// en estas const para manejar facilemtne la base de datos.
const database = firebase.database();
// referencia a la collection test_col para utilizar las funciones sobre esta colección
const rootRef = database.ref('/');
//
let jsonData = [];

let res = (a,b) => (a-b) >= 0 ? (a-b).toLocaleString('en-emodeng') : '-₡' + ((-1*(a-b)).toLocaleString('en-emodeng'));

let cumpl = (a,b) => b>0 ? '%'+ Math.round((a*100)/b ): '-';

function showData (){
    let tableHtml = '';
    let i = 0;
    jsonData.forEach(todo => {
        todo["id"] = i++;
        tableHtml += '<tr todoId = "' + todo.id + '">';
        tableHtml += '<td class = "text-truncate text-center"' + '> ' + todo.infoResult.data[0].slpName + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>₡' + (todo.infoResult.data[0].sale).toLocaleString('en-emodeng') + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>₡' + (todo.infoResult.data[0].budget).toLocaleString('en-emodeng') + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>' + res(todo.infoResult.data[0].sale,todo.infoResult.data[0].budget) + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>' + cumpl(todo.infoResult.data[0].sale ,todo.infoResult.data[0].budget) + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '><a class="btn btn-outline-success mx-2" href="dashboard.html"  onClick="actualClient('+todo.id+')">Exito</a></td>';
        tableHtml += '</tr>';
       
    });
    document.getElementById("tbodytable1ID").innerHTML = tableHtml;
    console.log(jsonData);
    console.log(document.getElementById('demo'));
    $('#table_id').DataTable({
        "aaSorting": [],
        "paging" : true,
        "lengthMenu": [3, 5, 9],
        "pageLength" : 3
      });
}


function getData (){
    rootRef.on('value',(snap)=>{
    jsonData = snap.val();
    console.log(jsonData);
  });
}


let actualClient = element => localStorage.setItem("data",JSON.stringify(jsonData.filter(k => k.id==element)));
