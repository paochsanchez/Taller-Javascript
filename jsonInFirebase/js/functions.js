// en estas const para manejar facilemtne la base de datos.
const database = firebase.database();
// referencia a la collection test_col para utilizar las funciones sobre esta colección
const rootRef = database.ref('/');

let jsonData = [];

let res = (a, b) => (a - b) >= 0 ? (a - b).toLocaleString('en-emodeng') : '-₡' + ((-1 * (a - b)).toLocaleString('en-emodeng'));

let cumpl = (a, b) => b > 0 ?  Math.round((a * 100) / b) : 100;

let table = '<div class="card" id="tabla_"> <div class="card-header"> <h4 class="card-title text-center" style="font-size: 30px;">Lista de Vendedores</h4> </div><div class="card-content collapse show"><div class="card-body card-dashboard"><div class="table-responsive"><table class="table display nowrap table-striped table-bordered scroll-horizontal"id="table_id"> <thead><tr> <!--<th>#</th>--> <th class="text-center">Vendedor</th><th class="text-center">Venta</th> <th class="text-center">Meta</th><th class="text-center">Diferencia</th><th class="text-center"> Cumplimiento</th><th class="text-center">Detalles</th> </tr></thead><tbody id="tbodytable1ID"></tbody></table></div> </div></div></div>'

function showData() {
  let tableHtml = '';
  let i = 0;
  jsonData.forEach(todo => {
    let cump = cumpl(todo.infoResult.data[0].sale, todo.infoResult.data[0].budget);
    let style = cump < 80 ? 'background-color: #f8696963!important;' : cump < 100 ?  'background-color: #f8d76963 !important;' : 'background-color: #a2f86963 !important;'   ;
    todo["id"] = i++;
    tableHtml += '<tr id = ' + todo.id + '>';
    tableHtml += '<td class = "text-truncate text-center"' + '> ' + todo.infoResult.data[0].slpName + '</td>';
    tableHtml += '<td class = "text-truncate text-center"' + '>₡' + (todo.infoResult.data[0].sale).toLocaleString('en-emodeng') + '</td>';
    tableHtml += '<td class = "text-truncate text-center"' + '>₡' + (todo.infoResult.data[0].budget).toLocaleString('en-emodeng') + '</td>';
    tableHtml += '<td class = "text-truncate text-center"' + '>' + res(todo.infoResult.data[0].sale, todo.infoResult.data[0].budget) + '</td>';
    tableHtml += '<td class = "text-truncate text-center"> <span class="badge badge-light"  style="'+style+'"' + '>' +cump + '%' + '</span></td>';
    tableHtml += '<td class = "text-truncate text-center" ' + '><a href="dashboard.html"  onClick="actualClient(' + todo.id + ')"><i class="fas fa-paper-plane"></i></a></td>';
    tableHtml += '</tr>';

  });
  document.getElementById("tabla").innerHTML = table;

  document.getElementById("tbodytable1ID").innerHTML = tableHtml;

  console.log(jsonData);
  console.log(document.getElementById('demo'));

   $('#table_id').DataTable({
    "aaSorting": [],
    "paging": true,
    "lengthMenu": [3, 5, 9],
    "pageLength": 3
  });

  $('#table_id').on("dblclick",  'tr', function () {
    actualClient( this.id);
    window.location.replace('dashboard.html');
    } );
}

function getData() {
  return new Promise((resolve, reject) => {
     setTimeout(
      ()=>{
          rootRef.on('value',(snap)=>{
            resolve (snap.val());
          });
        },
        1500
    );
  });
}


async function startTable() {
  await getData()
    .then(
      json => {
        jsonData = json;
        showData();
      }
    )
    .catch(error => {
      console.log(error)
    });
}

$(document).ready(function(){
  startTable();
});
$(window).on("load",function(){
  $(".loader-container").fadeOut(1000);
});


let actualClient = element => localStorage.setItem("data", JSON.stringify(jsonData.filter(k => k.id == element)));


