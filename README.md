# FitVoxFrontMob
Fitness Tracker App, Frontend Mobile using React-Native


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