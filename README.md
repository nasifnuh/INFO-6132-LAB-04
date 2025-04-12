# Event Organizer App

## Demo

![Demo](https://raw.githubusercontent.com/nasifnuh/INFO-6132-LAB-04/refs/heads/main/assets/demo.gif)

## Requirement

In this lab, You will build a simple event management app where users can sign up, sign in, and create or manage events using Firebase for authentication and data storage. The app will also feature navigation between screens using React Navigation and utilize hooks to manage state and effects.

You are tasked with building an Event Organizer App using React Native to help users explore events happening around them.

- User can SignIn or SignUp with their email and password (Firebase authentication).
- Once authenticated, they will be redirected to Dashboard where they can view a list of events. Provide a Logout button on toolbar which takes user back to SignIn screen.
- Users can create events. Accept appropriate event related information from user.
- They can also edit or remove events of their own. Ask for confirmation before removing an event.
- Provide an option for saving an event as a favourite. User should be able to see all the favourite events in a separate list and should be able to remove an event from favourite list. Ask users confirmation before deleting an event.
- The events are stored in Firebase Firestore.

### Goals

1. Feature Implementation

- Ensure all the features are implemented and working as intended.

2. Data Validation

- All the data accepted from the user should be validated on Login, Sign up, and event creation or event edit screens.

3. Data Handling

- All the data should be coming from Firebase.
- Implement state management to handle the data flow between different screens.

4. UI/UX Design

- Design an intuitive and user-friendly interface for the app.
- Use appropriate React Native components for a clean and responsive design.
- Ensure smooth navigation between screens using React Navigation.
- Implement navigation options such as headers, titles, and back buttons where necessary.

### Deliverables:

This lab will be delivered through a text submission. Please deliver:

1. The project code with Github link (Please keep the repository public so I can access it).
2. A screen recording of your app execution which should demonstrate all the functionalities and/or errors if any.
