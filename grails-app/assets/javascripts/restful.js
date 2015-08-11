storageEngine = function() {
	var initialized = false;
	var initializedObjectStores = {};

	return {
		init : function(successCallback, errorCallback) {
			initialized = true;
			successCallback(null);
		},
		initObjectStore : function(type, successCallback, errorCallback) {
			initializedObjectStores[type] = true;
			successCallback(null);
		},
		save: function(type, obj, successCallback, errorCallback) {
			var method = (obj.id == '')? 'POST' : 'PUT';
			var url = (obj.id == '')? type : type + '/' + obj.id;
			$.ajax({
				method: method,
				url: url,
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(obj)
			}).then(function() {
				successCallback(null);
			});
		},
		delete : function(type, id, successCallback, errorCallback) { 
			$.ajax({
				method:'DELETE',
				url: type + '/' + id,
				sucess: successCallback(id)
			}).then(function() {
				successCallback(null);
			});
		},
		findById : function (type, id, successCallback, errorCallback)	{	
			$.ajax({
				url: type + '/' + id
			}).then(function(data) {
				successCallback(data);
			});
		},
		findAll : function(type, successCallback, errorCallback) {
			$.ajax({
				url: type
			}).then(function(data) {
				var result = [];
				$.each(data, function(i, v) {
					result.push(v);
				});
				successCallback(result);
			});
		},
	}
}();