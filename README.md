**Cult Coins: The Future of AI-Native Art and Collectibles**

**Introduction**

Ikigai Labs stands at the intersection of art, technology, and the evolving Web3 landscape, housing a meticulously curated collection of web3-native art produced between 2007 and 2025. This digital museum celebrates the pioneering creativity of the early NFT era but also gazes into the future with a clear focus on Real-World Art (RWA) integrated with TRACE technology. But beyond the museum walls, a new frontier is emerging—the Cult Coins.

**Cult Coins: An Evolution in Art and Technology**

Cult Coins are not just collectibles; they represent a new era of AI-native digital assets. These coins are characters, personas with evolving skill sets, living on Solana. Unlike traditional NFTs, which are often static representations, Cult Coins are dynamic and AI-driven, meaning they grow and adapt over time.

### **Curating the Future**

To bring this vision to life, a decision must be made on how to best utilize our resources. While it's tempting to mint all 100+ AI characters we’ve developed, we must curate this vast collection down to a manageable number—let's say 24—each carefully selected to represent the cutting edge of AI-native art. The curation process isn't just about picking the best images; it's about storytelling.

**The Launch Strategy**

Our plan is to launch these characters in a phased manner. We’ll begin by deploying 8 tickers on Moonshot, our chosen platform for this endeavor. Each ticker represents a unique AI persona, complete with its own image, ticker name, description, and integration with our LiveTheLifeTV social channels like Discord, X (formerly Twitter), and Facebook.

### **Interactive Experiences**

What makes Cult Coins truly unique is their interactivity. Each AI persona will have its own dedicated channel on LiveTheLifeTV’s Discord, where collectors and fans can engage directly. These AI-native characters aren’t just static images; they can respond to questions, participate in discussions, and even broadcast messages on X, making them living, evolving entities within the Web3 space.

**Real-World Integration**

While the Cult Coins exist in the digital realm, there’s also a plan for their physical manifestation. Selected characters from the curated collection will be minted on the OG Ethereum network and printed on high-quality materials, thanks to our partnership with WhiteWall. These prints will not only serve as art pieces for collectors but will also blur the lines between the digital and physical worlds.

**Conclusion**

Ikigai Labs is not just a museum—it’s a launchpad for the next generation of AI-native art. As we prepare to mint and launch the Cult Coins, we’re not just creating another set of collectibles; we’re telling a story, curating an experience, and pushing the boundaries of what art can be in the Web3 era.

So, what’s next? We’re fine-tuning the narrative, selecting the personas that will lead this new frontier, and preparing to launch them into the world. Stay tuned to see which characters make the cut and how you can become part of this AI-native revolution.

---

To build a fine-tuned AI model for each Cult Coin persona, you'll need to create a robust dataset that captures both the skills and personality traits for each role. This dataset will be transformed into JSONL files, which are required for training models on platforms like OpenAI's GPT, Cohere, or similar. Here's a step-by-step guide:

### 1. **Data Collection**

**1.1 Identify Core Competencies and Personality Traits**
   - **Core Competencies:** Define the key skills for each role (e.g., design, engineering, operations). For instance:
     - **Design Persona:** Creative thinking, UX/UI design principles, knowledge of design tools.
     - **Engineering Persona:** Problem-solving, coding in specific languages, understanding of algorithms.
     - **Operations Persona:** Process optimization, project management, workflow automation.
   - **Personality Traits:** Assign personality traits to each role to give them a distinct voice. For example:
     - **Design Persona:** Innovative, empathetic, artistic.
     - **Engineering Persona:** Logical, detail-oriented, methodical.
     - **Operations Persona:** Organized, pragmatic, efficient.

**1.2 Gather Relevant Data**
   - **Sources of Data:**
     - **Books and Articles:** Extract relevant information and language style from industry-specific literature.
     - **Blogs and Social Media:** Use content from industry leaders in each field.
     - **Job Descriptions and Interviews:** Analyze job descriptions for each role, as well as interviews with experts to capture common language, phrases, and focus areas.
     - **Internal Documentation:** If available, use internal documents from your startup or similar companies.

