
const graph = new Dracula.Graph();


const airports  = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');


const routes = [
    ['PHX', 'BKK'],
    ['PHX', 'OKC'],
    ['BKK', 'OKC'],
    ['BKK', 'JFK'],
    ['OKC', 'JFK'],
    ['JFK', 'LAX'],
    ['LAX', 'MEX'],
    ['MEX', 'EZE'],
    ['EZE', 'HEL'],
    ['HEL', 'LOS'],
    ['LOS', 'LAP'],
    ['LAP', 'LIM'],
  ];

  const adjacencyList = new Map();
  function addNodeToList(airport){
    adjacencyList.set(airport, []);
  }
  function addEdgeToList(origin, destination){
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
    }

    airports.forEach(addNodeToList);
    routes.forEach(route => addEdgeToList(...route));


//run bfs addNode and addEdge for each airport
airports.forEach(airport => {
    const json = graph.toJSON();
    graph.addNode(airport);
    
    
    
    });

    
    routes.forEach(route => {
        graph.addEdge(route[0], route[1]);
    });

graph.edges.forEach(edge => {
    edge.style.stroke = 'green';
  
});





   const layouter = new Dracula.Layout.Spring(graph);
    layouter.layout();

    const renderer = new Dracula.Renderer.Raphael(document.getElementById('canvas'), graph, 700, 700);
    renderer.draw();



   //make unique id for each node

    document.querySelectorAll("#canvas > svg > ellipse").forEach(node => {
        const defaultColor = node.getAttribute('fill');
        const defaultStroke = node.getAttribute('stroke');
        
        node.addEventListener('mouseover', () => {
            node.setAttribute('fill', 'red');
            node.setAttribute('stroke', 'red');
        });
        node.addEventListener('mouseout', () => {
            node.setAttribute('fill', defaultColor);
            node.setAttribute('stroke', defaultStroke);

            
        });
    
    });

    function bfs(s){
        const visitedItems = document.createElement('div');
        visitedItems.classList.add('visited-items');
        // const queueItems = document.createElement('div');
        // queueItems.classList.add('queue-items');
        const onQueue = document.createElement('div');
        onQueue.classList.add('on-queue');

        const offQueue = document.createElement('div');
        offQueue.classList.add('off-queue');


        const visited = new Set();
        const queue = [s];
     //   queueItems.innerHTML += ` [ ${queue}]`;
        const path = [];
        visited.add(s);
        visitedItems.innerHTML = s
        while(queue.length){
 
            document.getElementById('textarea').value += ` ${queue} - currently in queue \n`;
            const node = queue.shift();
            document.getElementById('textarea').value += ` ${node} - popped from queue \n`;
          //  offQueue.innerHTML = queue;
            console.log(node+ "after pop");
            
            adjacencyList.get(node).forEach(neighbor => {
            if(!visited.has(neighbor)){
                visited.add(neighbor);
                visitedItems.innerHTML += ` - ${neighbor}`;
                path.push(neighbor);
                queue.push(neighbor);
                //print updated queue

               // queueItems.innerHTML += ` [ ${queue}]`;
            }
        });
    }
    document.getElementById('canvas').appendChild(visitedItems);
  //  document.getElementById('canvas').appendChild(onQueue);
   // document.getElementById('canvas').appendChild(offQueue);
   // document.getElementById('canvas').appendChild(queueItems);
        return visited;

    }








const visited = bfs('EZE');

const graph2 = new Dracula.Graph();
visited.forEach(airport => {
    graph2.addNode(airport);
});





const layouter2 = new Dracula.Layout.Spring(graph2);
layouter2.layout();

const renderer2 = new Dracula.Renderer.Raphael(document.getElementById('canvas'), graph2, 700, 700);
renderer2.draw();
