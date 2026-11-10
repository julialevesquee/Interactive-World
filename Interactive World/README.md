# WEBVERSE — Spider-Man

An unofficial Spider-Man fan site with three tabs: Home, Movie Guide, and Web Lab.

The cover uses a new 3840 × 2160 three-Spider-Men action artwork with a clean, layered 3D frame. Pointer movement, touch dragging, and arrow keys tilt the image directly; there is no depth toggle, reset toolbar, or full-photo button on the home page. No blur or image filters are applied. Reduced-motion preferences keep it flat automatically. The black, red, blue, and gold interface includes original web linework.

## Interactive Spider-Verse and rooftop course

The home page includes four film worlds: Tobey Maguire, Andrew Garfield, Tom Holland, and Miles Morales. Drag to orbit the 3D carousel or choose a world, then open its portal to enter a playable rooftop course. Each world has its own skyline palette. The Explore Photos view replaces the old landmark buildings and pins with a rotating 3D photo gallery for that world. Drag to rotate, choose thumbnails, use previous/next buttons, toggle auto rotation, or open a selected photo at full size. Captions follow the selected film. The galleries use high-resolution Sony Pictures artwork plus an action still for Spider-Man (2002); all four galleries use their own matching films. See the source metadata for attribution.

The course uses a locally implemented 3D projection renderer on Canvas 2D, with an original illustrated Spider-Man, solid rooftop collisions, gravity, jump velocity, a constrained web rope, and camera following. No game framework or external rendering dependency is required.

- A/D or left/right: run along the course. W/S or up/down: move across roof depth.
- Space: jump. E or a blue anchor: attach/release a web. Hold right to gain momentum, then release on the upswing. Space can also release an attached web with an upward boost.
- R or Checkpoint: return to the latest landed roof. Falling returns automatically and preserves collected trackers.
- Touch buttons provide movement, Jump, and Attach/Release controls. Pause freezes the course. Photo-gallery view, leaving the portal, and hiding the browser tab also suspend simulation.
- Collect all three gold trackers and land at the finish flag to earn a course badge and save your best time for that world. Restart resets the full run; checkpoint retries preserve pickups. Badges from the earlier click-based activity are separate from new course completion badges.

## Movie guide

Eleven released theatrical Spider-Man features from 2002 through Brand New Day, plus the announced Beyond the Spider-Verse. Filter by actor/continuity, search titles, read short summaries, and save watched progress in this browser. Existing matching watch progress from earlier versions is preserved. Film status was checked November 10, 2026; release dates can change.

## Web Lab

Shoot a classic line, triple burst, or area net at moving training drones against an illustrated night-time Queens skyline. Drones bounce inside the arena; Cruise, Chase, and Rush control their speed. Challenge speed increases as the round progresses. Gold drones award double points. Pause and resume motion independently of the timer. Keyboard-focused drones hold still for accessible targeting; reduced-motion preferences start targets paused.

Villain Encounters is a second game mode with original vector illustrations of Green Goblin, Doctor Octopus, Electro, and Mysterio. Three moving weak points share an eight-point containment meter. Classic webs deal two containment points per catch; burst and net deal one per caught weak point. Containing a villain earns a 500-point bonus and a victory screen. You can play without a timer or try a 30-second encounter. Running out of time with containment remaining produces an escape result. Switching opponents or returning to drones resets the current round. Includes free play, a 30-second challenge, hit streaks, multi-target catches, a pointer aiming reticle, impact graphics, and a locally saved best challenge score. Use 1, 2, and 3 to switch web types. Targets support clicks, taps, and keyboard activation. Challenges pause when the page is hidden or you change the site tab. Reset returns to free play. Reduced-motion preferences are respected.

## Run locally

No build or package installation is required:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. On your Mac, extract the source into `/Users/julialevesque/Desktop/Interactive World`, open Terminal there, and run that command.

Publish `dist` with any static host. `.openai/hosting.json` preserves the existing private Sites deployment identity. No credentials are included. See `dist/credits.html` and `dist/media/sources.json` for film-image sources. Google Fonts is optional and has system fallbacks.

Spider-Man characters and film artwork belong to their respective owners. This independent fan project is not affiliated with Marvel, Sony, Columbia Pictures, or Disney.
