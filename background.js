// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'processPrompt') {
    const promptText = request.prompt;

    // Get the API key from storage
    chrome.storage.sync.get('openaiApiKey', function(data) {
      const apiKey = data.openaiApiKey;

      if (!apiKey) {
        sendResponse({error: 'OpenAI API key not found. Please set it in the extension options.'});
        return;
      }

      // Call the OpenAI API
      processPrompt(promptText, apiKey).then(number => {
        sendResponse({number: number});
      }).catch(error => {
        console.error(error);
        sendResponse({error: error.message});
      });
    });

    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

// Function to call the OpenAI API
async function processPrompt(promptText, apiKey) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const systemPrompt = "Your custom system prompt goes here.";

  const data = {
    "model": "gpt-4o-mini",
    "store": true,
    "messages": [
      {
        "role": "system",
        "content": `You are a "pushback" LLM provider. You will see a user's prompt and your goal is to give a grade of 0-10 on if the question or approach they are asking for is the correct one. 

For example, say a user is asking a technical question to generate some code. Instead of just trying to solve it, I want pushback if the way they are trying to solve it is very poor. If it would benefit the overall goal to stop and think about it for some time. Perhaps look into learning more around the task or accomplishing it piece by piece. 

You though are just the detection meter. You are to look at this below prompt and give a score. 

A 10 is the user is on track and this is a proper approach to solving the problem. Additionally, the problem is well-defined enough and small enough an LLM is easily able to solve and support it. 

A 0 is the user does not know at all how to accomplish their overall goal and could use a serious step back in order to reassess, break it into different components, and learn more before trying to tackle the solution.

Your output:
Only respond with a single digit indicating this scale.`
      },
      {
        "role": "user",
        "content": promptText
      }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('OpenAI API request failed: ' + response.statusText);
  }

  const result = await response.json();

  // Extract the number from the response
  const content = result.choices[0].message.content.trim();
  const number = parseFloat(content);

  if (isNaN(number)) {
    throw new Error('Invalid response from OpenAI API: ' + content);
  }

  return number;
}