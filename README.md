README
======

Description
-----------------

WebSockets Stress Test - Tool written in NodeJS that allows to make a stress test
for your application that uses WebSockets. You can create behavior scenarios that
tool will run on every connection in test.

New features
------------

- Added "delay" parameter that sets interval in msec (1000 msec = 1 sec) before making
ws:// connection.
Useful to avoid "mass testing" when connecting to ws:// server

- Added "myScenario.js" - allows to test ws:// messages sending.

Example
--------
node wsst.js -c 10 ws://myserver.com:8082 example/myScenario.js



Installation
------------

cd websockets-stress-test

npm install

node wsst.js -h
