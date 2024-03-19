// PSEUDO CÓDIGO A*

// function A*_SEARCH (problem) returns a solution, or failure

// var
// 	node := a node with STATE = problem.INITIAL STATE; PATH-COST = 0
// 	frontier := a priority queue ordered by PATH-COST with node as the only element
// 	explored := an empty set

// begin
// 	loop do
// 		if EMPTY?(frontier) then return failure
// 		node := POP (frontier) {chooses the node with lowest f(n) in frontier}
// 		if problem.GOAL-TEST (node.STATE) then return SOLUTION(node)
// 		add node.STATE to explored
// 		for each action in problem.ACTIONS(node.STATE) do 
// 			child := CHILD-NODE(problem, node, action)
// 			if child.STATE is note in explored or frontier then frontier := INSERT (child, frontier)
// 			else if child.STATE is in frontier with higher PATH-COST then replace that frontier node with child
// 		end for
// 	end loop
// end
// end function

/* Checklist

1 - receber elemento de origem (inicio)
  1.1 - criar estrutura da matriz para armazenar:
    a) value = custo terreno + heuristica (distancia euclidiana)
    b) [linha][coluna]

2 - inserir elemento na lista de elementos a serem processados
  2.1 - criar duas lista:
    a) listaAberta (elementos a serem processados ou atual)
    b) listaFechada (elementos já processados)

3 - definir elemento como atual
  ???
4 - identificar candidatos a vizinhos
  4.1 - criar função para encontrar vizinhos
    a) deve verificar se o elemento está na posição da esquerda, da direita, de baixo ou de cima
    b) ???

5 - calcular heuristica (distancia euclidiana)
  5.1 - criar função calcularDistanciaEuclidiana e chamar sempre que o elemento origem (inicio) for atualizado

6 - somar resultado da heuristica com o custo de cada elemento
  6.1 - armazenar resultado da soma na matriz ???

7 - mostrar na tela matriz com valores de custo + distancia atual de cada elemento
  ???
8 - remover elemento da lista de elementos a serem processados e inserir na lista de processados
  ???
9 - ordenar elementos restantes na lista de a serem processados pelo custo
  ???
10 - voltar ao tópico 2 até encontrar o destino
  ???

*/
