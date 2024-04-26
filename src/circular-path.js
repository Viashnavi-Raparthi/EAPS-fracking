function generateQuarterCirclePath(startPoint, endPoint, numPoints) {
    // Calculate radius of the circle
    let radius = Math.abs(endPoint.x - startPoint.x);

    // Calculate center point of the circle
    let centerX = startPoint.x + radius;
    let centerY = startPoint.y;

    // Calculate start angle and end angle
    let startAngle = Math.PI * 1.5; // 270 degrees in radians
    let endAngle = Math.PI; // 180 degrees in radians

    // Calculate angle increment for each point
    let angleIncrement = (endAngle - startAngle) / (numPoints - 1);

    // Initialize string to store points
    let pointsString = '[';

    // Generate points along the arc
    for (let i = 0; i < numPoints; i++) {
        // Calculate angle for current point
        let angle = startAngle - (angleIncrement * i);

        // Calculate coordinates of the point on the circle
        let x = centerX + radius * Math.sin(angle);
        let y = centerY + radius * Math.cos(angle); // Subtracting sin because y-axis is inverted in canvas

        // Add point to the string
        pointsString += `{ x: ${x.toFixed(2)}, y: ${y.toFixed(2)} }, `; // Round to 2 decimal places
    }

    // Remove trailing comma and add closing bracket
    pointsString = pointsString.slice(0, -2) + ']';

    return pointsString;
}

// Example usage:
let startPoint = {x: 160, y: 400};
let endPoint = {x: 250, y: 490};
let numPoints = 10;
let quarterCirclePath = generateQuarterCirclePath(startPoint, endPoint, numPoints);
console.log(quarterCirclePath);
