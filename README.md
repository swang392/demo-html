# CPSC 484 Assignment 5 - Group 35

## Instructions

There are no dependencies needed for this project. To run, upload the project to a TV.

## Description

In a closely knit community like Yale, students are on an individual exploration of identity and seeking to learn more about themselves, in order to make friends who are better aligned with their personality.

Students also want to find what kinds of people they are compatible with. Compatibility might mean people that you might be good friends with, who in terms of personalities and values are the most aligned with you. Friendship is also a big topic of discussion at Yale, so we hoped to come up with a solution in this problem space. 

Thus, our project is a personality test that allows a user to answer questions and gain insight on their personalities. The personality test will also show what other personality archetypes you are most compatible with after completing the test, allowing you to learn more about the types of people you are most likely to connect with.

## Tasks Completed:

1. Users can signify interests or specific personality traits through taking the personality test.
2. Users can find peers with similar personalities on the final match screen.

## Constraints

This application must be deployed on an application that uses Kinect. Navigation through this application relies on Kinect skeletal recognition. Ideal distance away from Kinect sensor is around one to two meters; being too close can sometimes mess up the sensor. 

## Collaboration Record

**Student Name and NetId:** Sarah Wang, slw75

**Contribution:** I made the draft of personality test questions and created the function to come up with the final personality type. I also created the different types of personalities based on MBTI, and created the names, colors, descriptions, and compatible types. I worked on UI for the test, including building out the framework and screens for the test questions, as well as creating and designing the final personality quiz screen that features a description of the test and the compatible types. I worked on styling for all of the UI screens, and set up the workflow of the application. I also connected the front end to the Kinect commands and tested out all of the functions (such as resetting, undo/redo, and basic navigation).

**Student Name and NetId:** Aarush Sharma, as4298
**Contribution:** I worked on the base UI used for the different screens and the initial layout. This includes the base HTML formats as well as some of the CSS styling. I also worked on adding smoother transitions for the CSS such as fade effects. 

**Student Name and NetId:** Oliver Li, fl468
**Contribution:** I worked on the visual recognition backbone. This meant grabbing data from the kinect camera and translating poses (arm positions and which side of screen) into input the rest of the system could use. I unit tested the recognition system on its own server with the TV in order to make sure that poses were captured properly and converted into the corresponding input. 

**Student Name and NetId:** Zachary Wang, zw369
**Contribution:** I tested the system on the TV and made sure everything was working properly. I also helped with the base UI framework design and ideas. 
