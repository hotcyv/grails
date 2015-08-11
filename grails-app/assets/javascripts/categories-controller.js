categoriesController = function() {
	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}

	var categoryPage;
	var initialised = false;
	return {
		init : function(page) {
			if (!initialised) {
				categoryPage = page;
				$(categoryPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
				$(categoryPage).find('tbody tr:even').addClass('even');
				$(categoryPage).find('#btnAddCategory').click( function(evt) {
					evt.preventDefault();
					$(categoryPage).find('#categoryCreation').removeClass('not');
				});

				$(categoryPage).find('#tblCategories tbody').on('click', 'tr',
					function(evt) {
						$(evt.target).closest('td').siblings( ).andSelf( ).toggleClass('rowHighlight');
				});

				$(categoryPage).find('#saveCategory').click(function(evt) {
					evt.preventDefault();
					if ($(categoryPage).find('form').valid()) {
						var category = $(categoryPage).find('form').toObject();		
						storageEngine.save('categoria',category, function() {
							$(categoryPage).find('form').trigger('reset');
							$(categoryPage).find('#categoryId').removeAttr('value');
							$(categoryPage).find('#categoryCreation').addClass('not');
							categoriesController.loadCategories();
							tasksController.loadTasks();
						}, errorLogger);
					}
				});

				$(categoryPage).find('#tblCategories tbody').on('click', '.editRow', 
					function(evt) { 
						$(categoryPage).find('#categoryCreation').removeClass('not');
						storageEngine.findById('categoria', $(evt.target).data().categoryId, function(category) {
							$(categoryPage).find('form').fromObject(category);
						}, errorLogger);
					}
				);

				$(categoryPage).find('#tblCategories tbody').on('click', '.deleteRow', 
					function(evt) {
						storageEngine.delete('categoria', $(evt.target).data().categoryId, 
							function() {
								$(evt.target).parents('tr').remove();
								categoriesController.loadCategories();
							}, errorLogger);
					}
				);

				//Semelhante à ação editar, porém o objeto a ser carregado no form é vázio, limpando, assim, o form.
				$(categoryPage).find('#clearCategory').click(function(evt) {
					evt.preventDefault();
					//Reinicia o formulário
					$(categoryPage).find('form').trigger('reset');
				});
				initialised = true;
			}
		},
		loadCategories : function() {
			storageEngine.findAll('categorias',
				function(categories) {
					$(categoryPage).find('#tblCategories tbody').empty();
					$.each(categories, function(index, category) {
						//Precarregar e indicar à engine de template o status da tarefa.
						$('#categoryRow').tmpl(category).appendTo($(categoryPage).find('#tblCategories tbody'));
					});
			}, 
			errorLogger);
		}
	}
}();