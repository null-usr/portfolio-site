# Orbital ( Love2D physics-based game )

Orbital is a 2D physics-based game that I imagine being like Asteriods with physics and more lasers.



<figure class="video_container text-center">
  <video controls="true" allowfullscreen="true" poster="">
    <source src="/projects/orbital/03.mp4" type="video/mp4">
    <!-- <source src="path/to/video.ogg" type="video/ogg">
    <source src="path/to/video.webm" type="video/webm"> -->
  </video>
</figure>

It's build using the Love2D framework, written in Lua. I wrote/am writing an [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) that I like to call LoveMachine to help streamline development with future plans for multiplayer.<br>
I may or may not port it to a more suitible framework for this.

I modeled the physics system after real life [orbital mechanics equations](http://www.braeunig.us/space/orbmech.htm) and am currently trying to find a solution for Newtonian A* pathfinding similar to [this](https://github.com/matthew-piziak/spacepath) before moving on and getting help with the visuals and soundtrack.


---------------------

## To Do

- [ ] Docs
- [ ] A* Pathfinding in Newtonian Space
- [ ] HPA* Pathfinding in Newtonian Space
- [ ] Reinforcement Learning for AI agents
- [ ] Multiplayer (Nodejs + socket.io server?)

