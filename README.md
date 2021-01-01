# MyAnimeList.net Staff Tracker - Design Document

## Purpose
This is a web-scraping web-app that looks at a given public myanimelist.net anime list 
and looks at the listed shows within a given rating range and compiles a list of staff
that have worked on those shows. The staff listed is determined by an integer input
for the number of shows worked on for a given staff member. 

#### Input
* A url to a public MAL animelist
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