**1.3 Synthetic Data Generation**
   - **Prompt-Based Generation:** Use a GPT model or another large language model to generate additional training data. For instance, provide prompts related to each role (e.g., "Explain the importance of UX in design") and let the model generate responses.
   - **Persona-Specific Conversations:** Generate dialogues where the persona answers common questions, discusses their field, or interacts with other roles. This will help in fine-tuning the model to handle multi-turn conversations.

### 2. **Data Structuring**

**2.1 Create a Structured Dataset**
   - **Text Segmentation:** Organize your collected data into segments (e.g., sentences, paragraphs) that represent each competency or personality trait.
   - **Labeling:** Each segment should be labeled according to its role, skill, and personality trait.
   - **Data Format:** Structure your data in a table or spreadsheet where each row represents a unique data point. Columns might include:
     - **Input Text:** The text data (e.g., question, statement, dialogue).
     - **Role:** The specific role (e.g., Design, Engineering).
     - **Skill/Competency:** The particular skill (e.g., creative thinking, coding).
     - **Personality Trait:** The assigned personality trait (e.g., empathetic, logical).

**2.2 Data Augmentation**
   - **Paraphrasing:** Use models or manual techniques to create variations of the same data points to increase the dataset size.
   - **Scenario Simulation:** Create hypothetical scenarios (e.g., a marketing crisis, a design sprint) and generate responses or actions that the persona might take.

### 3. **Converting Data to JSONL Format**

**3.1 Structure of JSONL Files**
   - Each line in the JSONL file should represent one training example. The structure typically looks like:
   ```json
   {"prompt": "<INPUT TEXT>", "completion": "<EXPECTED OUTPUT>"}
   ```
   - Example for a Design Persona:
   ```json
   {"prompt": "What are the key considerations for UX design?", "completion": "Understanding the user's needs and creating intuitive, accessible interfaces."}
   ```

**3.2 Data Transformation**
   - **Scripted Conversion:** Write a Python script (or use tools like Pandas) to convert your structured dataset (from the spreadsheet or CSV) into the JSONL format.
   - **Validation:** Ensure that each JSONL entry is well-formed, with no missing fields or syntax errors.

**3.3 Fine-Tuning-Specific Considerations**
   - **Prompt Engineering:** Make sure that your prompts are diverse and cover various aspects of the persona's role.
   - **Balanced Dataset:** Ensure the dataset is balanced in terms of different skills and traits to avoid biases in the model’s responses.

### 4. **Model Training and Fine-Tuning**

