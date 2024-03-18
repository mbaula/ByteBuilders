# ByteBuilder

ByteBuilder is a specialized blogging platform designed for software engineers and technology enthusiasts. In a world brimming with technological advancements, ByteBuilder serves as a dedicated space for sharing insights, challenges, and discoveries in the realm of cutting-edge technology.

## Installation

Setting up ByteBuilder for development or personal use is straightforward:

1. **Clone the repository:**

```bash
git clone https://github.com/mbaula/ByteBuilder.git
```

2. **Install dependencies:**
Navigate to the project directory and run:
```bash
npm install
```

3. **Configuration:**
Create a .env file in the root directory based on the `.env.example` provided:
```.env
MONGODB_URI=
MONGODB_URI_TEST=
PORT= 
```

## Running Tests:
Before contributing, please ensure to run the tests against a separate test database to avoid affecting any development or production data. Configure the MONGODB_URI_TEST environment variable to point to your test database when running tests:
```bash 
npm test 
```
This helps in ensuring that your changes do not break existing functionality and adheres to the expected behavior of the application.

## To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix (e.g., `feature_add_login`, `fix_typo_in_post`).
3. Run tests to ensure your changes do not introduce any new issues.
4. Commit your changes.
5. Push to your fork and submit a pull request.

When submitting a pull request, please provide a clear description of the changes and any relevant issue numbers.