const radius = document.getElementById('radius');
const angle = document.getElementById('angle');
const calc = document.getElementById('calc');
const result = document.getElementById('result');
const lengthUnit = document.getElementById('lengthUnit');
const angleUnit = document.getElementById('angleUnit');

const arc = {
    radius: "",
    angle: "",
    degrees: "",
    radians: "",

    degreesToRadians: function(degrees) {
        return degrees * (Math.PI / 180);
    },

    radiansToDegrees: function(radians) {
        return radians * (180 / Math.PI);
    },

    degreesFunc: function() {
        if (angleUnit.value === 'deg') {
            return this.angle;
        } else {
            return this.radiansToDegrees(this.angle);
        }
    },

    radiansFunc: function() {
        if (angleUnit.value === 'rad') {
            return this.angle;
        } else {
            return this.degreesToRadians(this.angle);
        }
    },

    calcLength: function() {
        return this.radius * this.radians;
    },

    fullCircles: function(degrees = this.degreesFunc()) {
        if (degrees < 360) {
            return 0;
        }else {
            return {full: Math.floor(degrees / 360), remainder: degrees % 360};
        }
    }
};

calc.addEventListener('click', function() {
    arc.radius = parseFloat(radius.value);
    arc.angle = parseFloat(angle.value);
    arc.degrees = arc.degreesFunc();
    arc.radians = arc.radiansFunc();
    const mixedAngle = arc.fullCircles();
    const mixedHtml = mixedAngle.full ? `(${mixedAngle.full}*360° + ${mixedAngle.remainder.toFixed(2)}°)` : '';
    result.innerHTML = `
        <p>Poloměr: ${arc.radius.toFixed(2)} ${lengthUnit.value}</p>
        <p>Úhel: ${arc.degrees.toFixed(2)} stupňů ${mixedHtml} / ${arc.radians.toFixed(2)} radiánů </p>
        <p>Délka oblouku: ${arc.calcLength().toFixed(2)} ${lengthUnit.value}</p>
    `;
});