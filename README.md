# Boxmoves Game

A lightweight 2D browser game built using **Kontra.js** and **HTML5 Canvas**.

The player moves inside the canvas using arrow keys.  
A target appears at random positions, and whenever the player reaches the target, it relocates to a new random position.

---

## 🛠 Tech Stack
- JavaScript (ES Modules)
- Kontra.js
- HTML5 Canvas
- npm + Vite (dev server)

---

## 🎮 Controls
- **Arrow Left** – Move left
- **Arrow Right** – Move right
- **Arrow Up** – Move up
- **Arrow Down** – Move down

---

## ⚙️ Game Logic
- Player movement with boundary constraints
- Target spawns at random positions inside the canvas
- Target relocates when the player overlaps with it
- Simple collision detection (AABB)

---

## 🚀 Getting Started

### Clone the repo
```bash 
git clone https://github.com/satyansh2004/boxmoves.git
```
---

### Install dependencies
```bash
npm install kontra
```
---
### Run the game
```bash
npm run dev
```
Open the local server URL shown in the terminal.

---

## 📌 Purpose


This project is a practice exercise to understand:

- Game loops
- Sprite-based movement
- Collision detection
- Basic game mechanics using Kontra.js

---
Play here - https://boxmoves.netlify.app/
