({
	baseUrl: ".",
	name: "assets/js/main",
	mainConfigFile: "assets/js/require.conf.js",
	out: "../build/assets/js/main.built.js",
	onBuildRead: function(id, url, contents) {
		if (id === 'Leap') {
            return 'define(\'Leap\', [], function() {var define;\n ' + contents + ' return Leap; });';
		} else {
			return contents;
		}
	},
    optimize: "none"
})

