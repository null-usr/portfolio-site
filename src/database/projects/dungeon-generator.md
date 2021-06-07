# Simple Procedural Room-Based Dungeon and Organic Map Generator

Based on [this blog post](https://www.gamasutra.com/blogs/AAdonaac/20150903/252889/Procedural_Dungeon_Generation_Algorithm.php), [this reddit post](https://www.reddit.com/r/gamedev/comments/1dlwc4/procedural_dungeon_generation_algorithm_explained/) and [this youtube series](https://www.youtube.com/watch?v=eJEpeUH1EMg)

These projects are quite interesting and I highly recommend you take a look at them!

---------------------

Dungeon Generator is a tool for creating 2D organic and inorganic-styled maps written in C++, with the option of having the maps either be fully or partially connected.<br>
I wanted to mimic the physics-based randomization without the need for a full physics engine so that I could create maps and layouts that could be easily loaded into anything else I wrote.

![image](/projects/dungeon-generator/sample_04.png "organic style") 
![image](/projects/dungeon-generator/sample_03.png "inorganic style") 

<b>Organic</b> maps are created by randomly filling a grid of specified dimensions then smoothing it out a specified number of times via [Cellular Automita](https://en.wikipedia.org/wiki/Cellular_automaton). Any islands deemed to small that weren't eroded during the smoothing are then removed.

<b>Non-Organic</b> maps are created using a graph-based approach. Rooms of random dimensions are added as nodes to a system based on the total map area and desired fill percentage; twice as many rooms are created as needed. The rooms are then sorted based on the the fewest surrounding rooms and 50% are chosen. Their positions are them massaged by the faux-physics system to spread them apart and then a graph is created with these new node positions.<br><br>
All nodes are then connected to each other and a [Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree) is created for the initial room connections.<br>
Cycles are then added back in by getting the surrounding nodes of each node in physical space and comparing that to their distance in the Graph.


The resulting maps can then be styled in various ways and saved as a text file. As it currently stands, the maps are represented as 1s and 0s but a depth option is being considered for later maps.

---------------------

## To Do

- [ ] Docs
- [ ] Clean up library export
- [ ] Flip 1s and 0s ( 0s look better for land when you're looking at it, but that's just not how this world works )


---------------------

## LINKS

* [Find the project here](https://github.com/Ferrohound/Dungeon)