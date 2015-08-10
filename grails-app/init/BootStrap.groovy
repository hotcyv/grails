package tarefas
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        JSON.registerObjectMarshaller(Tarefa) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['nome'] = it.nome
            returnArray['deadLine'] = it.deadLine
            returnArray['complete'] = it.complete
            returnArray['categoria'] = it.categoria.id
            returnArray['categoriaNome'] = it.categoria.nome
            return returnArray
        }

        JSON.registerObjectMarshaller(Categoria) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['nome'] = it.nome
            return returnArray
        }
        new Categoria(nome:"Profissional").save()
        new Categoria(nome:"Pessoal").save()
	    def c1 = new Categoria(nome: "Hooby")
        .addToTarefas(new Tarefa(nome:"Estudar Música...",deadLine:"2015-06-04",complete:"false"))
        .addToTarefas(new Tarefa(nome:"Estudar mestrado...",deadLine:"2015-08-09",complete:"true"))
        c1.save()
        if(c1.hasErrors()){
	       println c1.errors
	    }

    }
    def destroy = {
    }
}
