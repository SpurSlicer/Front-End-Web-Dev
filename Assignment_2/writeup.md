### Errors
1. line 7 of index.html: added in "defer" to script tag
2. line 105 of trivia.js: change string quotes from '' to ``
3. line 48 of trivia.js: changed score from const to let
4. line 19 of trivia.js: changed typo in id from "round-to" to "round-two"
5. line 97 of trivia.js: changed equality == instead of === (we don't need type equality here)
6. line 91 of trivia.js: changed roundTwoQuestions attribute from .size to .length
7. line 144 of trivia.js: changed sum from const to let

### Code Walkthrough
&emsp;It starts by finding elements for the form (all questions take place in a form). It creates jsons of the input element, reactionArea element, and answer for each questions in each round; questions per round are indexed to in the json. The input elements are used to get user input for comparison to the answer. The reaction area is the little popup that is displayed upon answer comparison. Buttons are also found during this time. Finally, a scores array is created that holds either a 1 or a 0 for each of the 4 questions. This is from lines 1-36. \
&emsp;Now, we start assigning callbacks. When clicked, the startbutton is given the callback function startGame(). Start game changes the state of the quiz from just the start button to round one of the quiz by moddifying visibility of elements. It then loops through all questions and assigns and answer function callback and an attribute called 'deactivate' to be called when needed later on. In the callback function for the question, it simply compares whether the entered text is equal to the answer, updates the score accordingly, and updates the reactionArea to give feedback to the user about whether their answer was correct or not. It ends by adding an event listener to the new button titled "Next" that will either take you to round two or do nothing. Nothing happens if at least one of the questions are unanswered. This functionality is from line 40-77. \
&emsp;Now we have the roundtwo functionality which is basicaly the same as round one with the addition of deactivating round one questions so that the user cannot modify their round one answers once round two has started. It assigns the new "Finish" button to the callback finishGame(). This code ranges from lines 79-127. \
&emsp;Finally, we have to display the finished game information. The finishGame() function starts by getting the total number of questions. It then then checks to make sure that all questions have been answered in roundTwo similar to what the roundTwo method does. It then sums all of the scores in the scores array mentioned earlier and displays the score front and center on screen. This ranges from lines 129-150. \
\
&emsp;In the HTML, the structure can be defined in 4 states:
1. START: Only the start-button is displayed
2. ROUND-ONE: The round one fieldset is displayed and questions one and two of round one are able to be answered.
3. ROUND-TWO: The round one fieldset questions are locked and no longer graded. The round two fieldset is displayed below round one and are able to be answered.
4. END: All questions are locked and a message is displayed to show the user how many questions they got right. 