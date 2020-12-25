var w = 300;
var h = 300;
var step = 10;
var sleepTime = 80;
var lock = false;
var count = 0;
var imgName = "cat.jpg";

var box = document.getElementById("box");
box.style.height = h;
var imgs = new Array(h / step);
var img = new Image();
img.crossOrigin = 'anonymous';
img.src = imgName;
img.onload = async function() {
    var canvas = document.createElement('canvas');
    var canvas2 = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas2.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    canvas2.width = w;
    canvas2.height = step;

    ctx.drawImage(img, 0, 0, w, h);
    for (var i = 0; i < h / step; i ++) {
        var imageData = ctx.getImageData(0, i * step, w, step);
        ctx2.putImageData(imageData, 0, 0);

        var img2 = document.createElement("img");
        img2.src = canvas2.toDataURL("image/png");
        img2.style.top = i * step;
        img2.style.transitionDuration = sleepTime + "ms";
        document.getElementById('box').appendChild(img2);
        imgs[i] = img2;
    }
};

var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var swapImg = function (idx1, idx2) {
    var img1 = imgs[idx1];
    var img2 = imgs[idx2];

    var temp = img1.style.top;
    img1.style.top = img2.style.top;
    img2.style.top = temp;

    img1.classList.add("target");
    img2.classList.add("target");

    setTimeout(function () {
        img1.classList.remove("target");
        img2.classList.remove("target");
    }, sleepTime)
}

function shuffle(arr) {
    var currentIndex = arr.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
        swapImg(currentIndex, randomIndex);
    }
    return arr;
}

var init = function () {
    count = 0;
    return shuffle([...Array(h / step).keys()]);
}

var bubbleSort = async function () {
    if (lock) return;
    lock = true;

    arr = init();
    await sleep(1000);

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];

                swapImg(j+1, j)
                await sleep(sleepTime);
            }
        }
    }
    return arr;
}

var insertionSort = async function () {
    if (lock) return;
    lock = true;
    arr = init();
    await sleep(1000);

    for (let i = 1; i < arr.length; i++) {

        // Start comparing current element with every element before it
        for (let j = i - 1; j > -1; j--) {

            // Swap elements as required
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];

                swapImg(j+1, j)
                await sleep(sleepTime);
            }
        }
    }
    return arr;
}

var selectionSort = async function () {
    if (lock) return;
    lock = true;
    arr = init();
    await sleep(1000);

    let min;
    for (let i = 0; i < arr.length; i++) {
        min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];

            swapImg(i, min)
            await sleep(sleepTime);
        }
    }
    return arr;
}
