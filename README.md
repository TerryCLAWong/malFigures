# MyAnimeList.net Staff Tracker - Design Document

## Purpose
This is a web-scraping web-app that looks at a given public myanimelist.net anime list 
and looks at the listed shows within a given rating range and compiles a list of staff
that have worked on those shows. The staff listed is determined by an integer input
for the number of shows worked on for a given staff member. 

#### Input
* A url to a MAL animelist
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

## Design

```mermaid
graph TD;
    B--Sends Request-->C
    C--Sends Parameters-->D
    F--Sends Output-->G
    subgraph View
    G[See Output]
    A[Input Parameters]-->B[Press Start]
    end
    subgraph Controller
    C[Receives Request]
    end
    subgraph Model
    D[Receive Parameters]-->E[Scrape Employee Lists]-->F[Generate List Intersection]
    end

```