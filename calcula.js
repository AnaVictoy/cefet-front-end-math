document.querySelector('#botao-resolver').onclick = function () {
    let campoDelta = document.getElementById("resultado-delta");
    let campoX1 = document.getElementById("resultado-x1");
    let campoX2 = document.getElementById("resultado-x2");
    let campoDirecao = document.getElementById("resultado-diracao-parabola");
    let campoXv = document.getElementById("resultado-xvertice");
    let campoYv = document.getElementById("resultado-yvertice");
    let campoRaizes = document.getElementById("resultado-raizes-diferentes");
    let campoGraf = document.getElementById("grafico");
    let labelGraf = document.getElementById("labelGrafico");

    var a = document.getElementById("coeficiente-a").value;
    if (a == 0) {
        alert("Isso não é uma função de segundo grau. 'a' não pode ser zero.");
        return;
    }
    if (a < 0) campoDirecao.value = 'Para Baixo!';
    else campoDirecao.value = 'Para Cima!';

    var b = document.getElementById("coeficiente-b").value;
    var c = document.getElementById("coeficiente-c").value;
    var delta = Math.pow(b, 2) - 4 * a * c;

    campoDelta.value = delta;
    if (delta < 0) {
        //alert("A resposta é complexas");
        campoX1.value = '';
        campoX2.value = '';
        campoDirecao.value = '';
        campoXv.value = '';
        campoYv.value = '';
        campoRaizes.value = 'Duas raizes complexas!';
        campoGraf.style.display = "none";
        labelGraf.style.display = "none";

        return;
    }
    if (delta == 0) campoRaizes.value = 'Duas raizes reais iguais!';
    else campoRaizes.value = 'Duas raizes reais diferentes!';

    var x1 = (-b + Math.sqrt(delta)) / (2 * a);
    var x2 = (-b - Math.sqrt(delta)) / (2 * a);
    campoX1.value = x1;
    campoX2.value = x2;
    var vx = -b / (2 * a);
    var vy = -delta / (4 * a);
    campoXv.value = vx;
    campoYv.value = vy;

    const expression = a.toString() + " * x * x + " + b.toString() + " * x + " + c.toString();
    const expr = math.compile(expression);
    const rangeMin = -5;
    const rangeMax = 5;
    const xValues = math.range(rangeMin, rangeMax, 0.1).toArray();
    const yValues = xValues.map(function (x) {
        return expr.eval({
            x: x
        })
    })
    console.log(yValues);
    const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter'
    }
    campoGraf.style.display = "block";
    labelGraf.style.display = "block";
    const data = [trace1]
    Plotly.newPlot('grafico', data)
}