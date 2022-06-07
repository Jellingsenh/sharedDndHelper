Created by Josh Haynes 26 Dec 2021

This is a game to help streamline dnd combat & skills. It will help keep track of character health, damage, abilities, skills, spells, and many other things. The purpose of the game is to free your brain of the details of combat so you can be more immersed in the role-playing.

It is best used with real dice & having a DM to oversee everything & tweak characters as needed (I designed it to be highly customizable in case a player does something unexpected).

!!! Please support Wizards of the Coast and purchase the official Dungeons & Dragons 3.5 Player's Handbook. This game is not intended to replace the books, but rather to suppliment them and help new players understand the game mechanics without needing to know every rule.

--------------------

How to compile & run project:
  -> there are 2 main parts: a Maven & Java Spring Boot API server, and a React webapp.

1) to compile & run the server:
  a) download Maven (https://maven.apache.org/download.cgi)
  b) set the PATH variable (export PATH=/d/Coding/resources/apache-maven-3.8.4/bin:$PATH) -> verify with "mvn -v"

  c) compile: ./mvnw clean package

  d) run: java -jar target/rest-service-0.0.1-SNAPSHOT.jar

2) to run the webapp:
  a) install npm (sudo apt isntall npm)
  b) npm start (in the dnd-gui directory)

--------------------

Connecting to the webapp (running on http://localhost:3005/):
Connecting via:
  Same network: http://192.168.1.65:3005/
  Different network: http://{your ip}:3005/

You'll have to find your ip addresess ^ (the top one is ipv4)


--------------------

You will also have to replace all of the instances of YOUR_URL_HERE with your own ip address!!
