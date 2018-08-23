# TheGame

## About

A simplest logic game developed only with HTML and CSS

> Because I can!

Player has a square field with cells. Clicking on cell changing it's color and affect to color of some other cells on the field (invert it). Purpose of player - make all cells filled with one color.

This game is metaphor about CSS. Just feel the pain.

## How to run

You need just two commands to start your adventure:
```
npm install
gulp new
```
And open the gates to the hell in the *build/index.html* !

## Generating levels

You can generate new level with options. Like this:
```
gulp new -size 3 -cohesion 2 -steps 4
```
A lot of comments about it.

```-size``` is side of square field in cell. For example if you set ```-size 3``` number of all cells will be 9.

```-cohesion``` is maximum number of linked cells. It means that number of cells that changing color with clickable cell cannot be more than number of _cohesion_.

```-steps``` is number of steps that will made to randomize field. Recommended to set it according to size of your field.