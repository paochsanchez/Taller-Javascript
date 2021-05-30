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
 
    jsonData.forEach(todo => {

        tableHtml += '<tr todoId = "' + todo.infoResult.data[0].slpName + '">';
        tableHtml += '<td class = "text-truncate text-center"' + '> ' + todo.infoResult.data[0].slpName + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>₡' + (todo.infoResult.data[0].sale).toLocaleString('en-emodeng') + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>₡' + (todo.infoResult.data[0].budget).toLocaleString('en-emodeng') + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>' + res(todo.infoResult.data[0].sale,todo.infoResult.data[0].budget) + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '>' + cumpl(todo.infoResult.data[0].sale ,todo.infoResult.data[0].budget) + '</td>';
        tableHtml += '<td class = "text-truncate text-center"' + '><button  type="button" class="btn btn-outline-success mx-2" onclick="showDash()">Exito</button> </td>';
        tableHtml += '</tr>';
       
    });
    document.getElementById("tbodytable1ID").innerHTML = tableHtml;
    console.log(tableHtml);
    console.log(document.getElementById('demo'));
    $('#table_id').DataTable({
        "bSort" : true,
        "paging" : true,         "lengthMenu": [[3, 5, -1], [3, 5, "All"]],
        "pageLength" : 3
      });
}


function getData (){
    rootRef.on('value',(snap)=>{
    jsonData = snap.val();
    console.log(jsonData);
  });
}



function showDash(){

    
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        },
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        },
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    }
    
});

