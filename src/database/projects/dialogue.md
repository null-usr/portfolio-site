# Bark (tentative)

A Standalone dialogue editor (more accurately a JSON relational database editor). I've used a handful of dialogue editors in the past and I've found that they tend to be either too rigid in their structured output or not structured much at all. I wanted to create a tool independent of any specific game engine where I could quickly define and save my own nodes to suit whatever project I'm working on. 

---------------------

![image](/projects/dialogue/01.png "Responsive images") 

The value the tool brings, for me, is the ability to construct and save your own schemas and groups of nodes in order to tailor the data structures to your project as opposed to the tool dictating how your project flows.

I can also picture the tool being used for more than dialogue which is why I tried to design it to be as open as possible.

![image](/projects/dialogue/02.png "Contact and embedded form")

I chose to use React because that just happened to be what I use for work and I happened upon an interesting library [React Flow](...) so I thought I'd give it a try. It came with its unique set of react-related challenges but overall I'm very happy with the experience I've gained while working on it and hopefully performance-wise it will be able to keep up with my future projects. 

Should it be not enough I may consider rewriting it in C++ using [DearImgui](...). 

---------------------

## To Do

- [ ] UI/UX freshen-up
- [ ] Export configuration
- [ ] Packaging, distribution, marketing
- [ ] Github Pages


---------------------

## LINKS

* [Source code](https://github.com/null-usr/DialogueEditor)