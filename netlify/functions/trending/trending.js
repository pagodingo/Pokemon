const request = require('request');
async function getYoutubeTrending() {
                        //https://www.npmjs.com/package/request
                        let trending = ["foo"]
                        await request('http://www.youtube.com/trending', function (error, response, body) {
                            //body = garbled mess of HTML
                            //"watchendpoint" - a recurring pattern I noticed in the HTML that made it easier for me to split it.
                            //splitting by that gave back 100 items, all big chunks of YouTube Meta Data.
                            let list = body.split(`"watchEndpoint":{"videoId":"`)

                            for (var i = 0; i < list.length - 1; ++i) {
                               //videoIds -> (youtube.com/watch?v={videoID}) - the first 10 elements of each chunk (this is also due to where I split)
                                var videoId = list[i].slice(0,11)
                                //Trending videos' actual meta data is in the last 1500 chars or so of each chunk
                                var metaChunk = list[i].slice(list[i].length - 1500, list[i].length)
                                /*I noticed another pattern between some text-
                                ("title" and "description blah blah"), I used that to grab each video's metaJSON as best I could.
                                added brackets because they tended to not be there.*/
                                var videoMeta = "{" + metaChunk.slice(metaChunk.indexOf(`"title"`), metaChunk.indexOf(`,"descriptionSnippet"`)) + "}"
                                /*so, apparently "title" and "description" shows up everywhere on Youtube - who knew?
                                sometimes what I thought was video meta, wasn't actually video meta.*/
                                // if 'runs:text' isn't in this videoMeta chunk, it's not videoMeta.
                                if (videoMeta.includes(`{"runs":[{"text"`)) {
                                    //again brackets were missing.
                                    //I made use of the videoId and plugged it back into the metaData
                                    (videoMeta.slice(videoMeta.length - 4, videoMeta.length) != "}}}}") ?
                                        trending.push(Object.assign(JSON.parse(videoMeta + "}"), {"videoId": videoId})) :
                                        trending.push(Object.assign(JSON.parse(videoMeta), {"videoId": videoId}))
                                }
                            }
                        }).then(res => return trending) 
                        
                    }
    
const handler = async (event) => {
    try {
      trending = getYoutubeTrending()
      return {
        statusCode: 200,
        body: JSON.stringify({test: trending})
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
 }
  
  module.exports = { handler, getYoutubeTrending }
