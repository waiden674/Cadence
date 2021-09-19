
## Tech Demo of the Suggestion Engine which uses Hammer of the Gods's EdgeML Rune API: https://youtu.be/CJgFOKPC7tk

## Inspiration
During the initial brainstorming process, we separated our workflow into multiple platforms, using Google Docs, Discord, and Figma to plan out what we wanted to do. While it was the standard, we thought that a centralized tool/platform could be a vastly superior option as it would be specialized and more efficient at organizing ourselves. Thus, we got the inspiration to create Cadence. 
## What it does
Fundamentally, Cadence is a project management tool that is specialized for hackathons and personal projects, but it is also so much more. One of our most unique features is our recommendation system. We take the description of your project as input and then analyze it to recommend various technologies that you could try to implement. In fact, we will also generate personalized code based on the suggestions so that the hackers have an easier time getting started. Of course, you will also be able to create a timeline detailing the various phases and tasks that need to be delegated, but Cadence represents an all-inclusive hackathon companion that can truly accelerate the development process. 
## How we built it
Design: Figma <br />
Frontend: React, Chakra-UI <br />
Backend: Node.JS, Express.JS, Typescript, PostgreSQL, Prisma <br />
Machine Learning: Hammer of The Gods EdgeML Rune, Rust, BERT <br />
## Challenges we ran into
Due to the fact that we wanted to do something innovative with Rune, we faced many problems setting up the model. We wanted to load a version of the BERT NLP model that was not available on tflite so we had to try and implement it ourselves while making it compatible with Rune. We ran into a variety of cryptic errors and the documentation was quite sparce. However, the developer sat Hammer of the Gods were really helpful in guiding us towards a solution
## Accomplishments that we're proud of
- Resolved our issue with the Rune API
- Beautiful design

## What we learned
A lot about the Rune API

## What's next for Cadence
- More features including the ability to be used with multiple hackathons
- Better classification with GPT-3 model

## Project built for Hack The North 2021