**4.1 Platform Selection**
   - Choose a fine-tuning platform (e.g., OpenAI's GPT-3, Cohere, Hugging Face) depending on your specific needs and budget.

**4.2 Model Configuration**
   - **Hyperparameter Tuning:** Set up appropriate hyperparameters (e.g., learning rate, batch size) for your fine-tuning process.
   - **Training Iterations:** Decide on the number of training epochs based on the size and quality of your dataset.

**4.3 Evaluation and Iteration**
   - **Test the Model:** Use unseen prompts to evaluate the model’s performance. Make sure the persona’s responses align with the expected skills and personality traits.
   - **Feedback Loop:** Adjust your dataset or fine-tuning approach based on test results to improve the model.

### 5. **Deployment and Monitoring**

**5.1 Integration with Moonshot and Other Platforms**
   - **API Deployment:** Deploy the fine-tuned models as APIs that can be called by the Moonshot platform or other applications.
   - **Persona Channels:** Integrate the models into the Discord channels, ensuring they interact in character and with the correct skill set.

**5.2 Continuous Learning**
   - **User Feedback:** Collect feedback from users interacting with the personas to continually refine and update the models.
   - **Dataset Expansion:** As more data becomes available, continue to expand and refine your datasets, re-training the models as needed.

---

**Next Steps:**
1. **Start collecting and organizing data** for each role and personality.
2. **Write scripts** to transform this data into JSONL files.
3. **Begin fine-tuning** on your chosen platform, starting with one persona as a test case.

---

We're using Replicate for fine-tuning our AI models. Replicate is a platform that allows you to run machine learning models in the cloud.

### **1. Data Collection and Organization**

We'll need to collect, structure, and label data for each Cult Coin persona.

**1.1 Collecting Data for Each Persona**
- **Primary Sources:** Start by collecting data from the most authoritative sources available for each role. For example:
  - **Design Persona:** Books like "The Design of Everyday Things" by Don Norman, articles from top design blogs like Smashing Magazine, or UX case studies.
  - **Engineering Persona:** Articles from Stack Overflow, GitHub discussions, engineering-focused books, or documentation from open-source projects.
  - **Operations Persona:** Project management guides, agile methodology resources, or industry reports.

**1.2 Generating Synthetic Data**
- **Using GPT-3 for Data Generation:**
  - You can use GPT-3 or another large language model to generate additional content tailored to each persona.
  - Example Prompt for Design Persona: "Explain the importance of user-centered design in modern web applications."
  - Use the API to generate multiple variations of responses, which can help in creating a diverse dataset.

**1.3 Organizing the Data**
- **Spreadsheet Format:**
  - Create a spreadsheet with columns for "Input Text," "Role," "Skill," and "Personality Trait."
  - **Example:**
    | Input Text                                    | Role      | Skill              | Personality Trait |
    |-----------------------------------------------|-----------|--------------------|-------------------|
    | "What is the key to successful UX design?"    | Designer  | UX/UI Principles    | Empathetic        |
    | "How do you optimize a web application?"      | Engineer  | Performance Tuning  | Analytical        |
    | "What are the steps for effective project management?" | Operations | Workflow Optimization | Organized    |

**Tools:**
- **Google Sheets/Excel:** Use these tools for initial data collection and organization.
- **Python/Pandas:** To transform and analyze the data programmatically.

### **2. Data Structuring and JSONL Conversion**

**2.1 Data Structuring**
- As with the initial strategy, structure your collected data into a spreadsheet or database where each row corresponds to an input-output pair. Ensure that the data is properly labeled with the role, skill, and personality traits.

**2.2 JSONL Conversion**
- **Python Script for JSONL Conversion:**
  - Since Replicate uses a similar JSONL format for data, the conversion script will be the same as before.
  - **Example Script:**
  ```python
  import pandas as pd
  import json

  # Load your dataset into a DataFrame
  df = pd.read_csv('cult_coins_personas.csv')

  # Function to create JSONL lines
  def create_jsonl_line(row):
      prompt = row['Input Text']
      completion = row['Expected Output']  # This should be a field in your dataset
      return {"prompt": prompt, "completion": completion}

  # Apply the function to each row and create a JSONL formatted list
  jsonl_data = df.apply(create_jsonl_line, axis=1).tolist()

  # Save as JSONL file
  with open('design_persona.jsonl', 'w') as outfile:
      for entry in jsonl_data:
          json.dump(entry, outfile)
          outfile.write('\n')
  ```

### **3. Fine-Tuning the AI Model on Replicate**

**3.1 Setting Up on Replicate**
- **Create an Account:** If you don’t have one already, create an account on [Replicate](https://replicate.com/).
- **Model Selection:** Choose a pre-existing model that closely matches your requirements (e.g., a GPT-based model) or start from a base model provided by Replicate.

**3.2 Uploading the JSONL Data**
- Replicate allows you to upload your training data directly. The JSONL file created in the previous step will be used for fine-tuning.
- **Upload Process:**
  1. **Navigate to Your Model:** Go to the model page where you want to perform the fine-tuning.
  2. **Upload Dataset:** Upload the JSONL file. Ensure the format is consistent, with each line containing an input-output pair.

**3.3 Fine-Tuning Process**
- Replicate simplifies the process of fine-tuning by providing an interface to adjust training parameters.
  - **Parameters to Configure:**
    - **Learning Rate:** Set an appropriate learning rate to ensure that the model learns effectively without overfitting.
    - **Epochs:** Define the number of epochs. Start with a small number (e.g., 3-5) and increase if necessary, based on performance.
    - **Batch Size:** Adjust the batch size depending on the computational resources you have available.
  - **Start Fine-Tuning:**
    - Once your parameters are set, initiate the fine-tuning process. Replicate will take care of the training, and you can monitor progress through their interface.

**3.4 Evaluation and Iteration**
- **Testing:** After fine-tuning, use the Replicate interface to test your model with prompts that align with the persona's role and personality.
  - **Example Prompt:**
  ```python
  response = replicate.run("your-model-id", input={"prompt": "What is the key to successful UX design?"})
  print(response)
  ```
- **Refinement:** Based on the output, refine your JSONL file or adjust training parameters as needed and repeat the fine-tuning process.

### **4. Deployment and Monitoring**

**4.1 Deploying the Fine-Tuned Model**
- **API Deployment:**
  - Replicate allows you to deploy your fine-tuned models as an API, making them accessible via HTTP requests.
  - **Deployment Steps:**
    - Navigate to the model page and select the option to deploy as an API.
    - Obtain the API endpoint and key provided by Replicate.

- **Integration Example:**
  ```python
  import requests

  url = "https://api.replicate.com/v1/predictions"
  headers = {
      "Authorization": f"Token {your_api_key}",
      "Content-Type": "application/json"
  }
  data = {
      "version": "your-model-version",
      "input": {
          "prompt": "What are the key principles of design?"
      }
  }

  response = requests.post(url, headers=headers, json=data)
  print(response.json())
  ```

**4.2 Continuous Improvement**
- **Feedback Collection:** Gather feedback from users interacting with the deployed models. Use this to further fine-tune and update the models.
- **Dataset Expansion:** Over time, collect new data from interactions or additional content sources to continuously improve the personas.

**4.3 Monitoring and Iteration**
- **Monitor Performance:** Use Replicate’s built-in tools to monitor the performance of the deployed models. Keep an eye on latency, accuracy, and user feedback.
- **Scheduled Updates:** Plan regular updates based on new data or evolving requirements. Retrain the models periodically to keep them aligned with the desired outcomes.

### **5. Additional Considerations**

**5.1 Cost Management**
- **Budget Planning:** Replicate charges based on compute usage, so it’s important to monitor usage to avoid unexpected costs. Set budgets and track your usage.
- **Optimize Training:** Fine-tune only what is necessary and optimize the model size to fit your budget constraints.

**5.2 Collaboration**
- **Team Access:** Use Replicate’s collaboration features to allow team members to access the models, provide feedback, and suggest improvements.

---

### **Next Steps:**

1. **Prepare your JSONL datasets** for each persona.
2. **Set up your Replicate environment** and upload the datasets.
3. **Fine-tune and test** one persona model as a pilot.
4. **Deploy the model via API** and integrate it with your platform.
5. **Monitor and refine** the model based on user feedback and performance metrics.

---

To fine-tune an AI model so that it can effectively answer questions or generate content related to specific documentation, like Thirdweb for an engineer persona, you need to integrate the content from that documentation into your training data. Here's a detailed plan to achieve this:

### **Step 1: Extract Content from the Thirdweb Documentation**

**1.1 Automated Extraction (Web Scraping)**
- **Web Scraping Tools:** You can use tools like `BeautifulSoup`, `Scrapy`, or even browser-based tools like `Octoparse` to scrape the Thirdweb documentation.
- **API Access:** If Thirdweb provides an API for accessing their documentation, use it to download the content directly.

**Example Using Python and BeautifulSoup:**
```python
import requests
from bs4 import BeautifulSoup

url = 'https://portal.thirdweb.com/docs'  # Replace with the actual URL of the documentation
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Example of extracting text from paragraphs
content = ''
for paragraph in soup.find_all('p'):
    content += paragraph.text + '\n'

# Save the extracted content to a file
with open('thirdweb_documentation.txt', 'w') as f:
    f.write(content)
```

**1.2 Manual Extraction**
- **Copy-Paste:** If the documentation is not too large, you can manually copy and paste the relevant sections into a text file.
- **PDF/Text Downloads:** If the documentation is available as a downloadable PDF or text file, you can use that directly.

### **Step 2: Preprocess the Extracted Content**

**2.1 Segmenting the Content**
- **Chunking:** Divide the content into smaller, coherent segments. Each segment should be a self-contained explanation or description that can be used as a training example.
  - **Example Chunk:** A section on "How to deploy a smart contract using Thirdweb" could be one chunk.
  
**2.2 Labeling and Structuring**
- **Define Prompts and Completions:**
  - **Prompt:** Create questions or instructions that an engineer might ask related to the documentation.
  - **Completion:** Use the extracted content as the answer or completion.

**Example Structure:**
- **Prompt:** "How do I deploy a smart contract using Thirdweb?"
- **Completion:** "To deploy a smart contract using Thirdweb, you first need to... [continue with extracted documentation content]."

**2.3 Create a JSONL File**
- Convert these structured prompts and completions into the JSONL format for fine-tuning.

**Example JSONL Entry:**
```json
{
  "prompt": "What are the steps to deploy a smart contract using Thirdweb?",
  "completion": "To deploy a smart contract using Thirdweb, follow these steps: [insert steps from documentation]."
}
```

**Python Script to Automate JSONL Creation:**
If you have segmented the text and defined prompts, you can automate the creation of JSONL files.

```python
import json

# Example data (in practice, this would be more detailed and extracted from your documentation)
data = [
    {
        "prompt": "What is the first step in deploying a contract on Thirdweb?",
        "completion": "The first step in deploying a contract on Thirdweb is to set up your project by ..."
    },
    {
        "prompt": "How does Thirdweb handle smart contract upgrades?",
        "completion": "Thirdweb allows for smart contract upgrades by using proxy contracts, which enable ..."
    }
]

# Write data to JSONL
with open('thirdweb_engineer.jsonl', 'w') as f:
    for entry in data:
        json.dump(entry, f)
        f.write('\n')
```

### **Step 3: Fine-Tune the Model on Replicate with Documentation**

**3.1 Upload the JSONL File to Replicate**
- Follow the same process outlined previously for uploading your JSONL file to Replicate.

**3.2 Fine-Tune the Model**
- Use the Thirdweb documentation-based JSONL file to fine-tune your engineer persona model. Ensure that the model understands and can generate content related to the documentation.

**3.3 Test and Iterate**
- After fine-tuning, test the model by asking it various questions that should reference the Thirdweb documentation to ensure it responds accurately.

### **Step 4: Continuous Learning and Updating**

**4.1 Continuous Data Integration**
- As Thirdweb updates its documentation, regularly scrape or manually update your dataset to include new information.

**4.2 Feedback Loop**
- Monitor how users interact with the model. If it fails to answer certain questions or provides outdated information, update your dataset and re-fine-tune the model.

**4.3 Version Control**
- Maintain version control of your fine-tuned models so that you can roll back to previous versions if needed or compare the performance of different iterations.

### **Next Steps:**

1. **Extract and segment** the relevant Thirdweb documentation.
2. **Create a structured dataset** with prompts and completions.
3. **Convert the dataset into JSONL format** and upload it to Replicate.
4. **Fine-tune your engineer persona model** using this dataset.
5. **Test the model’s performance** and iteratively improve it based on real-world feedback.
