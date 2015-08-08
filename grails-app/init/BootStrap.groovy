package tarefas

class BootStrap {

    def init = { servletContext ->
        new Tarefa(nome:"Estudar OpenData...",deadline:'2015-12-12',categoria: new Categoria(nome:"Mestrado")).save()
        new Tarefa(nome:"Estudar Música...",deadline:'2015-11-11',categoria: new Categoria(nome:"Hobby")).save()
        
    }
    def destroy = {
    }
}
