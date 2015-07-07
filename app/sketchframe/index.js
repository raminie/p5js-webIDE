/**
 *  sketchframe holds the iframe that loads the sketch folder
 */

module.exports = {
	template: require('./template.html'),

	ready: function() {
		this.initSketchFrame();
	},

	methods: {
		initSketchFrame: function() {
			var sketchFrame = document.getElementById('sketchFrame');

			sketchFrame.onload = function() {
				var code = window.ace.getValue();
				code += '\n new p5();\n'

				if (settings.fullScreen) {
					// to do: check to see if setup exists,
					// and if createCanvas exists,
					// if not make it windowWidth, windowHeight
					code += '\n  function windowResized() {\n' +
									'resizeCanvas(windowWidth, windowHeight);\n'+
									'}';
				}

				var userScript = sketchFrame.contentWindow.document.createElement('script');
				userScript.type = 'text/javascript';
				userScript.text = code;
				userScript.async = false;
				sketchFrame.contentWindow.document.body.appendChild(userScript);
			}
		}
	}

};