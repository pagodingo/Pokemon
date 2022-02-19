const request = require('request');
const handler = async (event) => {
    try {
      trending = ["foo"]
        request('http://www.youtube.com/trending', function (error, response, body) {
          list = body.split(`"watchEndpoint":{"videoId":"`)

              for (var i = 0; i < list.length - 1; ++i) {

                                      var videoId = list[i].slice(0,11)
                                      var metaChunk = list[i].slice(list[i].length - 1500, list[i].length)
                                      var videoMeta = "{" + metaChunk.slice(metaChunk.indexOf(`"title"`), metaChunk.indexOf(`,"descriptionSnippet"`)) + "}"

                                      if (videoMeta.includes(`{"runs":[{"text"`)) {

                                          (videoMeta.slice(videoMeta.length - 4, videoMeta.length) != "}}}}") ?
                                              trending.push(Object.assign(JSON.parse(videoMeta + "}"), {"videoId": videoId})) :
                                              trending.push(Object.assign(JSON.parse(videoMeta), {"videoId": videoId}))
                                      }
                                  }
                              })
      return {
        statusCode: 200,
        body: JSON.stringify({test: trending})
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
 }
  
  module.exports = { handler }
