var ctx = document.getElementById('myChart').getContext('2d');
var d_1 = document.getElementById('Doughnut_1').getContext('2d');
var d_2 = document.getElementById('Doughnut_2').getContext('2d');

let data_ = JSON.parse(localStorage.getItem("data"));
let res = (a, b) => (a - b) >= 0 ? (a - b).toLocaleString('en-emodeng') : '-₡' + ((-1 * (a - b)).toLocaleString('en-emodeng'));

function calculate() {
    console.log(data_);

    let budget = data_[0].infoResult.data[0].budget;
    let pMonth = data_[0].infoResult.data[0].pastMonthSale;
    let pYear = data_[0].infoResult.data[0].pastYearSale;
    let wW = 0;
    let saleV = 0;
    let values = [];

    data_[0].weekResult.data.forEach(todo => {
        wW += (todo.weekWeight) / 100;
        saleV += todo.sale;
        values.push([lazyround(budget * wW),
            lazyround(saleV),
            lazyround(pYear * wW),
            lazyround(pMonth * wW),
        ])
    })
    console.log(values);
    iniciar(values);
}

calculate();


function iniciar(values) {

    let sale = (data_[0].infoResult.data[0].sale);
    let month = data_[0].infoResult.data[0].monthAdvance;
    let budget = (data_[0].infoResult.data[0].budget);
    let cot = data_[0].infoResult.data[0].quotations;
    let salesOrd = data_[0].infoResult.data[0].salesOrders;
    let salesY = data_[0].infoResult.data[0].yearSale;
    let budY = data_[0].infoResult.data[0].yearBudget;
    let fact = data_[0].infoResult.data[0].invoices;
    let cred = data_[0].infoResult.data[0].creditNotes;

    let dif = (res(sale, budget)).toLocaleString('en-emodeng');
    let difY = (budY>0) ? ((salesY / budY)*100).toFixed(2) : 0;
    console.log(difY);
    let proyected = (month > 0) ? (sale * 100 / month) : 0;
    let percent = (((budget > 0) ? (proyected / budget) : 0) * 100).toFixed(2);
    let cumpl = budget > 0 ? (sale / budget) * 100 : 100;

    document.getElementById('val_Cumpl').innerHTML = '<div class="col">Venta Actual<br >₡' + sale.toLocaleString('en-emodeng') + '</div><div class="col">Meta Actual<br>₡' + budget.toLocaleString('en-emodeng') + '</div><div class="col">Diferencia<br>' + dif + '</div>';

    document.getElementById("val_Cumpl2").innerHTML = ( cot != 0 ? '₡' + (cot).toLocaleString('en-emodeng') : '-');
    document.getElementById("val_Cumpl1").innerHTML = ( salesOrd != 0 ? '₡' + (salesOrd).toLocaleString('en-emodeng') : '-');

    document.getElementById("row_").innerHTML = ( salesY != 0 ? '₡' + (salesY).toLocaleString('en-emodeng') : '-');
    document.getElementById("cump_").innerHTML = difY+'%' ;
    document.getElementById("fact_").innerHTML = ( fact != 0 ? '₡' + (fact).toLocaleString('en-emodeng') : '-');
    document.getElementById("dev_").innerHTML = ( (res(cred,0)).toLocaleString('en-emodeng'));

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
            datasets: [{
                    label: 'Meta',
                    data: [values[0][0], values[1][0], values[2][0], values[3][0], values[4][0], values[5][0]],
                    backgroundColor: 'rgba(255, 159, 64, 1)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    
                },
                {
                    label: 'Venta',
                    data: [values[0][1], values[1][1], values[2][1], values[3][1], values[4][1], values[5][1]],
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Año Anterior',
                    data: [values[0][2], values[1][2], values[2][2], values[3][2], values[4][2], values[5][2]],
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Mes Anterior',
                    data: [values[0][3], values[1][3], values[2][3], values[3][3], values[4][3], values[5][3]],
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1, 
            scales: {
                y: {
                    grid: {
                      color: '#00000081',
                      borderColor: '#00000081',
                      tickColor: '#00000081'
                    },ticks: {
                        color: 'black'
                        
                    }
                  },
                x:{
                    grid:{ display: false},
                    ticks: {
                        color: 'black'
                        
                    }
                    
                }
                
            },
            plugins: {
            legend: { position:'top',
                display: true,
                labels: {
                    color: 'black',
                    font: {
                        size: 14
                    }
                }
            }
        }
        
        }

    });
    
    var Chart_1 = new Chart(d_1, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'My First Dataset',
                data: [cumpl, 100 - cumpl],
                backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                hoverOffset: 4
            }]
        },
        options: {
            maintainAspectRatio : false,
            responsive:true,
            aspectRatio: 1, 

            tooltips: {
                enabled: false
            },
            cutout: '90%'
        },
        plugins: [{
            id: 'text',
            beforeDraw: function (chart, a, b) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;

                ctx.restore();
                var fontSize = (height / 200).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                var text = "75%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });

    var Chart_2 = new Chart(d_2, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'My First Dataset',
                data: [percent, 100 - percent],
                backgroundColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                hoverOffset: 4
            }]
        },
        options: {
            maintainAspectRatio : false,
            responsive:true,
            tooltips: {
                enabled: false
            },
            aspectRatio: 1, 
            cutout: '90%'
        },
        plugins: [{
            id: 'text',
            
            beforeDraw: function (chart, a, b) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;

                ctx.restore();
                var fontSize = (height / 200).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                var text = "75%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
                
            }
        }]
    });
};

function lazyround(num) {
    return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1));

};

$(document).ready(function() {
    $("#dough_1-2").css({
      'width': ($("#dough_1").width() + 'px')
    });
    $("#dough_2-2").css({
        'width': ($("#dough_2").width() + 'px')
      });
  });
  