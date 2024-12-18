// content.js

// Observe the chat container for new user prompts
function observeUserPrompts() {
  // Update the selector based on the ChatGPT site's DOM structure
  const chatContainer = document.querySelector('main');

  if (!chatContainer) {
    console.error('Chat container not found');
    return;
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (isUserPromptNode(node)) {
            const promptText = extractPromptText(node);
            if (promptText) {
              handlePrompt(promptText, node);
            }
          }
        });
      }
    }
  });

  observer.observe(chatContainer, { childList: true, subtree: true });
}

// Check if the node is a user prompt
function isUserPromptNode(node) {
  return node.nodeType === Node.ELEMENT_NODE && node.querySelector('.whitespace-pre-wrap');
}

// Extract the prompt text from the node
function extractPromptText(node) {
  const promptElement = node.querySelector('.whitespace-pre-wrap');
  return promptElement ? promptElement.innerText.trim() : null;
}

// Handle the prompt by sending it to the background script
function handlePrompt(promptText, promptNode) {
  chrome.runtime.sendMessage(
    { action: 'processPrompt', prompt: promptText },
    function(response) {
      if (response && response.number !== undefined) {
        // Add the meter to the UI
        addMeterToPrompt(promptNode, response.number);
      } else if (response && response.error) {
        console.error('Error from background script:', response.error);
      } else {
        console.error('No response from background script');
      }
    }
  );
}

// Add the meter to the UI next to the prompt
function addMeterToPrompt(promptNode, number) {
  // Create the meter element
  const meter = document.createElement('div');
  meter.classList.add('prompt-meter');

  // Apply styling
  meter.style.width = '24px';
  meter.style.height = '24px';
  meter.style.borderRadius = '50%';
  meter.style.display = 'inline-block';
  meter.style.marginLeft = '10px';
  meter.style.verticalAlign = 'middle';

  // Color code from yellow (0) to red (10)
  const color = getColorForNumber(number);
  meter.style.backgroundColor = color;

  // Tooltip to show the exact number
  meter.title = 'Meter: ' + number.toFixed(1);

  // Insert the meter next to the prompt
  const promptTextElement = promptNode.querySelector('.whitespace-pre-wrap');
  if (promptTextElement) {
    promptTextElement.parentElement.appendChild(meter);
  }
}

// Convert the number to a color from yellow to red
function getColorForNumber(number) {
  // Clamp number between 0 and 10
  number = Math.max(0, Math.min(10, number));

  // Calculate the red component (decreases from 255 to 0 as the number increases)
  const red = Math.floor(255 * (1 - (number / 10)));

  // Calculate the green component (increases from 0 to 255 as the number increases)
  const green = Math.floor(255 * (number / 10));

  // Return the color as an RGB string
  return `rgb(${red}, ${green}, 0)`; // Blue remains 0
}


// Inject CSS styles for the meter
const style = document.createElement('style');
style.textContent = `
.prompt-meter {
  transition: background-color 0.3s;
}
`;
document.head.appendChild(style);

// Start observing the chat for new prompts
observeUserPrompts();