package tarefas

class Categoria {
    String nome
    
    static belongsTo = [tarefa:Tarefa]

    static constraints = {
    }
}
