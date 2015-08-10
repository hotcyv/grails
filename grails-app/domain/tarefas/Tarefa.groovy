package tarefas

import grails.rest.*

@Resource(uri='/tarefas', formats=['json', 'xml'])

class Tarefa {
    String nome
    String deadLine
    String complete
    static belongsTo = [categoria: Categoria]

    static constraints = {
    }
}
