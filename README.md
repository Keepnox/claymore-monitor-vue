# Claymore Monitor With VueJS
Web Monitoring Claymor Ethereum GPU Miner VueJS + NodeJS Based 
Demo : (http://panel.marsmining.xyz)

---


PC Browser Example
![alt text][image]

[image]: https://preview.ibb.co/iNszNf/Screen-Shot-2018-10-31-at-15-06-05.png "selam"

## Installation
* Download & Install **NodeJS** and **NPM** | https://nodejs.org/ 
* Clone this repository or download and extract files
* Open extracted folder with terminal & Cmd run `npm install` command

Edit **config.json** file
>>  
    "name": "rig01" `Rig Name (Optional)`
    "host": "192.168.1.54 `Rig Ip Adress (Required!)`
    "port": 3333 `Rig Running Port (Required!)`
    "comment": "gpu not work fan" `Comments this rig about(Optional)`
    "offline": false
Example
```json
  {
    "name": "R1P07",
    "host": "192.168.1.107",
    "port": 3333,
    "comments": "ASUS 7950",
    "offline": false
  },
  {
    "name": "R1P09",
    "host": "192.168.1.109",
    "port": 3333,
    "comments": "MSI rx580",
    "offline": false
  },
```

## Run Project
* After the installation and edited config.json file is run command `npm run dev`
* Open Browser `http://localhost:3000` or `http://{this-pc-ip-address}:3000`