## General
### Original Plan
The living room scene, 
the end screen (unanimated), and a 
menu screen (possibly using the older art style map if it suits the style). 
The living room scene will depict the grandma beginning on the right side of the screen and heading towards the grandchild while walking back and forth so the player can predict her movement. The player will be able to shoot at her or throw toys. After a certain amount of points have been collected, the player will be able to escape the grandmother. This will call the event where she will either be tired or have back pain in which the player has enough time to escape her.
A score scene displaying the player’s score and a prompt to play again or return to the menu as well as a ranking of the type of grandchild they are.
A credits scene accessible from the menu
A street sequence where the child runs away from the grandma and her house

### Scene Goals
## Living Room
Shoot the grandma as much as possible until x points (maybe 50,000, may adjust) reached. Then grandson runs away past screen and grandma chases (if possible).

## Street
Avoid the hearts and kisses while grandma chases you. If you run into one, slow down and get closer to grandma. Or grandma gets closer instead.

### Need
## Menu.js
    - [ ] Add scene change for credit and controls

## Play.js
    - [ ] Points
        - [ ] Sound effect (?)
    - [ ] Heart and Skull Particles or Anim (or both)

    - [ ] Either: 
        - Get on other side:             
            - super space
            - or space to dash past
    - [ ] Change grandma velocity as points increase

## Street.js
    - [ ] If player hasn't hit obstacle for 30 seconds, add to score else restart timer

## GameOver.js
    - [ ] End Screen + Anims (maybe with tweens?)
    - [ ] Allow restarting

## Other
    - [ ] Export all art
    - [ ] Add More Sound Effects
    - [ ] Music
    - [ ] Add scared sprites in both directions
    - [ ] Move jumpAnim to global scope ?

## If time allows
    - [ ] Add more animation to menu
    - [ ] Warning/tint when you're gonna be captured
    - [ ] Add another level (probably not by due date :/)

### Fixes
    - [ ] Overlapping states ... ?
    - [ ] When Jump SFX + Dart SFX plays
    - [ ] Add more flags ? like kissing states ??
    - [ ] Make grandson change direction function and direction factor (being reused a lot)
    - [ ] Counter tween cuts off points (not in 500 increments)
    - [ ] Find instances where grandma continues chasing (fix if able)


## March 10
### 3 hrs
- [X] Code: Fixed super jump state
- [X] Code: Added score counter tween
- [ ] Scene: End screen
- [X] Scene: Worked on Street scene
- [ ] Scene: Add controls screen for tomorrow

## March 9
### 3 hr
- [X] Code: Added super jump state, still testing
- [X] Code: Edits to Grandma and Grandson
- [X] Code: Added beginning controls for scene changes
- [X] Scene: Started End Screen
- [X] Assets: Added Arcade Frame + Hearts


## March 8
### 2 hrs
- [X] Code: Add Comments
- [X] Code: Add Grandma/Grandson Collision (temp print message)
- [X] Code: Change Grandson jump distance
- [X] Code: Added scaling
- [X] Code: Improvisational Dart Cooldown


## March 7
### 6 hr
- [X] Art: Draw Street Scene
- [X] Code: Implement Grandma getting hit and moving in correct direction
- [X] Sound Effects

## March 6
#### 4 hr
- [X] Code: Grandma Prefab + State Machines
- [X] Code: Grandson Fixing State Machine Transitions
- [X] Code: Dart Prefab

## March 5
#### 30 min
- [X] Code: Added Darts, need to fix where they spawn
- [X] Assets: Started Street, need to draw the rest
- [X] Planned more game flows and mechanics

## March 3
#### 3.5 hr
- [X] Code: State Machines
- [X] Animation: Make Grandson Jump Right X and Y amount
- [X] Assets: Added Bitmap Font for Scoring

## March 2
#### 3 hrs
- [X] Drew: Basic Animated Menu Screen
    <!-- - [ ] Better Animation got corrupted and deleted :))) super fun -->
- [X] Code: Added Animation for Menu Screen

## March 1
#### 2 hr
- [X] Drew: Grandson Getting Kisses
- [X] Drew: Grandson Getting and Shooting Gun
- [X] Drew: Toy Gun
- [X] Darts
- [X] Prototype with living room, grandson, and grandma


## Feb 29
#### 3 hrs
- [X] Drew: Gun Stars
- [X] Drew: Monster Door
- [X] Drew: Toy Gun
- [X] Drew: Grandma Giving Kisses
- [X] Code: Edited set up, messed with displays
- [X] Sprites: Joined Grandma for spacing

## Feb 28
#### 2 hr
- [X] Drew: Color living room
- [X] Drew: Grandma Chasing
- [X] Drew: Grandson Running


## Feb 27
#### 2 hrs
- [X] Photoshop photos to outline (about half)
- [X] Drew: Grandson Scared 
- [X] Drew: Grandma Standing
- [X] Drew: Completed living room (need to color)

## Feb 26
#### 1 hr
- [X] Drew: Completed living room (need to color)
- [X] Drew: Door 

## Feb 22
### 30 min
- [X] Created plan
- [X] Began living room outline