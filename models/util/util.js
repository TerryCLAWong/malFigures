const Utils = {}


Utils.getAnimeList = async function getAnimeList(axios, accessToken, fields, userName) {
    authorization = "Bearer " + accessToken
    result = await axios({   
        method: "get",
        url: "https://api.myanimelist.net/v2/users/" + userName + "/animelist?",
        params: {
            "fields" : fields,
            "limit" : 1000, //limit max to maximize speed
        },
        headers: {
            "Authorization" : authorization
        }
    }).then(
        async function thing(response) {
            console.log("Sucessful GET animelist: " + userName)//todo remove
            //Get Animelist
            data = response.data
            result = await getAnimePages(data, axios, authorization, fields)

            //Return
            if (result.error == null) {
                return {error: null, animeList: result.animeList}
            }
            MALAPIError = {"MAL API Error": result.error}
            return {error: MALAPIError}    
        }
    ).catch(
        (error) => {
            console.log("Failed GET animelist: " + userName) //todo remove
            MALAPIError = {"MAL_API_Error": error.response.data.error}
            return {error: MALAPIError, data: null}
        }
    )
    return result
}

async function getAnimePages(data, axios, authorization, fields) {
    nextURL = null
    animeList = {}
    /*
    The successful response does not return all anime in the animelist
    More are given in response.paging.next
    */
    while (true) {
        //Get next set of animes if needed
        if (nextURL != null) { //ignore first page
            //Get next URL's response
            result = await axios.get(nextURL, {headers: {"Authorization": authorization}}
            ).then((response) => {
                console.log("finished reading anime page")
                return {
                    error: null,
                    data : response.data
                }
            }).catch((error) => {
                console.log("Failed to get a page from the animelist")
                return {
                    error : error.response.data.error,
                    data : null
                }
            })

            //Set next set of data if applicable
            if (result.error == null) {
                data = result.data
            } else {
                return {
                    error: result.error,
                    status: 502,
                    message: "Failed to get a page from the animelist" //todo - maybe not needed
                }
            }
        }

        //Append entries to animeList
        for (let animeEntry of data.data) {
            //Get needed values
            animeId = animeEntry.node.id
            //Get fields
            anime = {}
            anime.title = animeEntry.node.title 
            for (let field of fields.split(',')) {
                if (field == "list_status") {
                    anime.list_status = animeEntry.list_status
                } else {
                    anime[field] = animeEntry.node[field]
                }
            }
            //Append to animeList
            animeList[animeId] = anime
        }

        //Set next URL or exit
        if (data.paging.next == null) {
            return {animeList: animeList}
        } else {
            nextURL = data.paging.next
        }
    }
}


//Export
module.exports = Utils;