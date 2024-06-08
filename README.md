# JSconf2024 - Node.js and GenAI: Deep Dive into the RAG Architecture

This is a demo code for the JavaScript Conference Armenia (#JSconf2024) focusing on Node.js and Generative AI with a detailed exploration of the Retrieval-Augmented Generation (RAG) architecture.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version v21.7.1 or higher)
- [npm](https://www.npmjs.com/) (version  v10.5.0 or higher)

### Installation

1. **Create a `.env` file**:

   Create a `.env` file in the root directory of your project using the `.env.example` file as a template. Make sure to provide the necessary keys.


2. **Install dependencies**:

    ```sh
    npm install
    ```

### Data Embedding

To embed the data, add your `.txt` files into the `assets/docs` directory. Then run:

```sh
npm run cli:embed
```

### Create index for collection

```
{
   "mappings": {
      "dynamic": true,
      "fields": {
            "embedding": {
            "dimensions": 1536,
            "similarity": "cosine",
            "type": "knnVector"
         }
      }
   }
}
```

### Running the Project
To run the project in development mode:

```sh 
npm run dev
```

To build the project:

```sh 
npm run build
```

To start the project:

```sh 
npm start
```