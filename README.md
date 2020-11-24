# Co-Fit

[WIP] A website for collaborative home training developed as a term team project for Intro to Social Computing class at KAIST.

Figma prototype link: https://www.figma.com/file/b8vprYlAwNdzLiNzRRdQuP/CS473-Prototype?node-id=0%3A1

Project pitch: https://docs.google.com/presentation/d/1j_aOEr-9Q6buFGe0qfr5t1wXgEQ0YNySntKygniLWOo/edit

Outline:
- All the js pages are in src folder
- App.js is the main file that combines all other pages through react Routing
- Individual pages and components are located in src/components folder
The major components inside src/components:
- Feed: home page where posts are displayed
- CreatePost: Creating Posts to confirm completing an exercise
- AddTrainees: Page where you can see your co-trainees, message them, and connect with new co-trainees.
- AddExercise: Page for setting exercise schedules
- UserInfo: Page for setting and updating user information
- Calendar: Page for displaying the user's daily exercise schedule


Intructions:
- Run 'npm install' command if you do not have npm installed or 'npm install npm@latest -g' to update it.
- Run 'npm start'

To confirm your Node/NPM installation, run the following commands on your terminal:
- 'node -v'
- 'npm -v'
