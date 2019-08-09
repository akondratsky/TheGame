# TheGame
# Yes, the pure HTML & CSS

![Game-image](https://raw.githubusercontent.com/akondratsky/TheGame/master/img.png)

## System Requirments

Browser.

## About

Generated game uses pure HTML and CSS. I created it when studied in EPAM's training center. By first, it was the way to improve "hard" skills, and, by second, the try to understand, where is in nowadays a fine line between programming and markup languages. And...

> Because I can!

## Rules

Player has a square field with cells. Clicking on cell changing it's color and affects the color of some other cells in the field by inverting it. Purpose of player is make all cells filled with one color.

## How to

It's easy:
```
npm install
npm run new
```
And check file *build/index.html* !

## Generating levels

You can choose level of difficulty by adding ```:<level>``` to your ```new``` command, for example ```npm run new:easy```. There is four levels: ```easy```, ```normal```, ```hard``` and ```nightmare```.

Also you can generate level by your own as you wish.
```
npm run new -- --size=3 --cohesion=2 --steps=4
```
Few comments about it.

```--size``` is a size of side of square field in cells.

```--cohesion``` is maximum number of linked cells. It means that number of cells that changing color with clickable cell cannot be more than number of _cohesion_.

```--steps``` is number of steps that will made to randomize field. Recommended to set it according to size of your field.
