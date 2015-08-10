package tarefas

import grails.rest.*

@Resource(uri='/categorias', formats=['json', 'xml'])

class Categoria {
    String nome
    
    static hasMany = [tarefas: Tarefa]

    static constraints = {
    }
}
