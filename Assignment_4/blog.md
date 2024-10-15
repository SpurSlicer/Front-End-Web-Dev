### 10/1/2024
So this *started* as a project about viewing fruit information, but the API I chose was quite small and likely made by another student; it was shut down a few days after I experimented with it. I went up a category from fruits to plants and found a suitable API for them. So this project will consist of a search bar as well as some other viewable options to display information on various plants. This will include a picture, scientific name, cycle, and water requirement in the small info cards. Upon clicking a small info card (these will be displayed in a grid), a large info card will display most if not all of the information given by the detailed search of the API.
### 10/15/2024
 Hello! A bit of progress has been made! I haven't been able to work too much on it due to traveling this week but I'm happy with what's accomplished thus far! The plant API works quite well! Clicking "All Plants" will load 30 plants and clicking it again will continue to add 30 more plants to the current list as kind of a "load more" feature. Random plant has been very inconsistent because you can only search by ID. I don't know if IDs are continuously distributed between 1 and 10104 (that's supposedly how many plants there are) because some random IDs received errors from the API while some didn't. I think I'm just going to display the map that the API has for viewing regions. Right now it displays a placeholder map from google images. No media queries or styling have been applied besides the background and menu. Searching doesn't work yet but will be easy to setup. The next steps will be to finish search, fix style, figure out of random is even worth it to have, and then go from there. The plants display basic information in cards. I'm going to make each card clickable so you can view a full information graphic of them. Below will be a list ordered by highest to least priority for additions:


1. Search bar
2. Complete plant infographic
3. Styling
4. Login capability (still unsure if I will have time to do this)


I've gotten much more used to react now thankfully and have actually come to enjoy it now! It's taking me longer than it normally would to make a project like this but getting experience with react has been valuable.


Annoying Problem: So the API I'm using only gives you 100 uses per day. When you load the website, there is a chance it will complain that the API refuses to send things. That just happens because I used all API calls allotted for the day. To see the API error message, please see the console in inspect mode. I will ensure that there are ample calls left for critique day. 