<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Tarefas</title>
    <asset:stylesheet src="jquery-ui.css"/>
    <asset:stylesheet src="02-tasks.css"/>
    <asset:javascript src="jquery-2.1.3.js"/>
    <asset:javascript src="jquery.validate.js"/>
    <asset:javascript src="jquery.tmpl.js"/>
    <asset:javascript src="jquery-serialization.js"/>
    <asset:javascript src="tasks-controller.js"/>
    <asset:javascript src="categories-controller.js"/>
    <asset:javascript src="restful.js"/>
    <asset:javascript src="date.js"/>
    <asset:javascript src="jquery-ui.js"/>
    <script>
    $(document).ready(function() {
    	$("#tabs").tabs();
	    tasksController.init($('#taskPage'));
	    tasksController.loadTasks();
	    categoriesController.init($('#categoryPage'));
	    categoriesController.loadCategories();
    });
    </script>
</head>
<body>
	<header>
		<span>Sistema Gestão Tarefas</span>
	</header>
	<div id="tabs">
	<ul>
	    <li><a href="#tabs-1">Tarefas</a></li>
	    <li><a href="#tabs-2">Categorias</a></li>
	</ul>
	<div id="tabs-1">
		<main id="taskPage">
			<section id="taskCreation" class="not">
				<form id="taskForm">
					<input type="hidden" name="id" id="taskId"/>
					<input type="hidden" name="complete" id="complete" value="false" />
					<div>
						<label>Tarefa</label> 
						<input type="text" required="required" name="nome" class="large" placeholder="Estudar e programar" maxlength="200"/>
					</div>
					<div>
						<label>Finalizar até</label> <input type="date" required="required" name="deadLine" />
					</div>
					<div>
						<label>Categoria</label> 
						<select id="categoria" name="categoria">
						</select>
					</div>
					<nav>
						<a href="#" id="saveTask">Salvar tarefa</a> <a href="#" id="clearTask">Limpar tarefa</a>
					</nav>
				</form>
			</section>
			<section>
				<table id="tblTasks">
					<colgroup>
						<col width="40%">
						<col width="15%">
						<col width="15%">
						<col width="30%">
					</colgroup>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Deadline</th>
							<th>Categoria</th>
							<th>Ações</th>
						</tr>
						<!-- Taferas estáticas removidas-->
					</thead>
					<tbody>
					</td>
						</tr>
					</tbody>
				</table>
				<nav>
					<a href="#" id="btnAddTask">Adicionar tarefa</a>
				</nav>
			</section>
		</main>
		<!-- Tag span com id e conteúdo dinâmico-->
		<footer>Você tem <span id="taskCount"></span> tarefa(s) pendente(s)!</footer>
	</div>
	<div id="tabs-2">
		<main id="categoryPage">
			<section id="categoryCreation" class="not">
				<form id="categoryForm">
					<input type="hidden" name="id" id="categoryId"/>
					<div>
						<label>Categoria</label> 
						<input type="text" required="required" name="nome" class="large" placeholder="Pessoal..." maxlength="200"/>
					</div>
					<nav>
						<a href="#" id="saveCategory">Salvar categoria</a> <a href="#" id="clearCategory">Limpar categoria</a>
					</nav>
				</form>
			</section>
			<section>
				<table id="tblCategories">
					<colgroup>
						<col width="40%">
						<col width="15%">
					</colgroup>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
					</td>
						</tr>
					</tbody>
				</table>
				<nav>
					<a href="#" id="btnAddCategory">Adicionar categoria</a>
				</nav>
			</section>
		</main>
	</div>
</body>
<script id="taskRow" type="text/x-jQuery-tmpl">
<tr>
	<!-- Utilizar estrutura de condições da engine de template para esconder as ações de editar e completar para as tarefas já completadas-->
	<!-- O conteúdo das tags é grifado se a condição for atendida: tarefa completa.-->
	<td {{if complete == "true"}} class="taskCompleted" {{/if}}>{{= nome}}</td>
	<td {{if complete == "true"}} class="taskCompleted" {{/if}}>
		<time datetime="{{= deadLine}}">{{= deadLine}}</time>
    </td>
	<td {{if complete == "true"}} class="taskCompleted" {{/if}}>{{= categoriaNome}}</td>
	<td>
		<nav>
		<!-- As opções de editar e completar serão apresentadas se a condição for atendida: tafera incompleta.-->
		{{if complete == "false"}}
			<a href="#" class="editRow" data-task-id="{{= id}}">Edit</a>
			<a href="#" class="completeRow" data-task-id="{{= id}}">Complete</a>
		{{/if}}
		<a href="#" class="deleteRow" data-task-id="{{= id}}">Delete</a>
		</nav>
	</td>
</tr>
</script>
<script id="categoryRow" type="text/x-jQuery-tmpl">
<tr>
	<td>
		{{= nome}}
	</td>
	<td>
		<nav>
			<a href="#" class="editRow" data-category-id="{{= id}}">Edit</a>
			<a href="#" class="deleteRow" data-category-id="{{= id}}">Delete</a>
		</nav>
	</td>
</tr>
</script>
</html>
