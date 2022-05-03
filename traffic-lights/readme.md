Prerequisites:

1. node >= 12.22.6
2. npm >= 6.14.5

1) Install node modules by command: npm i.
2) Run "npm run start" to begin development process.
3) Run "npm run build" to create build.

In code we use next logic objects:

1. Application.
   Class Application doesn't contain any public methods but define
   all form logic.

2. TrafficLights.
   Class TrafficLights containt next public methods:

1) start - it start work of traphic-lights widget.
2) stop - it stops work of traphic-lights widget.
3) getLastParams - we use this param to set them in local storage to save our
   trapffic-lights state before we close application.
4) resume - resume work of stopped traffic-lights.

3. Timer.
   Class Timer designed to incapsulate all timing logic.

1) Property remaining contains remaining time to execute callback. We set it in local storage before we close application.
2) Method start designed for start timer.
3) Method pause designed for pause work of out timer.
4) Method resume designed for resume work of our timer.

4. Lantern.
   Class Lantern contains logic for traffic-lights's lanterns.

1) Method turnOnOff designed for turn on/off our lantern.
2) Property timing contains delay time until the next switch.
3) Property color contains color of our lantern.
