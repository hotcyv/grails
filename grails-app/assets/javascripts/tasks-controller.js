tasksController = function() {
	
	//Contabilizar a quantidade de linhas da tabela de tarefas e atualizar o <span>.
	function taskCount() {
		var completedCount = 0;
		var totalCount = $(taskPage).find('#tblTasks tbody tr').length;
		//Iterar sobre cada linha da tabela
		$.each($(taskPage).find('#tblTasks tbody tr'),function(index, task) {
			//Contabilizar apenas tarefas completadas, verificando se alguma coluna da tarefa possui a classe taskCompleted
			if ($(task).find('td').hasClass("taskCompleted")){
				completedCount += 1;
			}
		});
		//Inserir/atualizar o conteúdo do span contador.
		$('footer').find('#taskCount').text(totalCount - completedCount);
	}
	//Extrair o deadline da tarefa via parse e comparar com hoje(vencida) ou 3 dias(vencendo) por meio da biblioteca date.js
	function checkDeadline() {
		//Iterar sobre cada linha da tabela
		$.each($(taskPage).find('#tblTasks tbody tr'),function(index, task) {
			//Localicar a tag time e convetê-lo para um objeto Date.
			var deadline = Date.parse($(task).find('[datetime]').text());
			//x.compareTo(y): 0 => igual, negativo => x < y, positivo => x > y
			if (deadline.compareTo(Date.today()) < 0) {
				$(task).addClass("overdue");
			// 3 dias a partir de hoje	
			} else if (deadline.compareTo((3).days().fromNow()) <= 0) {
				$(task).addClass("warning");
			}
		});
	}
	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}

	var taskPage;
	var initialised = false;
	return {
		init : function(page) {
			storageEngine.init(function() {
				storageEngine.initObjectStore('task', function() {}, errorLogger)
			}, errorLogger);
			if (!initialised) {
				taskPage = page;
				$(taskPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
				$(taskPage).find('tbody tr:even').addClass('even');
				
				$(taskPage).find('#btnAddTask').click( function(evt) {
					evt.preventDefault();
					$(taskPage ).find('#taskCreation').removeClass('not');
				});
				$(taskPage).find('#tblTasks tbody').on('click', 'tr',
					function(evt) {
						$(evt.target ).closest('td').siblings( ).andSelf( ).toggleClass('rowHighlight');
				});
				$(taskPage).find('#saveTask').click(function(evt) {
					evt.preventDefault();
					if ($(taskPage).find('form').valid()) {
						var task = $(taskPage).find('form').toObject();		
						storageEngine.save(task, function() {
							$(taskPage).find('form').trigger('reset');
							$(taskPage).find('#taskCreation').addClass('not');
							tasksController.loadTasks();
						}, errorLogger);
					}
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.editRow', 
					function(evt) { 
						$(taskPage).find('#taskCreation').removeClass('not');
						$(taskPage).find('#taskCreation').removeClass('not');
						storageEngine.findById($(evt.target).data().taskId, function(task) {
							$(taskPage).find('form').fromObject(task);
						}, errorLogger);
					}
				);
				//Semelhante à ação editar, localiza-se a tarefa selecionada e adiciona-se um atributo "completado", salvando-se a alteração em seguida.
				$(taskPage).find('#tblTasks tbody').on('click','.completeRow', 
					function(evt) {
						storageEngine.findById($(evt.target).data().taskId, 
							function(task) {
								//Novo atributo da tarefa associado
								task.complete = true;
								storageEngine.save(task, 
								//Forçar a atualização da lista de tarefas
									function() {
										tasksController.loadTasks();
									},errorLogger);
							}, errorLogger);
					}
				);
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', 
					function(evt) {
						storageEngine.delete($(evt.target).data().taskId, 
							function() {
								$(evt.target).parents('tr').remove();
								tasksController.loadTasks();
							}, errorLogger);
					}
				);
				//Semelhante à ação editar, porém o objeto a ser carregado no form é vázio, limpando, assim, o form.
				$(taskPage).find('#clearTask').click(function(evt) {
					evt.preventDefault();
					//Reinicia o formulário
					$(taskPage).find('form').trigger('reset');
				});
				initialised = true;
			}
		},
		loadTasks : function() {
			storageEngine.findAll( 
				function(tasks) {
					//Ordenar o array das tarefas por meio do método sort utilizando a lógica de comparação do método compareTo do objeto Date.
					//Reverter a ordem asc padrão: .reverse() ao final
					tasks.sort(function(task1, task2) {
						return Date.parse(task1.deadLine).compareTo(Date.parse(task2.deadLine));
					}).reverse();
					$(taskPage).find('#tblTasks tbody').empty();
					$.each(tasks, function(index, task) {
						//Precarregar e indicar à engine de template o status da tarefa.
						$('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
					});
					//Atualizar o contador ao carregar as taferas
					taskCount();
					//Verificar o deadline e aplicar o css correspondente
					checkDeadline();
			}, 
			errorLogger);
		}
	}
}();