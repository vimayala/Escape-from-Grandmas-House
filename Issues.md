### Archive of Fixes and Solutions
    - [X] "Frame X not found in texture"
        - [X] Fixed: Redefined endFrame for grandma and grandon's spritesheets in preload()
    - [X] Setting frame for jump animation wouldn't play all frames
        - [X] Fixed: Callback times need to be set to increasing times
    - [X] Creating new Dart in Grandson prefab wouldn't work
        - [X] Fixed: Forgot to call scene in the constructor