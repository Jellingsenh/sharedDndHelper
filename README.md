Created by Josh Haynes 26 Dec 2021

This is a game to help streamline dnd combat & skills. It will help keep track of character health, damage, abilities, skills, spells, and many other things. The purpose of the game is to free your brain of the details of combat so you can be more immersed in the role-playing.

It is best used with real dice & having a DM to oversee everything & tweak characters as needed (I designed it to be highly customizable in case a player does something unexpected).

!!! Please support Wizards of the Coast and purchase the official Dungeons & Dragons 3.5 Player's Handbook. This game is not intended to replace the books, but rather to suppliment them and help new players understand the game mechanics without needing to know every rule.

--------------------

How to compile & run project:
  -> there are 2 main parts: a Maven & Java Spring Boot API server, and a React webapp.

1) to run the server:

  a) Download Eclipse
  b) Select File -> Import Projects -> Existing Maven projects.
  c) Select the API/rest-service/ folder, Select Enter.
  d) Once Imported, set up a run configuration (right next to the green arrow). Project = rest-service, Main class = RestServiceApplication.java.
  e) Now you can just hit Run (the g arrow) to run the server!

2) to run the webapp:

  a) Get Windows subsystem for Linux (if on Windows): https://docs.microsoft.com/en-us/windows/wsl/install
  b) (In Ubuntu) Install React:
      'sudo apt update && sudo apt upgrade'
      'sudo apt install npm'
      'sudo apt install nodejs'
      'sudo npm install'
      'npx create-react-app'
  c) Other dependencies (navigate into the dnd-gui folder): 
      'sudo npm install @material-ui/core'
      'sudo npm install @material-ui/icons'
      'sudo npm install react-dom'
      'sudo npm install react-router-dom'
  d) To run the website, navigate to the dnd-gui directory and enter: 
      'npm start'

--------------------

Connecting to the webapp (running on http://localhost:3005/):
Connecting via:
  Same network: http://{your_local_ip_here}:3005/
  Different network (may require port forwarding): http://{your_network_ip_here}:3005/

You'll have to find your own ip addresess! (the top one is ipv4)


--------------------

You will also have to replace all of the instances of YOUR_URL_HERE in the React code with your own ipv4 address!! 
(I used VScode's find and replace)
