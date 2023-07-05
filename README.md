# README
-   The following repository manages the codebase for the marquee [operator app](https://marquee-ta.vercel.app/) and admin [studio](https://marquee.sanity.studio/).

### Setup (in-progress)
-   Simply run `docker-compose up` to get the marquee app and sanity studio running locally via docker containers.

### Services
-   localhost:3000 - Marquee Next App
-   localhost:3333 - Sanity Studio
-   localhost:6006 - Storybook Workshop

### Scripts
-   Run `docker-compose up` to build containers and install dependencies (this takes a couple minutes when running for the first time).
-   Run `docker-compose stop` to stop all container services.
-   Run `yarn docker-compose start` to start all container services again.

### Alternative
-   If you prefer to run the services using your own machine, and not docker, please read the README.md in the `web/` and `app/` directories. All local testing has been done with `node v19.6.1` and `yarn` on a Mac OS environment.
