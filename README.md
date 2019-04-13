# upfluence-coding-challenge

## Functional spec
Create a front-end application that draws a 3-dimensional visualization of the social posts.

The 3 dimensions should be:

* Day of the week 
* Hour of the day (UTC time)
* Number of post matching the two other dimensions

### Result
![](https://i.imgur.com/rXhPAnH.png)

### Demo
https://upfluence.herokuapp.com/posts

### Description of the solution.
The challenge was to use a stream of data to update a live graph.
First the stream had to be controlled in order not to overload the dom and the browser.
So while the data is still being updated and calculated in the background, the dom is only updated every 3 seconds.

Taking into consideration the time needed to complete the challenge, an easy to configure charts library was needed, so I chose HighCharts for the good documentation it has, also because they created an Ember Addon which saves time.

All the static data needed to generate the graph were placed in the `constants/punch-card.js` file and initialized on component render.

The idea is simple, after retrieving a message from the event source, it's parsed to extract its timestamp.
With the timestamp, 2 keys are extracted, the day and the hour, which on the graph are the y axis and x axis respectively.
After that, the total posts of the related object is incremented by one.
Example: If a post was published on Wednesday at 1pm, then the value of `posts[wednesday][1pm]` will be incremented.

After 3 seconds of the last render, the graph data will be updated, unless the user has stopped auto refreshing, in that case the event source will close and data will not be updated.

### Reasoning behind technical choices.
ReactJS and EmberJS were considered for the solution.
EmberJS was chosen as it is the Frontend tech used at Upfluence.

The solution also relies on 2 external libraries
HighCharts and Momentjs
* HighCharts because of its easy installation and well written documentation, it is also responsive, which is always good.
* Momentjs to manipulate each post's timestamp, it is also supported by Ember.
* Object manipulation was made using native javascript functions, Lodash was considered but it was not really needed.

Heroku was used to host the demo app with the help of ember-cli-buildtools, it's what I always use to test and host apps and I find it extremely efficient. 

### What I'd do differently if I were to spend additional time on the project.

* Add unit tests to make sure the graph appears correctly.
* Improve the animation on data update by adding fluidity instead of resetting the graph bubbles.
* Refactor the static data part, some of them can be generated with few lines.
* Add the ability for the user to change the graph type and customize the way it appears.
* Add more detailed info about each bubble in the graph (Number of each type of post, preview of the latest post, etc...) 

