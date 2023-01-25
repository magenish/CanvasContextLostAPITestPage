class Color {
    /**
     * Initializes a new instance of the @see Color class.
     * Although this method allows a 32-bit value to be passed for each
     * component, the value of each component is limited to 8 bits.
     *
     * @param red   The red component. Valid values are 0 through 255.
     * @param green   The green component. Valid values are 0 through 255.
     * @param blue   The blue component. Valid values are 0 through 255.
     */
    constructor(red, green, blue) {
        this.r = Color.castToByte(red, "red");
        this.g = Color.castToByte(green, "green");
        this.b = Color.castToByte(blue, "blue");
    }
    static castToByte(value, name) {
        if (value < 0 || value > 255) {
            console.log(`Color.CastToByte: The '${name}' component value is out of range: ${value}`);
            throw new Error(`${name} The RGB component is out of range. Valid values are 0 through 255.`);
        }
        return value;
    }
}
Color._white = null;
Color._red = null;
class ColorTranslator {
    static toHtml(color) {
        const redHex = this.hexStringFromByte(color.r);
        const greenHex = this.hexStringFromByte(color.g);
        const blueHex = this.hexStringFromByte(color.b);
        return "#" + redHex + greenHex + blueHex;
    }
    static hexStringFromByte(value) {
        const hex = value.toString(16);
        return hex.length === 2 ? hex : "0" + hex;
    }
}
var APICanvasid = "APICanvas";
var globalAPICanvas;
const redColor = new Color(255, 0, 0);
const redPixel = { color: redColor, x: 0, y: 0 };
const greenColor = new Color(0, 255, 0);
const greenPixel = { color: greenColor, x: 100, y: 0 };
const blueColor = new Color(0, 0, 255);
const bluePixel = { color: blueColor, x: 0, y: 100 };
const yellowColor = new Color(255, 255, 0);
const yellowPixel = { color: yellowColor, x: 100, y: 100 };
function createAPICanvas() {
    globalAPICanvas = createTestableCanvasElement("tryRegisterContextLostEvents", APICanvasid);
    document.body.appendChild(globalAPICanvas);
    globalAPICanvas.style.zIndex = "-1";
}
function createTestableCanvasElement(caller, id) {
    try {
        var canvas = document.createElement("canvas");
        canvas.id = id;
        // Set the canvas dimensions
        canvas.style.width = 200 + "px";
        canvas.style.height = 200 + "px";
        canvas.setAttribute("Width", "200");
        canvas.setAttribute("Height", "200");
        canvas.style.position = "absolute";
        var ctx = getContext(`createTestableCanvasElement ${caller}`, canvas);
        drawSamplePatternOnCanvas(ctx);
        return canvas;
    }
    catch (exception) {
        return null;
    }
}
/**
 * Draw Sample pattern on the canvas with 1px of each color:
 * |  Red   | Green  |
 * |--------|--------|
 * |  Blue  | Yellow |
 */
function drawSamplePatternOnCanvas(ctx) {
    drawPixel(ctx, redPixel);
    drawPixel(ctx, greenPixel);
    drawPixel(ctx, bluePixel);
    drawPixel(ctx, yellowPixel);
}
function drawPixel(ctx, pixel) {
    ctx.fillStyle = ColorTranslator.toHtml(pixel.color);
    ctx.fillRect(pixel.x, pixel.y, 100, 100);
}
function tryRegisterContextLostEvents() {
    try {
        createAPICanvas();
        // Register to contextLost Events
        globalAPICanvas.addEventListener("contextlost", this.handleCanvasContextLost);
        globalAPICanvas.addEventListener("contextrestored", this.handleCanvasContextRestored);
        console.log("Registered Context Lost Events");
    }
    catch (e) {
        console.log(`Exception during CreateTestableCanvasElement. Exception: ${e}.`);
        globalAPICanvas = null;
    }
}
function handleCanvasContextLost(domEvent) {
    console.log("HandleCanvasContextLost");
}
function handleCanvasContextRestored(domEvent) {
    console.log("handleCanvasContextRestored");
}
function getContext(caller, canvas) {
    return canvas.getContext("2d");
}
