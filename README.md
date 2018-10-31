# Memory Game

A project designed to train and learn about the development of the Front End. This project consists of a memory game, where the player can choose the drawings of the cards (Animal or Cars), the background and the amount of pairs. In addition, each game will be scored and made available a ranking.

This project is a new version of the memory game, which was previously developed with the same purpose described above. In this version, several changes have been made, ranging from the layout to the code structure, using current tools that are often used by Front End developers.

The game is available at https://mg-memorygame.firebaseapp.com/ (Game under development)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node 6+ (https://nodejs.org/en/download/)
* Git (https://git-scm.com/downloads)


### Clone repository

For this step, make sure the GIT is installed.

If you're in doubt whether you have installed, run the command ```git --version```. This command will display the GIT version if it's installed.

```sh
git clone https://github.com/RNunes13/MemoryGame
cd MemoryGame
```

### Install dependencies

For this step, make sure NodeJS and NPM are installed.

**Obs.:** NPM is already installed next to NodeJS.

If you're in doubt if both are installed, in the terminal the commands, ```node -v ``` (This command will display the NodeJS version, if installed) e ```npm -v ``` (This command will display the version of NPM, if installed).

Also, ensure that your computer has internet access at the time of the command execution

```sh
npm install
```

After running the command on the terminal, wait for the packages to download. This procedure can take time depending on the speed of your internet.

If you're running on a system that requires administrator permission, a error may occur.

If you're on a **Windows** system, simply open the terminal (Command Prompt or other) with administrator permission.

If you're on **Linux** or **MAC** system, run the same command with **sudo** (```sudo npm install```).

## Development

To compile the files and watch the changes in **Development** environment, and to be able to test the website, execute the command below

```sh
npm run start
```

On **Linux** or **MAC** systems, at times, you'll need to use **sudo** to execute this command. So, just added before the command (```sudo npm run start```).

A **dist** folder will be generated in the project root.

## Production

To compile the files in **Production** environment, run the command below.

```sh
npm run build
```

On **Linux** or **MAC** systems, at times, you'll need to use **sudo** to execute this command. So, just added before the command (```sudo npm run build```).

A **dist** folder will be generated in the project root.

## Build With
  * HTML (PUGjs)
  * CSS (SASS)
  * JS
  * jQuery

## Versioning
We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/RNunes13/MemoryGame/tags).

## Authors
  * **Rodrigo Nunes** - Initial work - [RNunes](https://github.com/RNunes13)

See also the list of [contributors](https://github.com/RNunes13/MemoryGame/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
