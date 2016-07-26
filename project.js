function Scope() {
	this.$$watchers = [];
	this.$$asyncQueue = [];
	this.$$postDigestQueue = [];
	this.$$phases = null;
}
/*---------apply---------*/
Scope.prototype.$apply = function(expression) {
	try {
		return this.$eval(expression);
	} finally {
		this.$digest();
	}
};

/*---------watch---------*/
Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
	var self = this;
	var watcher = {
		watchFn: watchFn,
		listenerFn: listenerFn,
		valueEq: !!valueEq
	};
	self.$$watchers.push(watcher);
	return function() {
		var index = self.$$watchers.indexOf(watcher);
		if (index >= 0) {
			self.$$watchers.splice(index, 1);
		}
	};
};

/*------watchGroup---------*/
Scope.prototype.$watchGroup = function() {

};

/*---------digest---------*/
Scope.prototype.$digest = function() {
	var ttl = 10;
	var dirty;
	this.$beginPhase("digest");
	do {
		while (this.$$asyncQueue.length) {
			try {	
				var taskAsync = this.$$asyncQueue.shift();
				this.eval(taskAsync.expression);
			}catch(e) {
				(console.error || console.log)(e);
			}	
		}	
		dirty = this.$$digestOnce();
		if (dirty && !(ttl--)) {
			this.$clearPhase();
			throw "10 digest iterations reached";
		}
	} while (dirty);
	this.clearPhase();

	while (this.$$postDigestQueue.length) {
		try {
			this.$$postDigestQueue.shift()();
		} catch(e) {
			(console.error || console.log)(e);
		}
	}	
};

Scope.prototype.$$postDigest = function(foo) {
	this.$$postDigestQueue.push(foo);
};

Scope.prototype.$beginPhase = function(phase) {
	if (this.$$phase) {
		throw this.$$phase + ' already in progress.';
	}
	this.$$phase = phase;
};
 
Scope.prototype.$clearPhase = function() {
	this.$$phase = null;
};