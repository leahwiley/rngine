;var rngine = rngine || (function(){
	var clock = new Date,
		has_ = (typeof(_) === 'function' && typeof(_.random) === 'function')? true : false,
		alog = [],// I/O Log Array
		adbg = [];// Debug Array
	function logIO (i,o){alog.push([i,o,clock.getTime()]);}
	function logDbg (i,o){adbg.push([i,o,clock.getTime()]);}
	function primitiveRNG (min,max){
		// Ensure arguments are not undefined
		min = Number(min) || 0;
		max = Number(max) || 0;
		if(min > max){// Make Sure Minimum Value is Lower Than Maximum Value
			var oldMin = min, oldMax = max;
			min = oldMax;
			max = oldMin;
		}
		// The two steps above will mimic Underscore.random's single-argument functionality by return a value between 0 and the single argument
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
		// Return Integer Between Two Values, Inclusive
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	}
	var genRN = (has_)? _.random : primitiveRNG;
	function arrayify (x){
		x = x || [];
		if(typeof(x) === 'string'){
			x = x.split(',');
		} else if(typeof(x) !== 'object' || !x.length){
			x = [];
		}
		return x;
	}
	function primitiveShuffle (aSet){
		return aSet.toString();
	}
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
		custom: {
			roll: function (name){
				var face = 0;
				if(RNG.custom[name]){
					var faceIdx = genRN(RNG.custom[name].length-1);
					face = RNG.custom[name][faceIdx];
				}
				logIO(name,face);
				return face;
			},
			add: function (name,aSet){
				if(typeof(name) === 'string' && name.length && name !== 'roll' && name !== 'add') RNG.custom[name] = arrayify(aSet);
			}
		},
		deck: {
			create: function (aSet){

			},
			shuffle: (false && has_)? _.shuffle : primitiveShuffle
		},
		logs: {
			io: function (){return alog;},
			debug: function (){return adbg;}
		}
	};
	/*	Custom Prebuilds	*/
		RNG.custom.add('fsym',['+','-',' ','+','-',' ']);
		RNG.custom.add('fnum',[1,-1,0,1,-1,0]);
		RNG.custom.add('percentile',['00','10','20','30','40','50','60','70','80','90']);
	return RNG;
})();