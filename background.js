/*
    The following implementation has worked for me, so if you really want to have a extension that can block websites,
    then I have a set of requirements and components to guide you through
    idea:
        client requirements:
                use fetch or axios to send data to the server from popup.html
            -users can sign in from popup.html
            -users can enter keywords in popup.html which enables them to block websites with the keywords
            -users can view create and delete the keywords listed in popup.html

        developer/ the reader:
            -create a backend and host it on a server
            -create a database to save the keywords
            -use cookies to persist the user login because no one wants to login to the extension > 1 times
            -use sockets for real time communication to see if there are any changes to the keywords in popup.html
*/

//note this is not the best implementation as it goes through all the tabs every time
//you can optimize it by only selecting a newly created tab or a tab that is updated
function remove_anime_manga_tabs() {
    //get all the tabs as an empty object is passed to query
    chrome.tabs.query({}, function(all_tabs, err){
        if(err){
            console.error(err);
            return;
        }
        let site_url;
        /*
            tedious to type all sites to block so we can also keep all the keywords
            in an array and then convert the array to a string with the preferred 
            domain names and finally convert the string to a regex
        */
       //matches all websites with scans, manga, toon and updates in their subdomain
        let regex = /(.*scans.*|.*manga.*|.*toon.*|.*updates.*|.*manhwa.*).(com|org|net|ru|co|in)\/.*/;

        for(let i = 0; i<all_tabs.length; i++){
            //fetch the url of a tab
            site_url = all_tabs[i].url;

            if(site_url.match(regex)){
                //close the tab
                chrome.tabs.remove(all_tabs[i].id, function(){
                    console.log("successful in removing the website")
                })
            }
        }
    });
}
//runs when the extension is installed
chrome.runtime.onInstalled.addListener(remove_anime_manga_tabs);
//fires when a new tab is created but this will not work because a newly created tab may not have any url
//chrome.onCreated.addListener(remove_anime_manga_tabs);
//fires when a tab is updated
chrome.tabs.onUpdated.addListener(remove_anime_manga_tabs);