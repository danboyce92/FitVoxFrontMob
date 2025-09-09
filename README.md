# FitVoxFrontMob
Fitness Tracker App, Frontend Mobile using React-Native


## App Structure
Split this app into three sections
**Template Builder**
**Record Session**
**Progress Tab**

#### Template Builder
This section's primary focus is to allow the user to create a workout template. <br/> 
They will give the workout a name for example "Leg Day". <br/>
Then a user will add however many exercises to that template, either chosen from the stored list of exercises or custom input (to be added later).

#### Record Session
This section allows a user to work through the exercises from the template, adding any additional information specific to this workout session like how many sets of a particular exercise you did or what weight you used.

#### Progress Tab
This section is open for consideration. <br/>
At present, this section's aim is to take the user's information and generate graphs or charts with it to visualise a users progress. <br/>
Lots can be added, setting goals, weekly quotas. And possibly most ambitious of all, a social aspect to it. Users can see each friend's entries like strava or something similar.


## Future additions
**Template Builder**
A search bar in the list of exercises that filters for what is entered

**Record Workout**
Add functionality to record the amount of time it takes to record the session



## Moving forward

**Template-Builder**

-Remove sets & reps from dummy data
-Create add exercise button top of Workout.tsx
-Need to create a modal that opens if the add button is hit,
-Modal should have a search bar in the top, and should display a number of different exercises.
-Add some to implement but more should be added later to fill in the variety.

## 08-06

Delete button should update state and also close modal when it is clicked for deletion of workoutplan. Currently it does neither.

## 13-06

Add new workout should create a new workout
Need to add functionality for changing name of currently selected workouts
That should be the last of this section, then move onto the record workout section

## 14-06
Workout plan considerations. 
-Should users be able to add the same exercise multiple times?
-Should users be able to order exercises specifically?

## 15-06
Finished with initial layout, can now move on to setting up a basic way of storing workout data.
-Will this require an addition mock database to keep things tidier?
-How will the data be structured?
-What data is important to keep?

## 18-06
Basic structure for Record Workout section built.
- Now I need to have it persist the data. 

## 21-07
Session makes successful record of additional sets but the removeSet function deletes more than it should have should be addressed

## 23-07
Figure out where to go next. Resistance records now saving properly.
Next problems to tackle
-Cardio type records being saved properly
-Setting up Flask project to manipulate data
-Decide what kind of ways to present data. Graphs etc..
-User Authentication
-GPT Speech to Text functionality

## 28-08
Big mess, lots of moving pieces. Considering deleting a lot and starting again. Workout record section anyways

## 29-08
Commented out a lot, building up from scratch. Add set now working and updating the finished record.
Can't focus on the remove set button until the ui can visually represent the additional sets.
Focus on getting the UI to update sets now,
Then focus remove set functionality 
Then focus dynamic input field updating 

Seems to be working now, bug free!
Do some more testing before moving on

## 30-08
Abstract resistance methods to their own file. 
Start looking at how I should structure cardio exercises.

## 04-09
Now focusing on adding the dropdown for cardio metrics.
Wire up button to add additional metric when pushed. ( Will require a map for additional metrics )
Will need to be placed in a useEffect to update when a metric is added, only question is how to trigger it?
Eventually create an array of additional metrics and place in each cardio exercise, when a cardio exercise is chosen, load up the specific metrics inside the appStore and have them populate the dropdown

## 05-09
Cardio card functionality working well. Can add metrics, remove them. Some error messaging in place. They have specific measurements e.g distance has Km, calories has cal.

Next need to wire this up with the API so it can save them to the db correctly

handleCardioInputChange has been created in Session component. Make sure it works.
First though, create the two methods addCardioMetric and removeCardioMetric so the currentWorkoutRecord is always up to date

## 06-09
Currently finished implementing all methods for Cardio functionality except for updating the value of duration
Need to consider how best to calculate the minutes and seconds values. Should I keep the value in miliseconds?

# Questions
Should I create an array of Cardio metrics and allow all to appear in dropdowns for every exercise or create an array in each exercise that pairs appropriate metrics to specific exercises?

I think currentWorkoutMethod might not be needed to be initialised in the zustand store. It seems like it is only needed in the Session Component and the SessionCard component ( Possibly the additional sets component too ) The point being they can be passed down as props to lower bloating in the store.
