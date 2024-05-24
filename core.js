

class CoreExtension {

    static quick_fill(val) {
        navigator.clipboard.writeText(val);
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            activeElement.value = val;
        }
    }

    static email(){
        CoreExtension.quick_fill(ENV.EMAIL)
    }

    static github(){
        CoreExtension.quick_fill(ENV.GITHUB);
    }

    static linkedin(){
        CoreExtension.quick_fill(ENV.LINKEDIN);
    }

    static site(){
        CoreExtension.quick_fill(ENV.SITE);
    }

    static blurb(){
        CoreExtension.quick_fill(ENV.BLURB);
    }

    static pass() {

        let length = 16;
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
        const allChars = upperCase + lowerCase + numbers + specialChars;
    
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }
   
        CoreExtension.quick_fill(password);
    }


    static pass() {
        let length = 16
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
        const allChars = upperCase + lowerCase + numbers + specialChars;

        // Ensure at least one of each required character type
        let password = [
            getRandomCharacter(upperCase),
            getRandomCharacter(lowerCase),
            getRandomCharacter(numbers),
            getRandomCharacter(specialChars)
        ];

        // Fill the rest of the password length with random characters from all sets
        for (let i = password.length; i < length; i++) {
            password.push(getRandomCharacter(allChars));
        }

        // Shuffle the array to ensure the required characters are not in a predictable order
        for (let i = password.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [password[i], password[j]] = [password[j], password[i]];
        }

        navigator.clipboard.writeText(password.join(''));

    }
    
   

    static draw() {
        // This HTML will be created dynamically with JavaScript
        const overlayHTML = `
            <div id="canvas-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000;">
            <canvas id="drawing-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 85%;"></canvas>
            <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 10001;">
                <label for="color-picker">Color:</label>
                <select id="color-picker">
                <option value="white">White</option>                
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                </select>
                <label for="width-picker">Stroke Width:</label>
                <select id="width-picker">
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10"selected>10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                </select>
                <button id="clear-canvas">Clear Canvas</button>
                <button id="close-canvas">Close</button>
            </div>
            </div>`;


        // Minimal CSS for visibility and positioning, embedded directly for simplicity
        document.head.insertAdjacentHTML("beforeend", `
            <style>
            #drawing-canvas {
                cursor: crosshair;
            }
            </style>
        `);

      // Append the overlay HTML to the body
        document.body.insertAdjacentHTML("beforeend", overlayHTML);

        // Setup the canvas for drawing
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.85; // Adjusted height

        let drawing = false;
        let strokeColor = 'white';
        let strokeWidth = 10;

        function startPosition(e) {
        drawing = true;
        draw(e);
        }

        function finishedPosition() {
        drawing = false;
        ctx.beginPath();
        }

        function draw(e) {
        if (!drawing) return;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeColor;

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        }

        // Event listeners for mouse
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);

        // Event listener for color change
        document.getElementById('color-picker').addEventListener('change', function(e) {
        strokeColor = e.target.value;
        });

        // Event listener for stroke width change
        document.getElementById('width-picker').addEventListener('change', function(e) {
        strokeWidth = e.target.value;
        });

        // Clear canvas functionality
        document.getElementById('clear-canvas').addEventListener('click', function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        // Close button functionality
        document.getElementById('close-canvas').addEventListener('click', function() {
        document.getElementById('canvas-overlay').remove();
        });





    }

    
    static llinks() {
        (function() {
            // Create a new window and set up HTML structure
            var w = window.open();
            w.document.open();
            var a = '<html><head><title>Links List</title></head><body>';
    
            // Initialize a dictionary to count domains
            var domainCounts = {};
    
            let b = ''
            // Start the first table for displaying links
            b += '<table border="1"><tr><th>Text</th><th style="max-width: 40vw;">Link URL</th></tr>';
            for (var ln = 0; ln < document.links.length; ln++) {
                var lk = document.links[ln];
                b += '<tr><td>' + lk.text + '</td><td style="max-width: 40vw;"><a target="_blank" href="' + lk.href + '">'+ lk.href + '</a></td></tr>';
    
                // Count domains
                var domain = (new URL(lk.href)).hostname;
                if (domainCounts[domain]) {
                    domainCounts[domain]++;
                } else {
                    domainCounts[domain] = 1;
                }
            }
            b += '</table>';  // End of the first table
    
            // Start the second table for domain counts
            a += '<table border="1"><tr><th>Domain</th><th>Count</th></tr>';
            for (var domain in domainCounts) {
                a += '<tr><td>' + domain + '</td><td>' + domainCounts[domain] + '</td></tr>';
            }
            a += '</table>';  // End of the second table

            a += b
    
            // Close the HTML document
            a += '</body></html>';
            w.document.write(a);
            w.document.close();

        })();
    }
    

    static tinyurl(){
        void(open("http://tinyurl.com/create.php?url=" +encodeURIComponent(location.href)))
    }

    //inspired by: https://priyank-vaghela.github.io/Awesome-Bookmarklets/
    //modified heavily with chatGPT
    static notepad() {
        var notepadWindow = window.open();
        notepadWindow.document.open();
        notepadWindow.document.write(`
            <html>
                <head>
                    <title>Simple Notepad</title>
                    <style>
                        body { 
                            background-color: black;
                            color: white;
                            font-family: DejaVu;
                            font-weight:bold;
                            font-size:1rem;
                            line-height:1.4;
                            margin:0 auto;
                            padding:2rem;
                        }
                    </style>
                </head>
                <body contenteditable></body>
            </html>
        `);
        notepadWindow.document.close();
        notepadWindow.onload = function() {
            notepadWindow.focus();
            notepadWindow.document.body.focus();
        };
    }


    static builtwith(){
        //taken from https://priyank-vaghela.github.io/Awesome-Bookmarklets/
        void(open('https://builtwith.com/?'+Utils.getDomain(location.href)));
    }

    static similarweb() {
        //taken from https://priyank-vaghela.github.io/Awesome-Bookmarklets/
        void(open('https://www.similarweb.com/website/'+Utils.getDomain(location.href)));
    }

    static proxy(){
        //taken from https://priyank-vaghela.github.io/Awesome-Bookmarklets/
        void(open('https://translate.google.co.in/translate?hl=en&sl=sq&tl=en&u='+location.href));
    }

    static ttable(){

        $('table').each(function() {
            try {
                if (!$.fn.DataTable.isDataTable(this)) {
                    $(this).DataTable({
                        "paging": true,
                        "searching": true,
                        "ordering": true
                    });;
                }
            } catch (error) {}
        });


    }

    static invert(){
        // taken from: https://github.com/Damako4/Bookmarklets/blob/master/tools/Invert%20Light.js
        // re-written with gpt to avoid with statement
        (function() { function RGBtoHSL(RGBColor) { var R = RGBColor[0]; var G = RGBColor[1]; var B = RGBColor[2]; var cMax = Math.max(R, G, B); var cMin = Math.min(R, G, B); var sum = cMax + cMin; var diff = cMax - cMin; var L = sum / 2; var S, H; if (cMax == cMin) { S = 0; H = 0; } else { if (L <= 0.5) S = diff / sum; else S = diff / (2 - sum); var Rdelta = R / 6 / diff; var Gdelta = G / 6 / diff; var Bdelta = B / 6 / diff; if (R === cMax) H = Gdelta - Bdelta; else if (G === cMax) H = (1 / 3) + Bdelta - Rdelta; else H = (2 / 3) + Rdelta - Gdelta; if (H < 0) H += 1; if (H > 1) H -= 1; } return [H, S, L]; } function getRGBColor(node, prop) { var rgb = getComputedStyle(node, null).getPropertyValue(prop); var r, g, b; if (/rgb\((\d+),\s(\d+),\s(\d+)\)/.exec(rgb)) { r = parseInt(RegExp.$1, 10); g = parseInt(RegExp.$2, 10); b = parseInt(RegExp.$3, 10); return [r / 255, g / 255, b / 255]; } return rgb; } function hslToCSS(hsl) { return "hsl(" + Math.round(hsl[0] * 360) + ", " + Math.round(hsl[1] * 100) + "%, " + Math.round(hsl[2] * 100) + "%)"; } var props = ["color", "background-color", "border-left-color", "border-right-color", "border-top-color", "border-bottom-color"]; var props2 = ["color", "backgroundColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor"]; if (typeof getRGBColor(document.documentElement, "background-color") == "string") document.documentElement.style.backgroundColor = "white"; function revl(n) { var i, x, color, hsl; if (n.nodeType == Node.ELEMENT_NODE) { for (i = 0; x = n.childNodes[i]; ++i) revl(x); for (i = 0; x = props[i]; ++i) { color = getRGBColor(n, x); if (typeof(color) != "string") { hsl = RGBtoHSL(color); hsl[2] = 1 - hsl[2]; n.style[props2[i]] = hslToCSS(hsl); } } } } revl(document.documentElement); })();
    }

    static dark(){
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }

    static bigger(){
        document.querySelectorAll('body p').forEach(p => p.style.fontSize = '2rem');
    }

    static define(word){
        //taken from: https://github.com/Damako4/Bookmarklets/blob/master/tools/Dictionary.js
        window.open("http://www.dictionary.com/browse/" + word +"?s=t");
    }

    // essentially case sensative search :)
    // written with gpt
    static search(query) {
        let textNodes = [];
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        
        // Collect all text nodes
        let node;
        while (node = walk.nextNode()) {
            textNodes.push(node);
        }

        // Clear previous highlights
        document.querySelectorAll('.highlight').forEach(el => {
            el.parentNode.replaceChild(document.createTextNode(el.textContent), el);
        });

        // Search for the query and highlight it
        const regex = new RegExp(query, 'g'); // Case-sensitive by default
        textNodes.forEach(node => {
            const matches = node.textContent.matchAll(regex);
            const frag = document.createDocumentFragment();
            let lastIndex = 0;
            Array.from(matches).forEach(match => {
                const before = document.createTextNode(node.textContent.substring(lastIndex, match.index));
                const highlighted = document.createElement('span');
                highlighted.textContent = match[0];
                highlighted.style.backgroundColor = 'yellow';
                highlighted.className = 'highlight';
                frag.appendChild(before);
                frag.appendChild(highlighted);
                lastIndex = match.index + match[0].length;
            });
            if (lastIndex < node.textContent.length) {
                const after = document.createTextNode(node.textContent.substring(lastIndex));
                frag.appendChild(after);
            }
            node.parentNode.replaceChild(frag, node);
        });
    }
}


javascript:(function(){
    var lastShiftTime = 0;
    var shiftCount = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Shift') {
            var now = Date.now();

            if (now - lastShiftTime < 500 && shiftCount === 1) {
                var cmd = prompt('Enter command:');      
                if (cmd.startsWith('search ')) {
                    const query = cmd.slice('search '.length);
                    CoreExtension.search(query);
                } else if (cmd.startsWith('define ')) {
                    const query = cmd.slice('define '.length);
                    CoreExtension.define(query);         
                } else if (CoreExtension[cmd]) { 
                    CoreExtension[cmd]();
                }
                shiftCount = 0; // Reset shift count after command
            } else {
                shiftCount = 1; // First shift press detected
            }

            lastShiftTime = now;
        } else {
            shiftCount = 0; // Reset if any other key is pressed
        }
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'Shift') {
            // Allow next Shift press to be detected
        }
    });
})();
