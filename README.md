# MyAnimeList.net Staff Tracker - Design Document

## Purpose
This is a web-app that looks at a given myanimelist.net user's anime list 
and analyses the listed shows within a given rating range and compiles a list of staff
that have worked on those shows. The staff listed is determined by an integer input
for the number of shows worked on for a given staff member.

The web-app will be designed such that new features are modular and easily added. 
In the future, I want this web-app to be home to several stat tracking apps for a myanimelist.net user.

#### Input
* A myanimelist.net username
* Integers for inclusive [low, high] range scores
* Integer for shows worked on for a given staff member to be considered a "liked member".
  
#### Output
* List of employees
  * Role(s)
  * Name
  * MAL profile
  * Number of relevant shows worked on

* List of voice actors
  * Name
  * MAL profile
  * Relevent characters portrayed
  
## Setup
* have node.js installed
* clone repo
* install dependencies (listed below)
* create .env file containing an `ACCESS_TOKEN` variable containing your MAL API access token. To generate one, follow the instructions here: https://myanimelist.net/blog.php?eid=835707
* `node index.js`

## Dependencies 
* express
  * provides lots of handy methods for creating a web service
  * `npm install express`

* express-validator 
  * a wrapper for npm's validate.js that allows for custom validators and better-organized error handling
  * `npm install --save express-validator`

* axios
  * a web client
  * to be used with react front-end interact with backend
  * `cd client`
  * `npm install axios`
  
## Planned Dependencies
* canvas.js for front-end data representation

## Design
Note: Diagrams made with https://mermaid-js.github.io/mermaid/#/

```mermaid
graph TD;
    B--Sends Request-->C
    C--Sends Parameters-->D
    F--Sends Output-->G
    G--Send Response-->H

    subgraph View[View - React & Material UI]
    AA[Select Feature]-->A[Input Parameters]-->B[Press Start]
    H[See Output]
    end

    subgraph Controller[Controller - ExpressJs]
    C[Receives Request]
    G[Generate Response]
    end

    subgraph Model[Model - NodeJs]
    D[Receive Parameters]-->E[Scrape Employee Lists]
    E-->F[Generate List Intersection]
    I[Refresh MAL API Access Token]--Wait Approx. 1h--> I
    end

```
