package tarefas

import grails.rest.*

@Resource(uri='/tarefas', formats=['json', 'xml'])

class Tarefa {
    String nome
    String deadLine
    String complete
    //Categoria categoria
    String categoria

    static constraints = {
    }
}
