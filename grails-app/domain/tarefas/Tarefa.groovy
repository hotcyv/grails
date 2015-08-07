package tarefas

class Tarefa {
    String nome
    Date deadLine
    Categoria categoria
    
    static belongsTo = [Categoria]

    static constraints = {
    }
}
