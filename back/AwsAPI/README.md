# AWS_API

## Description

API for uploading images in AWS S3

## Setup

1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configuring environment
    <br>
    Copy the file `.env.example` and create a file `.env` and put your aws keys, following the example (this are not real keys):
    ```sh
    REGION: 'us-west-2'
    ACCESS_KEY_ID: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    SECRET_ACCESS_KEY: 'AbC1D2eFG3hiJ4KlmN5Op6QrSt7uV8Wxy9Z'
    ```

4. Start the server:
   ```sh
   cd /scripts
   ./run.sh
   ```
   Obs: to use the command `./run.sh` you need to be in a Git Bash terminal

## API Endpoints
### POST /image

Uploads an image along with a title and user ID. If you are using Postman for tests, your requisition body have to be form-data.

**Request:**

- `image` (file): The image file to upload
- `title` (string): The title of the image
- `id_user` (string): The ID of the user uploading the image

**Response:**

- `201 CREATED`: Image uploaded and processed
- `400 Bad Request`: Missing file, title, or user ID

### GET /image/{id}

Download an image from AWS

**Request:**

- `id` (Path Variable): The id of image to be downloaded

**Response:**

- `200 OK`: Image downloaded sucessfully
- `400 Bad Request`: Image not founded in S3 or not registered in application

### GET /image

Get all images infos from database, but not get images from AWS

**Response:**

- `200 OK`: Get all infos of images sucessfully

## Example Request in Postman

1. Method: POST
2. URL: `http://localhost:3000/image`
3. Body: form-data
   - Key: `image` (type: File) - Value: Select your image file
   - Key: `title` (type: Text) - Value: Your title here
   - Key: `id_user` (type: Text) - Value: Your user ID here