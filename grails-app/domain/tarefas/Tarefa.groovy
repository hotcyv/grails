package tarefas

import grails.rest.*

@Resource(uri='/tarefas', formats=['json', 'xml'])

class Tarefa {
    String nome
    Date deadLine
    boolean completed
    Categoria categoria

    static constraints = {
    }
}
