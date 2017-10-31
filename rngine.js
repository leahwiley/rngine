;var rngine = rngine || (function(){
	var has_ = (typeof(_) === 'function' && typeof(_.random) === 'function')? true : false,
		alog = [],// I/O Log Array
		adbg = [];// Debug Array
	function primitiveRNG (min,max){
		// Ensure arguments are not undefined
		min = Number(min) || 0;
		max = Number(max) || 0;
		if(min > max){// Make Sure Minimum Value is Lower Than Maximum Value
			oldMin = min;
			oldMax = max;
			min = oldMax;
			max = oldMin;
		}
		// The two steps above will mimic Underscore.random's single-argument functionality by return a value between 0 and the single argument
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.random() * (max - min + 1) + min;
		// Return Integer Between Two Values, Inclusive
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	}
	var genRN = (has_)? _.random : primitiveRNG;
	function logIO (i,o){
		alog.push([i,o]);
	}
	function arrayify (x){
		x = x || [];
		if(typeof(x) !== 'array') x = x.split(',');
		return x;
	}
	adbg.push(has_);
	var RNG = {
		roll: function (cmd){
			var face = 0;
			if(Number(cmd) === NaN){

			} else {
				face = genRN(cmd);
			}
			logIO(cmd,face);
			return face;
		},
		oSpinners:{

		},
		addSpinner: function (aSet,name){
			if(typeof(name) === 'string' && name.length) RNG.oSpinners[name] = arrayify(aSet);
		},
		spin: function (spinnerName){

		},
		oDecks:{

		},
		addDeck: function (aSet,name){
			aSet = arrayify(aSet);

		},
		draw: function (deckName){
			var card = '';
			logIO(deckName,card);
			return card;
		},
		log: function (){
			return alog;
		},
		debug: function (){
			console.log(adbg);
		}
	};
	return RNG;
})();