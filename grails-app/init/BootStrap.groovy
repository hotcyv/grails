package tarefas

class BootStrap {

    def init = { servletContext ->
        //new Tarefa(nome:"Estudar OpenData...",deadLine:new Date(),completed:true,categoria: new Categoria(nome:"Mestrado")).save()
        //new Tarefa(nome:"Estudar Música...",deadLine:new Date(),completed:false,categoria: new Categoria(nome:"Hobby")).save()
        new Tarefa(nome:"Estudar Mestrado...",deadLine:"12/12/2016",complete:false,categoria:"Pessoal").save()
        new Tarefa(nome:"Estudar Música...",deadLine:"08/08/2015",complete:false,categoria:"Profissional").save()
        
    }
    def destroy = {
    }
}
