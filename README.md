# docappsui

###How to Setup project in Windows
```
1. Install Java & Set Java path - https://javatutorial.net/set-java-home-windows-10
2. Install NPM setup environmental variables if required
3. Install Git
4. check out git code from https://git.loomissayles.com/docAppsProjects/pdfimage.git
5. Run the below commands
    a. npm install async-q
    b. npm install vue
    c. npm install -g vue-cli  // to verify vue is installed run "vue -version"
    d. npm run env NODE_ENV=production
    e. vue add pwa
    f. npm run build
    g. npm run serve // if using Apache httpd please add dist folder to directory (never commit dist and node_modules)
    h. Application by default opens in 8080 port if you want to open in a different port - "serve": "vue-cli-service serve --port 82"
    i. run  "git pull" to check out latest code
6. Once code changes are commited from IDE or git commit - run command "git push -u origin master"
```
###How to Setup project in Mac/ Linux
```
1. Install Java & Set Java path http://www.sajeconsultants.com/how-to-set-java_home-on-mac-os-x/ 
2. Install Ruby https://www.ruby-lang.org/en/documentation/installation/
3. Install Brew - https://brew.sh/
4. check out git code from https://git.loomissayles.com/docAppsProjects/pdfimage.git
5. Run below Commands
    a. brew install npm
    b. brew install git
    c. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
    d. export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && ."$NVM_DIR/nvm.sh" 
    e. nvm Install Node
    f. npm install vue or npm install --global // for few Mac versions if this command fails run - "brew install vue"
    g. npm i -g vue-cli eslint
    h. npm install async-q
    i. npm install -g vue-cli or npm install -g @vue/cli@latest // to verify vue is installed run "vue -version"
    j. export NODE_ENV=production // if doesnt work - npm run env NODE_ENV=production
    k. vue add pwa // If fails run "npm i -g vue-cli eslint" or npm install -g vue-cli & run the command again
    l. npm run build //npx vue-cli-service build --modern
    m. npm run serve // if using Apache httpd please add dist folder to directory (never commit dist and node_modules)
    n. Application by default opens in 8080 port if you want to open in a different port - "serve": "vue-cli-service serve --port 82"
    o. run  "git pull" to check out latest code
6. Once code changes are commited from IDE or git commit - run command "git push -u origin master"
```
###Jenkins build
```
https://git.loomissayles.com/docAppsProjects/pdfimage.git
```
###Contact
```
Please reach Surya if you have any issues - smuthyala@loomissayles.com
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
