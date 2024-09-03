To use the ElevenLabs Text-to-Speech API, follow these steps:

### 1. Authentication
First, you need to obtain your `xi-api-key`:
1. Create an account and log in.
2. Click on your profile picture in the lower left corner and select “Profile + API key”.
3. Click on the eye icon to view your `xi-api-key`.

### 2. Making a Request
You can generate spoken audio from text with a simple HTTP POST request. Below is an example using Python:

```python
import requests

CHUNK_SIZE = 1024
url = "https://api.elevenlabs.io/v1/text-to-speech/<voice-id>"

headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": "<xi-api-key>"
}

data = {
  "text": "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.5
  }
}

response = requests.post(url, json=data, headers=headers)
with open('output.mp3', 'wb') as f:
    for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
        if chunk:
            f.write(chunk)
```

### 3. Parameters
- **Headers**:
  - `xi-api-key`: Your API key.
  - `Accept`: `audio/mpeg`
  - `Content-Type`: `application/json`

- **Path Parameters**:
  - `voice_id`: The ID of the voice to be used. You can list all available voices using the endpoint `https://api.elevenlabs.io/v1/voices`.

- **Body Parameters**:
  - `text`: The text to be converted into speech.
  - `model_id`: Identifier of the model to be used (default: `eleven_monolingual_v1`).
  - `voice_settings`: Optional settings to override the stored settings for the given voice.
    - `stability`: A number between 0 and 1.
    - `similarity_boost`: A number between 0 and 1.

### 4. Response
The response will be an audio file in `audio/mpeg` format.

### Additional Information
For more details, visit the [ElevenLabs Text-to-Speech API documentation](https://elevenlabs.io/docs/api-reference/text-to-speech).

### References
- [ElevenLabs Text-to-Speech API Documentation](https://elevenlabs.io/docs/api-reference/text-to-speech)

To use the ElevenLabs Text-to-Speech API with TypeScript, follow these steps:

### 1. Authentication
First, you need to obtain your `xi-api-key`:
1. Create an account and log in.
2. Click on your profile picture in the lower left corner and select “Profile + API key”.
3. Click on the eye icon to view your `xi-api-key`.

### 2. Making a Request
You can generate spoken audio from text with a simple HTTP POST request. Below is an example using TypeScript:

````typescript
import axios from 'axios';
import * as fs from 'fs';

const CHUNK_SIZE = 1024;
const url = "https://api.elevenlabs.io/v1/text-to-speech/<voice-id>";

const headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": "<xi-api-key>"
};

const data = {
  "text": "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.5
  }
};

axios.post(url, data, { headers, responseType: 'stream' })
  .then(response => {
    const writer = fs.createWriteStream('output.mp3');
    response.data.pipe(writer);
    writer.on('finish', () => console.log('File written successfully'));
    writer.on('error', (err) => console.error('Error writing file', err));
  })
  .catch(error => console.error('Error making request', error));
````

### 3. Parameters
- **Headers**:
  - `xi-api-key`: Your API key.
  - `Accept`: `audio/mpeg`
  - `Content-Type`: `application/json`

- **Path Parameters**:
  - `voice_id`: The ID of the voice to be used. You can list all available voices using the endpoint `https://api.elevenlabs.io/v1/voices`.

- **Body Parameters**:
  - `text`: The text to be converted into speech.
  - `model_id`: Identifier of the model to be used (default: `eleven_monolingual_v1`).
  - `voice_settings`: Optional settings to override the stored settings for the given voice.
    - `stability`: A number between 0 and 1.
    - `similarity_boost`: A number between 0 and 1.

### 4. Response
The response will be an audio file in `audio/mpeg` format.

### 5. Streaming Text-to-Speech
You can also stream the generated audio using the streaming endpoint. Below is an example using TypeScript:

````typescript
import axios from 'axios';
import * as fs from 'fs';

const CHUNK_SIZE = 1024;
const url = "https://api.elevenlabs.io/v1/text-to-speech/<voice-id>/stream";

const headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": "<xi-api-key>"
};

const data = {
  "text": "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.5
  }
};

axios.post(url, data, { headers, responseType: 'stream' })
  .then(response => {
    const writer = fs.createWriteStream('output_stream.mp3');
    response.data.pipe(writer);
    writer.on('finish', () => console.log('File written successfully'));
    writer.on('error', (err) => console.error('Error writing file', err));
  })
  .catch(error => console.error('Error making request', error));
````

### Additional Information
For more details, visit the [ElevenLabs Text-to-Speech API documentation](https://elevenlabs.io/docs/api-reference/text-to-speech) and the [Streaming API documentation](https://elevenlabs.io/docs/api-reference/streaming).

### References
- [ElevenLabs Text-to-Speech API Documentation](https://elevenlabs.io/docs/api-reference/text-to-speech)
- [ElevenLabs Streaming API Documentation](https://elevenlabs.io/docs/api-reference/streaming)