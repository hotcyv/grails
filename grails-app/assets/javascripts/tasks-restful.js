storageEngine = function() {
	var initialized = false;
	var initializedObjectStores = {};

	function getStorageObject(type) {
		var item = localStorage.getItem(type);
		var parsedItem = JSON.parse(item);
		return parsedItem;
	}
	return {
		init : function(successCallback, errorCallback) {
			initialized = true;
			successCallback(null);
		},
		initObjectStore : function(type, successCallback, errorCallback) {
			initializedObjectStores[type] = true;
			successCallback(null);
		},
		save: function(obj, successCallback, errorCallback) {
			var method = (obj.id == '')? 'POST':'PUT';
			var url = (obj.id == '')? 'tarefas':'tarefas/' + obj.id;
			$.ajax({
				method: method,
				url: url,
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(obj)
			}).then(function() {
				successCallback(null);
			});
		},
		delete : function(id, successCallback, errorCallback) { 
			$.ajax({
				method:'DELETE',
				url: 'tarefas/' + id,
				sucess: successCallback(id)
			}).then(function() {
				successCallback(null);
			});
		},
		/*update : function(obj, successCallback, errorCallback) {
			$.ajax({
				method:'PUT',
				url: 'tarefas/' + obj.id,
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(obj),
			}).then(function() {
				successCallback(null);
			});
		},*/
		findById : function (id, successCallback, errorCallback)	{	
			$.ajax({
				url: 'tarefas/' + id
			}).then(function(data) {
				successCallback(data);
			});
		},
		findAll : function(successCallback, errorCallback) {
			$.ajax({
				url: 'tarefas'
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