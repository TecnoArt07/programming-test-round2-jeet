# Project Setup Guide

## Setup Environment Variables

1. **Create a `.env` file** in the root directory of your project.

2. **Add the following environment variables** to the `.env` file:

    ```plaintext
    # .env example
    DATABASE_URL=your-database-url
    PORT=9090
    ```

   Replace `your-database-url` with the actual database URL you will be using.

---

## Running the Project

### 1. Install Dependencies

To install the required dependencies, run:

```bash
npm install
npm run seed
npm run dev