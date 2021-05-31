var ctx = document.getElementById('myChart').getContext('2d');
let data_ = JSON.parse(localStorage.getItem("data"));

function calculate(){
    console.log(data_);

    let budget = data_[0].infoResult.data[0].budget;
    let pMonth = data_[0].infoResult.data[0].pastMonthSale;
    let pYear = data_[0].infoResult.data[0].pastYearSale;
    let wW = 0; 
    let saleV = 0;
    let values = [];

    data_[0].weekResult.data.forEach(todo => {
        wW += (todo.weekWeight)/100;
        saleV +=todo.sale;
        values.push([lazyround(budget* wW),
            lazyround(saleV),
            lazyround(pYear* wW),
            lazyround(pMonth* wW),])
    })
    console.log(values);
    iniciar(values);
}

calculate();

function iniciar(values){

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
            datasets: [{
                label: 'Meta',
                data: [values[0][0], values[1][0], values[2][0], values[3][0], values[4][0], values[5][0]],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            },
            {
                label: 'Venta',
                data: [values[0][1], values[1][1], values[2][1], values[3][1], values[4][1], values[5][1]],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'Año Anterior',
                data: [values[0][2], values[1][2], values[2][2], values[3][2], values[4][2], values[5][2]],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Mes Anterior',
                data: [values[0][3], values[1][3], values[2][3], values[3][3], values[4][3], values[5][3]],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
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

};

function lazyround (num) {
    return  Math.sign(num)*((Math.abs(num)/1000000).toFixed(1));

};